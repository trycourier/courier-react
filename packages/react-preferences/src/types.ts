import { PreferenceStatus } from "@trycourier/react-provider";

export type Preference = "channel_preferences" | "status" | "snooze";

export type ChannelClassification =
  | "direct_message"
  | "email"
  | "inbox"
  | "push"
  | "sms"
  | "webhook";

export type PreferenceItemComponentFn = React.FunctionComponent<{
  label?: string;
  value: PreferenceStatus | ChannelClassification[] | SnoozePreference;
  hasCustomRouting?: boolean;
  onPreferenceChange: (changes: Partial<IPreference>) => void;
  templateId: string;
  routingOptions: Array<ChannelClassification>;
  customizeDeliveryChannel?: boolean;
}>;

export type SnoozePreference = {
  start?: string;
  until: string;
};

export interface IPreference {
  status: PreferenceStatus;
  snooze?: SnoozePreference;
  channel_preferences?: Array<ChannelClassification>;
}

export interface IRecipientPreference {
  templateId: string;
  status: PreferenceStatus | null;
  hasCustomRouting: boolean;
  routingPreferences: Array<ChannelClassification>;
  digestSchedule: string;
}
