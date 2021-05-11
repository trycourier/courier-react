import {
  PreferenceStatus,
  ChannelClassification,
  SnoozePreference,
  IPreference,
} from "~/hooks";

export type Preference = "channel_preferences" | "status" | "snooze";

export type PreferenceItemComponentFn = React.FunctionComponent<{
  key: number;
  label: string;
  value: PreferenceStatus | ChannelClassification[] | SnoozePreference;
  handleOnPreferenceChange: (changes: Partial<IPreference>) => void;
}>;
