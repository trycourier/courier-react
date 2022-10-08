import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { usePreferences } from "@trycourier/react-hooks";
import {
  ChannelClassification,
  IPreferenceTemplate,
  IRecipientPreference,
} from "~/types";
import { StyledToggle } from "./StyledToggle";
import Toggle from "react-toggle";
import type {
  PreferencePage,
  PreferenceSection,
} from "@trycourier/react-hooks/typings/preferences/types";
import { updateRecipientPreferences } from "@trycourier/client-graphql/typings/preferences";
import { ChannelPreferences } from "./ChannelPreferences";

const PreferenceSectionWrapper = styled.div`
  background: white;
  margin: 10px;
  padding: 10px;
  text: black;
`;

const SectionHeader = styled.h1`
  margin: 0;
  color: black;
`;

const LineBreak = styled.div`
  height: 1px;
  background-color: black;
  widht: 100%;
  opacity: 0.3;
  margin: 8px 0;
`;

const StyledItem = styled.div`
  border-bottom: 1px solid #dadce0;
  padding: 10px;
  margin-top: 6px;
  background: white;
  border-radius: 4px;
  color: #333;

  .template-name {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 6px;
    font-weight: bold;
  }
`;

const getDefaultStatusText = (defaultStatus: string) => {
  switch (defaultStatus) {
    case "OPTED_IN":
      return "Opted In";
    case "OPTED_OUT":
      return "Opted Out";
    case "REQUIRED":
      return "Required";
  }
};

export const PreferenceTopic: React.FunctionComponent<{
  topic: IPreferenceTemplate;
  defaultRoutingOptions: ChannelClassification[];
  hasCustomRouting: boolean;
  status: IRecipientPreference["status"] | undefined;
}> = ({ topic, defaultRoutingOptions, hasCustomRouting, status }) => {
  //Temporary mapping until I update this in the backend
  const { defaultStatus, templateName: topicName, templateId: topicId } = topic;

  // If there user hasn't set a status then use the default status to set the toggle.
  const [statusToggle, setStatusToggle] = React.useState(
    status ? status === "OPTED_IN" : defaultStatus === "OPTED_IN"
  );

  const { updateRecipientPreferences } = usePreferences();
  const handleStatusChange = () => {
    // Required statuses should never change
    if (defaultStatus === "REQUIRED") {
      return;
    }

    const newStatus = statusToggle ? "OPTED_OUT" : "OPTED_IN";
    updateRecipientPreferences({
      templateId: topicId,
      status: newStatus,
    });

    setStatusToggle(!statusToggle);
  };

  const handleChannePrefenceUpdate = ({
    routingPreferences,
    status,
    hasCustomRouting,
  }: IRecipientPreference) => {
    updateRecipientPreferences({
      templateId: topicId,
      status: status,
      routingPreferences: routingPreferences,
      hasCustomRouting,
    });

    setStatusToggle(status === "OPTED_IN");
  };

  if (!topic) {
    return null;
  }

  return (
    <StyledItem>
      <div className="template-name">{topicName}</div>
      <StyledToggle checked={statusToggle}>
        <label>{getDefaultStatusText(defaultStatus)}</label>
        <Toggle
          icons={false}
          disabled={defaultStatus === "REQUIRED"}
          checked={statusToggle}
          onChange={handleStatusChange}
        />
      </StyledToggle>
      {statusToggle && hasCustomRouting && (
        <ChannelPreferences
          onPreferenceChange={handleChannePrefenceUpdate}
          templateId={topicId}
          routingOptions={defaultRoutingOptions}
        />
      )}
    </StyledItem>
  );
};

export const PreferenceSections: React.FunctionComponent<{
  section: PreferenceSection["nodes"][0];
}> = ({ section }) => {
  const { recipientPreferences } = usePreferences();

  const memoizedTopics = useMemo(() => {
    return section.topics.nodes.map((topic) => {
      return {
        topic: topic,
        recipientPreference: recipientPreferences?.find((preference) => {
          if (preference.templateId === topic.templateId) {
            return preference;
          }
        }),
      };
    });
  }, [section]);

  if (!recipientPreferences) {
    return null;
  }

  return (
    <>
      <SectionHeader>{section.name}</SectionHeader>
      {memoizedTopics.map(({ topic, recipientPreference }) => (
        <>
          <PreferenceTopic
            topic={topic}
            defaultRoutingOptions={section.routingOptions}
            hasCustomRouting={section.hasCustomRouting}
            status={recipientPreference?.status}
          />
          <LineBreak />
        </>
      ))}
    </>
  );
};

// Doesn't include header or footer
export const PreferencePage2 = () => {
  const preferences = usePreferences();

  return (
    <PreferenceSectionWrapper>
      {preferences?.preferencePage?.sections?.nodes.map((section, i) => (
        <PreferenceSections key={i} section={section} />
      ))}
    </PreferenceSectionWrapper>
  );
};
