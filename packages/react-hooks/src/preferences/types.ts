export type PreferencePage = {
  showCourierFooter: boolean;
  brand: {
    settings: {
      colors: {
        primary: string;
      };
    };
    links: {
      facebook: {
        url: string;
      };
      instagram: {
        url: string;
      };
      linkedin: {
        url: string;
      };
      medium: {
        url: string;
      };
      twitter: {
        url: string;
      };
    };
  };
  sections: PreferenceSection;
};

export type PreferenceSection = {
  nodes: Array<{
    name: string;
    sectionId: string;
    routingOptions: Array<ChannelClassification>;
    topics: Array<IPreferenceTemplate>;
  }>;
};

export interface PreferenceState {
  isLoading?: boolean;
  isUpdating?: boolean;
  preferences?: IPreferenceTemplate[];
  recipientPreferences?: IRecipientPreference[];
  preferencePage?: PreferencePage;
}

export type ChannelClassification = "email" | "push" | "direct_message";

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
