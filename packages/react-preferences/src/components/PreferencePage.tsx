import React, { useEffect } from "react";
import styled from "styled-components";
import { usePreferences } from "@trycourier/react-hooks";
import {
  ChannelClassification,
  IPreferenceTemplate,
  IRecipientPreference,
} from "~/types";
import { StyledToggle } from "./StyledToggle";
import Toggle from "react-toggle";
import { PreferencePage } from "@trycourier/react-hooks/typings/preferences/types";

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

export const PreferenceTopic: React.FunctionComponent<{
  topic: any;
}> = ({ topic }) => {
  // const { updateRecipientPreferences } = usePreferences();

  // const handleOnPreferenceChange = (newPreferences) => {
  //   updateRecipientPreferences({
  //     templateId: preferenceTemplate.templateId,
  //     ...newPreferences,
  //   });
  // };

  if (!topic) {
    return null;
  }

  const { defaultStatus } = topic;

  const [statusToggle, setStatusToggle] = React.useState(
    defaultStatus === "OPTED_IN"
  );

  // const { preferences, updateRecipientPreferences } = usePreferences();

  // console.log(topic);

  // const handleStatusChange = () => {
  //   // Required statuses should never change
  //   if (defaultStatus === "REQUIRED") {
  //     return;
  //   }

  //   const newStatus = statusToggle ? "OPTED_OUT" : "OPTED_IN";

  //   setStatusToggle(!statusToggle);
  // };

  return (
    <StyledItem>
      <div className="template-name">{topic.templateName}</div>
      {/* <StatusPreference
        value={
          preferenceTemplate?.defaultStatus === "REQUIRED"
            ? "REQUIRED"
            : recipientPreference?.status ?? preferenceTemplate?.defaultStatus
        }
        onPreferenceChange={handleOnPreferenceChange}
        templateId={preferenceTemplate.templateId}
        defaultRoutingOptions={sectionRoutingOptions}
        customizeDeliveryChannel={customizeDeliveryChannel}
      /> */}
      <StyledToggle checked={statusToggle}>
        <label>{defaultStatus}</label>
        <Toggle
          icons={false}
          disabled={defaultStatus === "REQUIRED"}
          checked={statusToggle}
          value={defaultStatus}
          onChange={() => setStatusToggle(!statusToggle)}
        />
      </StyledToggle>
      {/* {statusToggle && customizeDeliveryChannel && (
        <ChannelPreferences
          onPreferenceChange={onPreferenceChange}
          templateId={templateId}
          routingOptions={routingOptions}
        />
      )} */}
    </StyledItem>
  );
};

export const PreferenceSection: React.FunctionComponent<{
  section: any;
  // preferences: IPreferenceTemplate[] | undefined;
}> = ({ section }) => {
  // console.log(preferences);
  // if (!preferences) {
  //   return null;
  // }

  return (
    <>
      <SectionHeader>{section.name}</SectionHeader>
      {section.topics.nodes.map((topic) => (
        <>
          <PreferenceTopic
            topic={topic}
            routingOptions={section.routingOptions}
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

  useEffect(() => {
    preferences.fetchPreferencePage();
  }, []);

  return (
    <PreferenceSectionWrapper>
      {preferences?.preferencePage?.sections?.nodes.map((section, i) => (
        <PreferenceSection
          key={i}
          section={section}
          // preferences={preferences.preferences}
        />
      ))}
    </PreferenceSectionWrapper>
  );
};
