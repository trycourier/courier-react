export type Preference = "channel_preferences" | "status" | "snooze";

export type PreferenceItemComponentFn = React.FunctionComponent<{
  key: number;
  label: string;
  value: PreferenceStatus | ChannelClassification[] | SnoozePreference;
  handleOnPreferenceChange: (changes: Partial<IPreference>) => void;
}>;

export interface IPreferenceRule {
  itemName: string;
  itemValue: string | string[];
  type: "snooze" | "channel_preferences" | "status";
}

export type ChannelClassification = "direct_message" | "email" | "push";

export type PreferenceStatus = "OPTED_OUT" | "OPTED_IN" | undefined;

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
  templateItems: IPreferenceRule[];
  value: IPreference;
}
