export interface PreferenceState {
  isLoading?: boolean;
  isUpdating?: boolean;
  preferences?: IPreferenceTemplate[];
  recipientPreferences?: IRecipientPreference[];
}
export type ChannelClassification = "email" | "push";

export type SnoozePreference = {
  start?: string;
  until: string;
};

export type PreferenceStatus = "OPTED_IN" | "OPTED_OUT" | "REQUIRED";

export interface IPreference {
  status: PreferenceStatus;
  snooze?: SnoozePreference;
  channel_preferences?: Array<ChannelClassification>;
}

export interface IPreferenceTemplate {
  templateName: string;
  templateId: string;
  defaultStatus: PreferenceStatus;
}

export interface IRecipientPreference {
  templateId: string;
  status: PreferenceStatus;
  hasCustomRouting: boolean;
  routingPreferences: Array<ChannelClassification>;
}
