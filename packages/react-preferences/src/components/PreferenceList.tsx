import React, { useEffect } from "react";
import { usePreferences } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import styled, { ThemeProvider } from "styled-components";
import { PreferenceTemplate } from "./PreferenceTemplate";
import { PreferencesV4 } from "./PreferencesV4";

export const StyledList = styled.div`
  overflow: scroll;
  display: flex;
  height: 433px;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
`;

const PreferenceV4Wrapper = styled.div`
  padding: ${(props) => (props.theme.name === "2.0" ? "10px" : "0 38px")};
  background: white;
`;

export const PreferenceList: React.FunctionComponent<{
  theme: any;
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
      return (
        <PreferenceV4Wrapper theme={theme}>
          <PreferencesV4 />
        </PreferenceV4Wrapper>
      );
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
