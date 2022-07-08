import { useCourier } from "@trycourier/react-provider";
import React, { useState } from "react";
import styled from "styled-components";
// import { PreferenceItemComponentFn } from "../types";
import Checkmark from "../assets/checkmark-small.svg";

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  text-align-center;
  background: rgba(213, 221, 228, 0.4);
  border-radius: 15px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  padding: 5px;

  div {
    margin-right: 7px;
    white-space: nowrap;
  }

  input {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  margin-top: 5px;
`;

const ChannelOption = styled.div`
  display: flex;
  width: 64px;
  height: 20px;

  background: #1e4637;
  border-radius: 12px;
  color: white;

  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  justify-content: center;
  align-items: center;
  margin: 0 1px 0 1px;

  svg {
    display: normal;
    margin-right: 3px;
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Channel = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const DisplayChannel = (channel) => {
  switch (channel) {
    case "email":
      return "Email";
      break;
    case "push":
      return "Push";
      break;
    case "direct_message":
      return "SMS";
      break;
  }
};

const DeliveryChannel = ({ channel, handleRouting, checked }) => {
  return (
    <Channel>
      <ChannelOption>
        <Input
          type="checkbox"
          onChange={() => {
            handleRouting(channel);
          }}
          checked={checked}
        />

        {checked && <Checkmark />}
        <div>{DisplayChannel(channel)}</div>
      </ChannelOption>
    </Channel>
  );
};

type ChannelPreferencesProps = {
  onPreferenceChange: any;
  templateId: string;
};

export const ChannelPreferences: React.FC<ChannelPreferencesProps> = ({
  onPreferenceChange,
  templateId,
}) => {
  const { preferences } = useCourier();

  const filteredPreference = preferences?.recipientPreferences.filter(
    (p) => p.templateId === templateId
  )[0];

  const initialState = filteredPreference?.hasCustomRouting ?? false;
  const initialRouting = filteredPreference?.routingPreferences ?? [];

  const [routing, setRouting] = useState(initialRouting);
  const [checked, setChecked] = useState(initialState);

  const handleDeliveryChannels = () => {
    onPreferenceChange({
      hasCustomRouting: !checked,
      status: "OPTED_IN",
      routingPreferences: !checked ? ["direct_message", "email", "push"] : [],
    });

    setRouting(["direct_message", "email", "push"]);
    setChecked(!checked);
  };

  const handleRouting = (newChannel) => {
    const newRouting = initialRouting.includes(newChannel)
      ? initialRouting?.filter((c) => c !== newChannel)
      : initialRouting.concat(newChannel);

    onPreferenceChange({
      routingPreferences: newRouting,
      status: "OPTED_IN",
      hasCustomRouting: true,
    });

    setRouting(newRouting);
  };

  if (!preferences) {
    return null;
  }

  return (
    <>
      <StyledItem>
        <input
          type="radio"
          checked={checked}
          onClick={handleDeliveryChannels}
        />
        <div>Customize Delivery Channel</div>
        {checked &&
          ["direct_message", "email", "push"].map((fixedChannels) => (
            <DeliveryChannel
              channel={fixedChannels}
              handleRouting={handleRouting}
              checked={routing.includes(fixedChannels)}
            />
          ))}
      </StyledItem>
    </>
  );
};
