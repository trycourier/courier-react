import React, { useEffect } from "react";
import { usePreferences } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import styled, { ThemeProvider, ThemeProps } from "styled-components";
import { PreferenceTemplate } from "./PreferenceTemplate";
import { PreferencesV4 } from "./PreferencesV4";

export const StyledList = styled.div`
  overflow: scroll;
  display: flex;
  height: 433px;
  flex-direction: column;
  border-top: 1px solid rgba(203, 213, 224, 0.5);
  background: rgba(255, 255, 255, 0.2);
`;

export const PreferenceList: React.FunctionComponent<{
  // TODO: define Preferences theming
  theme?: ThemeProps<any>;
  draft?: boolean;
}> = ({ theme, draft }) => {
  const { brand } = useCourier();
  const preferences = usePreferences();

  useEffect(() => {
    preferences.fetchRecipientPreferences();
    preferences.fetchPreferencePage(draft);
  }, []);

  const renderPreferences = () => {
    if (preferences?.isLoading) {
      return <></>;
    }

    if (
      preferences.preferencePage?.sections?.nodes &&
      preferences.preferencePage?.sections?.nodes.length > 0
    ) {
      return <PreferencesV4 />;
    }

    // TODO: Handle Backfilled preferences. (https://linear.app/trycourier/issue/C-6836/cleanup-react-preference-section-template-renderer-after-backfill)
    if (
      !preferences.preferencePage?.sections?.nodes ||
      preferences.preferencePage?.sections?.nodes.length < 1
    ) {
      return brand?.preferenceTemplates?.map((template) => (
        <PreferenceTemplate
          key={template.templateId}
          preferenceTemplate={template}
          recipientPreference={preferences?.recipientPreferences?.find(
            (preference) => preference.templateId === template.templateId
          )}
          routingOptions={["direct_message", "email", "push"]}
        />
      ));
    }
  };

  return (
    <>
      <ThemeProvider
        theme={{
          ...theme,
          brand,
        }}
      >
        <StyledList>{renderPreferences()}</StyledList>
      </ThemeProvider>
    </>
  );
};
