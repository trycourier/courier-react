export type Preference = "channel_preferences" | "status" | "snooze";

export type PreferenceItemComponentFn = React.FunctionComponent<{
  label: string;
  value: string | string[];
  handleOnPreferenceChange: (changes: string | string[]) => void;
}>;
