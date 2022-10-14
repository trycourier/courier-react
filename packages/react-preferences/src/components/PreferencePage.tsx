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

export const ChannelOption = styled.div`
  display: flex;
  width: 55px;
  height: 20px;

  background: transparent;
  border-radius: 12px;
  border: 1px solid black;
  whitespace: nowrap;

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;

  justify-content: center;
  align-items: center;
  margin: 0 3px;

  svg {
    display: normal;
    margin-right: 3px;
  }
`;

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

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const Channel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    display: block;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  ${Input}:checked ~ ${ChannelOption} {
    background: #1e4637;
    color: white;
    border: 0;
  }

  ${Input}:checked ~ ${ChannelOption} > div {
    color: white;
  }
`;

const ChannelPreferenceStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  gap: 0.25rem;
  margin-top: 15px;
  background: rgba(213, 221, 228, 0.4);
  border-radius: 15px;
  padding: 5px;

  p {
    margin: 0;
  }

  .custmoize-delivery {
    input {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }

    display: flex;
    flex-grow: 1;
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

const ChannelPreference: React.FunctionComponent<{
  handleChannelRouting: (channel: ChannelClassification) => void;
  routingPreferences: ChannelClassification[];
  channel: ChannelClassification;
}> = ({ handleChannelRouting, routingPreferences, channel }) => {
  const [checked, setChecked] = useState(routingPreferences.includes(channel));

  return (
    <Channel>
      <label>
        <Input
          type="checkbox"
          onChange={() => {
            handleChannelRouting(channel);
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

export const PreferenceTopic: React.FunctionComponent<{
  topic: IPreferenceTemplate;
  status: IRecipientPreference["status"] | undefined;
  hasCustomRouting: boolean | undefined;
  defaultHasCustomRouting: boolean;
  routingPreferences: ChannelClassification[];
  defaultRoutingOptions: ChannelClassification[];
}> = ({
  topic,
  status,
  routingPreferences,
  defaultRoutingOptions,
  hasCustomRouting,
  defaultHasCustomRouting,
}) => {
  const { updateRecipientPreferences } = usePreferences();

  //Temporary mapping until I update this in the backend
  const { defaultStatus, templateName: topicName, templateId: topicId } = topic;

  // If there user hasn't set a status then use the default status to set the toggle.
  const [statusToggle, setStatusToggle] = useState(
    status ? status === "OPTED_IN" : defaultStatus === "OPTED_IN"
  );
  const [customizeDelivery, setCustomizeDelivery] = useState(hasCustomRouting);

  const [routing, setRouting] = useState(routingPreferences);

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

  const handleDeliveryCustomization = () => {
    updateRecipientPreferences({
      templateId: topicId,
      hasCustomRouting: !customizeDelivery,
      ...(!customizeDelivery && {
        routingPreferences: ["sms", "email", "direct_message", "push"],
      }),
      status: statusToggle ? "OPTED_IN" : "OPTED_OUT",
    });

    // If Customize Delivery is turned on, set the routing preferences to the default
    !customizeDelivery &&
      setRouting(["sms", "email", "direct_message", "push"]);

    setCustomizeDelivery(!customizeDelivery);
  };

  const handleChannelRouting = (channel: ChannelClassification) => {
    const newRouting = routing.includes(channel)
      ? routing.filter((r) => r !== channel)
      : [...routing, channel];

    updateRecipientPreferences({
      templateId: topicId,
      routingPreferences: newRouting,
      hasCustomRouting: true,
      status: statusToggle ? "OPTED_IN" : "OPTED_OUT",
    });

    setRouting(newRouting);
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
      {statusToggle && defaultHasCustomRouting && (
        <ChannelPreferenceStyles>
          <label className="custmoize-delivery">
            <Input
              type="checkbox"
              checked={customizeDelivery}
              onClick={handleDeliveryCustomization}
            />
            <div>{customizeDelivery && <Checkmark />}</div>
            <p>Customize Delivery Channel</p>
          </label>
          {customizeDelivery &&
            defaultRoutingOptions.map((channel, i) => (
              <ChannelPreference
                key={i}
                channel={channel}
                routingPreferences={routing}
                handleChannelRouting={handleChannelRouting}
              />
            ))}
        </ChannelPreferenceStyles>
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
  }, [section, recipientPreferences]);

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
            defaultHasCustomRouting={section.hasCustomRouting}
            hasCustomRouting={recipientPreference?.hasCustomRouting}
            status={recipientPreference?.status}
            routingPreferences={recipientPreference?.routingPreferences ?? []}
          />
          <LineBreak />
        </>
      ))}
    </>
  );
};

// Doesn't include header or footer
export default () => {
  const preferences = usePreferences();

  return (
    <PreferenceSectionWrapper>
      {preferences?.preferencePage?.sections?.nodes.map((section, i) => (
        <PreferenceSections key={i} section={section} />
      ))}
    </PreferenceSectionWrapper>
  );
};
