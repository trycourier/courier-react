import React, { useState } from "react";
import { usePreferences } from "@trycourier/react-hooks";
import { ChannelClassification, IRecipientPreference } from "~/types";
import {
  Channel,
  ChannelCustomizationToggle,
  ChannelOption,
  Channels,
  Check,
  Input,
  StyledItem,
} from "./ChannelPreferenceStyles";

const DisplayChannel = (channel: ChannelClassification) => {
  return channel.charAt(0).toUpperCase() + channel.slice(1);
};

const Checkmark = () => {
  return (
    <Check viewBox="0 0 9 8">
      <path d="M3.0005 7.09954C2.84689 7.09954 2.69328 7.04074 2.57567 6.92433L0.175512 4.52417C-0.0585039 4.29015 -0.0585039 3.90973 0.175512 3.67571C0.409527 3.4417 0.789953 3.4417 1.02397 3.67571L3.0005 5.65104L7.97603 0.675512C8.21005 0.441496 8.59047 0.441496 8.82449 0.675512C9.0585 0.909527 9.0585 1.28995 8.82449 1.52397L3.42413 6.92433C3.30772 7.04074 3.15411 7.09954 3.0005 7.09954Z" />
    </Check>
  );
};

const DeliveryChannel = ({ channel, handleRouting, checked }) => {
  return (
    <Channel>
      <label>
        <Input
          type="checkbox"
          onChange={() => {
            handleRouting(channel);
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

export const ChannelPreferences: React.FC<{
  onPreferenceChange: (IRecipientPreference) => void;
  templateId: string;
}> = ({ onPreferenceChange, templateId }) => {
  const preferences = usePreferences();

  if (!preferences) {
    return null;
  }

  const filteredPreference = preferences?.recipientPreferences?.filter(
    (p: IRecipientPreference) => p.templateId === templateId
  )[0];

  const initialState = filteredPreference?.hasCustomRouting ?? false;
  const initialRouting = filteredPreference?.routingPreferences ?? [];

  const [routing, setRouting] = useState(initialRouting);
  const [checked, setChecked] = useState(initialState);

  const handleDeliveryChannels = () => {
    onPreferenceChange({
      hasCustomRouting: !checked,
      status: "OPTED_IN",
      routingPreferences: !checked ? ["email", "push"] : [],
    });

    setRouting(["email", "push"]);
    setChecked(!checked);
  };

  const handleRouting = (newChannel) => {
    const newRouting = routing.includes(newChannel)
      ? routing?.filter((c: ChannelClassification) => c !== newChannel)
      : routing.concat(newChannel);

    onPreferenceChange({
      routingPreferences: newRouting,
      status: "OPTED_IN",
      hasCustomRouting: true,
    });

    setRouting(newRouting);
  };

  const channels: ChannelClassification[] = ["email", "push"];

  return (
    <StyledItem>
      <ChannelCustomizationToggle>
        <Input
          type="checkbox"
          checked={checked}
          onClick={handleDeliveryChannels}
        />
        <div>{checked && <Checkmark />}</div>
      </ChannelCustomizationToggle>
      <div>Customize Delivery Channel</div>
      <Channels>
        {checked &&
          channels.map((fixedChannels) => (
            <DeliveryChannel
              key={fixedChannels}
              channel={fixedChannels}
              handleRouting={handleRouting}
              checked={routing.includes(fixedChannels)}
            />
          ))}
      </Channels>
    </StyledItem>
  );
};
