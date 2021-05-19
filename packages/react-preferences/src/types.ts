export type Preference = "channel_preferences" | "status" | "snooze";

export type PreferenceItemComponentFn = React.FunctionComponent<{
  key: number;
  label: string;
  value: PreferenceStatus | ChannelClassification[] | SnoozePreference;
  handleOnPreferenceChange: (changes: Partial<IPreference>) => void;
}>;

export type ChannelClassification = "direct_message" | "email" | "push";

export type PreferenceStatus = "OPTED_IN" | "OPTED_OUT" | "REQUIRED";

export type SnoozePreference = {
  start?: string;
  until: string;
};

export interface IPreference {
  status: PreferenceStatus;
  snooze: SnoozePreference;
  channel_preferences?: Array<ChannelClassification>;
}

export interface IPreferenceTemplate {
  templateName: string;
  templateId: string;
  value: IPreference;
}
