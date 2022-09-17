import React, { useEffect } from "react";
import { usePreferences } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import { PreferenceTemplate } from "./PreferenceTemplate";
import styled, { ThemeProvider, ThemeProps } from "styled-components";

export const StyledList = styled.div`
  overflow: scroll;
  display: flex;
  height: 433px;
  flex-direction: column;
  border-top: 1px solid rgba(203, 213, 224, 0.5);
  background: rgba(255, 255, 255, 0.2);
`;

const PreferenceSectionWrapper = styled.div`
  background: white;
  margin: 10px;
  padding: 10px;
  text: black;
`;

const SectionHeader = styled.h1`
  margin: 0;
  color: black;
`;

const LineBreak = styled.div`
  height: 1px;
  background-color: black;
  widht: 100%;
  opacity: 0.3;
  margin: 8px 0;
`;

const PreferenceSection: React.FunctionComponent<{
  section: any;
  preferences: any;
}> = ({ section, preferences }) => {
  return (
    <PreferenceSectionWrapper>
      <SectionHeader>{section.name}</SectionHeader>
      {section.topics.nodes.map((template) => (
        <>
          <PreferenceTemplate
            key={template.templateId}
            preferenceTemplate={template}
            recipientPreference={preferences?.recipientPreferences?.find(
              (preference) => preference.templateId === template.templateId
            )}
            routingOptions={section.routingOptions}
            customizeDeliveryChannel={section.hasCustomRouting}
          />
          <LineBreak />
        </>
      ))}
    </PreferenceSectionWrapper>
  );
};

export const PreferenceList: React.FunctionComponent<{
  // TODO: define Preferences theming
  theme?: ThemeProps<any>;
}> = (props) => {
  const { brand } = useCourier();
  const preferences = usePreferences();

  useEffect(() => {
    preferences.fetchRecipientPreferences();
    preferences.fetchPreferencePage();
  }, []);

  const renderPreferences = () => {
    if (preferences?.isLoading) {
      return <></>;
    }

    if (
      preferences.preferencePage?.sections?.nodes &&
      preferences.preferencePage?.sections?.nodes.length > 0
    ) {
      return preferences.preferencePage?.sections?.nodes.map((section, key) => (
        <PreferenceSection
          section={section}
          preferences={preferences}
          key={key}
        />
      ));
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
          ...props.theme,
          brand,
        }}
      >
        <StyledList>{renderPreferences()}</StyledList>
      </ThemeProvider>
    </>
  );
};
