import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { usePreferences } from "@trycourier/react-hooks";
import {
  ChannelClassification,
  IPreferenceTemplate,
  IRecipientPreference,
} from "~/types";
import { StyledToggle } from "./StyledToggle";
import Toggle from "react-toggle";
import type { PreferenceSection } from "@trycourier/react-hooks/typings/preferences/types";
import { Channel, ChannelOption, Input } from "./ChannelPreferenceStyles";

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

const Check = styled.svg`
  width: 12px;
  height: 12px;
  padding-left: 5px;
  fill: white;
`;

const ChannelPreferenceStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  p {
    margin: 0;
    white-space: nowrap;
  }

  .custmoize-delivery {
    input {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }

    display: flex;
    align-items: center;

    div {
      width: 20px;
      height: 20px;
      border: solid 1px black;
      border-radius: 100%;
      margin: 0 2.5px;
      position: static;
      background-color: !white;

      display: flex;
      align-items: center;
    }

    ${Input}:checked ~ div > ${Check} {
      fill: white;
    }

    ${Input}:checked ~ div {
      border: 0;
      background-color: #1e4637;
    }
  }
`;

const Checkmark = () => {
  return (
    <Check viewBox="0 0 9 8">
      <path d="M3.0005 7.09954C2.84689 7.09954 2.69328 7.04074 2.57567 6.92433L0.175512 4.52417C-0.0585039 4.29015 -0.0585039 3.90973 0.175512 3.67571C0.409527 3.4417 0.789953 3.4417 1.02397 3.67571L3.0005 5.65104L7.97603 0.675512C8.21005 0.441496 8.59047 0.441496 8.82449 0.675512C9.0585 0.909527 9.0585 1.28995 8.82449 1.52397L3.42413 6.92433C3.30772 7.04074 3.15411 7.09954 3.0005 7.09954Z" />
    </Check>
  );
};

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

const DisplayChannel = (channel: ChannelClassification) => {
  if (channel === "direct_message") {
    return "Chat";
  } else if (channel === "sms") {
    return "SMS";
  }
  return channel.charAt(0).toUpperCase() + channel.slice(1);
};

const DeliveryChannel = ({ channel, handleRouting, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <Channel>
      <label>
        <Input
          type="checkbox"
          onChange={() => {
            handleRouting(channel);
            setChecked(!checked);
          }}
          checked={checked}
        />
        <ChannelOption>
          {checked && <Checkmark />}
          <div>{DisplayChannel(channel)}</div>
        </ChannelOption>
      </label>
    </Channel>
  );
};

const ChannelDeliveryPreferences = ({
  defaultRoutingOptions,
}: {
  defaultRoutingOptions: ChannelClassification[];
}) => {
  const handleRouting = (channel: ChannelClassification) => {
    console.log(channel);
  };

  return (
    <ChannelPreferenceStyles>
      <div className="custmoize-delivery">
        <Input
          type="checkbox"
          checked={true}
          // onClick={handleDeliveryChannels}
        />
        <div>{true && <Checkmark />}</div>
        <p>Customize Delivery Channel</p>
      </div>
      {defaultRoutingOptions.map((channel, i) => {
        return (
          <DeliveryChannel
            key={i}
            channel={channel}
            defaultChecked={true}
            handleRouting={handleRouting}
          />
        );
      })}
    </ChannelPreferenceStyles>
  );
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
        <ChannelDeliveryPreferences
          defaultRoutingOptions={defaultRoutingOptions}
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
