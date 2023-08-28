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

export type PreferenceStatus = "OPTED_IN" | "OPTED_OUT" | "REQUIRED";

export type SnoozePreference = {
  start?: string;
  until: string;
};

export interface IPreference {
  status: PreferenceStatus;
  snooze?: SnoozePreference;
  channel_preferences?: Array<ChannelClassification>;
}

export interface DigestSchedule {
  period: string;
  repetition: string;
  scheduleId: string;
  default?: boolean;
}

export interface IPreferenceTemplate {
  templateName: string;
  templateId: string;
  defaultStatus: PreferenceStatus;
  digestSchedules?: DigestSchedule[];
}

export interface IRecipientPreference {
  templateId: string;
  status: PreferenceStatus | null;
  hasCustomRouting: boolean;
  routingPreferences: Array<ChannelClassification>;
  digestSchedule: string;
}
