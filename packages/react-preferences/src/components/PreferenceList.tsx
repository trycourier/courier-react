import { usePreferences } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import React, { useEffect } from "react";
import styled from "styled-components";
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
  padding: 0 10px;
`;

export const PreferenceList: React.FunctionComponent<{
  // TODO: define Preferences theming
  theme?: any;
  draft?: boolean;
}> = ({ theme, draft }) => {
  const { brand, tenantId } = useCourier();
  const preferences = usePreferences();

  useEffect(() => {
    preferences.fetchRecipientPreferences(tenantId);
    preferences.fetchPreferencePage(tenantId, draft);
  }, []);

  const renderPreferences = () => {
    if (!preferences.preferencePage?.sections?.nodes.length) {
      return <></>;
    }

    if (
      preferences.preferencePage?.sections?.nodes &&
      preferences.preferencePage?.sections?.nodes.length > 0
    ) {
      return (
        <PreferenceV4Wrapper theme={theme}>
          <PreferencesV4 tenantId={tenantId} draft={draft} />
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
      <StyledList>{renderPreferences()}</StyledList>
    </>
  );
};
