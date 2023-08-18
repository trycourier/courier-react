import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { usePreferences } from "@trycourier/react-hooks";
import {
  ChannelClassification,
  IPreferenceTemplate,
  IRecipientPreference,
} from "~/types";
import { StyledToggle } from "./StyledToggle";
import Toggle from "react-toggle";
import { PreferenceSection } from "@trycourier/react-hooks";
import DigestSchedules from "./DigestSchedule";
import { useCourier } from "@trycourier/react-provider";

export const ChannelOption = styled.div`
  display: flex;
  height: 20px;
  padding: 0 10px;
  gap: 5px;

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

  svg {
    display: normal;
  }
`;

const PreferenceSectionWrapper = styled.div`
  width: 100%;
`;

const SectionHeader = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const StyledItem = styled.div`
  padding: 16px 0;
  margin-top: 6px;
  border-radius: 4px;

  .template-name {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 6px;
    font-weight: bold;
  }

  .digest-schedules {
    margin-top: 16px;
  }
`;

const Check = styled.svg`
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
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  ${Input}:checked ~ ${ChannelOption} {
    background: ${({ theme }) => theme?.primary ?? "#9121c2"};
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

  .customize-delivery {
    input {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }

    display: flex;
    flex-grow: 1;
    align-items: center;

    p {
      font-size: 12px;
    }

    div {
      width: 20px;
      height: 20px;
      border: solid 1px black;
      border-radius: 100%;
      margin: 0 2.5px;
      position: static;

      display: flex;
      align-items: center;
    }

    ${Input}:checked ~ div > ${Check} {
      fill: white;
    }

    ${Input}:checked ~ div {
      border: 0;
      background-color: ${({ theme }) => theme?.primary ?? "#9121c2"};
      svg {
        margin-left: 5px;
      }
    }
  }
`;

const SubscriptionDivider = styled.hr`
  width: 100%;
  border-bottom: 1px #f5f5f5 solid;
`;

const Checkmark = () => {
  return (
    <Check viewBox="0 0 9 8" height="10px" width="10px">
      <path d="M3.0005 7.09954C2.84689 7.09954 2.69328 7.04074 2.57567 6.92433L0.175512 4.52417C-0.0585039 4.29015 -0.0585039 3.90973 0.175512 3.67571C0.409527 3.4417 0.789953 3.4417 1.02397 3.67571L3.0005 5.65104L7.97603 0.675512C8.21005 0.441496 8.59047 0.441496 8.82449 0.675512C9.0585 0.909527 9.0585 1.28995 8.82449 1.52397L3.42413 6.92433C3.30772 7.04074 3.15411 7.09954 3.0005 7.09954Z" />
    </Check>
  );
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
  const { preferencePage } = usePreferences();

  return (
    <Channel theme={{ primary: preferencePage?.brand.settings.colors.primary }}>
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
  const { tenantId } = useCourier();
  const { preferencePage, updateRecipientPreferences } = usePreferences();

  //Temporary mapping until I update this in the backend
  const { defaultStatus, templateName: topicName, templateId: topicId } = topic;

  // If there user hasn't set a status then use the default status to set the toggle.
  const [statusToggle, setStatusToggle] = useState(
    status ? status === "OPTED_IN" : defaultStatus !== "OPTED_OUT"
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
      tenantId,
    });

    setStatusToggle(!statusToggle);
  };

  const handleDeliveryCustomization = () => {
    updateRecipientPreferences({
      templateId: topicId,
      hasCustomRouting: !customizeDelivery,
      ...(!customizeDelivery && {
        routingPreferences: [
          "direct_message",
          "email",
          "inbox",
          "push",
          "sms",
          "webhook",
        ],
      }),
      status: statusToggle ? "OPTED_IN" : "OPTED_OUT",
      tenantId,
    });

    // If Customize Delivery is turned on, set the routing preferences to the default
    !customizeDelivery &&
      setRouting(["sms", "email", "direct_message", "push", "webhook"]);

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
      tenantId,
    });

    setRouting(newRouting);
  };

  const handleScheduleChange = async (scheduleId: string) => {
    await updateRecipientPreferences({
      templateId: topicId,
      digestSchedule: scheduleId,
    });
  };

  if (!topic) {
    return null;
  }

  const getStatusString = (status: boolean) => {
    return status ? "Opted In" : "Opted Out";
  };

  return (
    <StyledItem>
      <div className="template-name">{topicName}</div>
      <StyledToggle
        checked={statusToggle}
        theme={{
          brand: {
            colors: {
              primary: preferencePage?.brand.settings.colors.primary,
            },
          },
        }}
      >
        <label>
          {defaultStatus !== "REQUIRED"
            ? getStatusString(statusToggle)
            : "Required"}
        </label>
        <Toggle
          icons={false}
          disabled={defaultStatus === "REQUIRED"}
          checked={statusToggle}
          onChange={handleStatusChange}
        />
      </StyledToggle>
      <div className="digest-schedules">
        <DigestSchedules
          schedules={topic.digestSchedules ?? []}
          checkedColor={
            preferencePage?.brand.settings.colors.primary ?? "#9121c2"
          }
          onScheduleChange={handleScheduleChange}
          topicId={topicId}
        />
      </div>
      {statusToggle && defaultHasCustomRouting && defaultStatus !== "REQUIRED" && (
        <ChannelPreferenceStyles
          theme={{ primary: preferencePage?.brand.settings.colors.primary }}
        >
          <label className="customize-delivery">
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
      {memoizedTopics.map(({ topic, recipientPreference }, index) => (
        <>
          <PreferenceTopic
            topic={topic}
            defaultRoutingOptions={section.routingOptions}
            defaultHasCustomRouting={section.hasCustomRouting}
            hasCustomRouting={recipientPreference?.hasCustomRouting}
            status={recipientPreference?.status}
            routingPreferences={recipientPreference?.routingPreferences ?? []}
          />
          {index < memoizedTopics.length - 1 && <SubscriptionDivider />}
        </>
      ))}
    </>
  );
};

const PreferenceList = styled.ul`
  padding: 0;
  margin: 0;
`;
const PreferenceListItem = styled.li`
  list-style: none;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px 0;
  margin: 0;

  :last-child {
    border-bottom: none;
  }
`;

// Doesn't include header or footer
export const PreferencesV4: React.FC<{ tenantId?: string; draft?: boolean }> =
  ({ tenantId, draft }) => {
    const preferences = usePreferences();

    useEffect(() => {
      preferences.fetchPreferencePage(tenantId, draft);
      preferences.fetchRecipientPreferences(tenantId);
    }, []);

    if (!preferences.preferencePage && !preferences.isLoading) {
      return (
        <div>
          This page is not available. Please contact your administrator.
        </div>
      );
    }

    return (
      <PreferenceSectionWrapper>
        <PreferenceList>
          {preferences?.preferencePage?.sections?.nodes.map((section, i) => (
            <PreferenceListItem key={i}>
              <PreferenceSections section={section} />
            </PreferenceListItem>
          ))}
        </PreferenceList>
      </PreferenceSectionWrapper>
    );
  };
