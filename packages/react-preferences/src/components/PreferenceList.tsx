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

const CourierWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  gap: 5px;
`;

const FooterWrapper = styled.div`
  background: linear-gradient(270deg, #9121c2 1.2%, #ff5e5e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  * p {
    font-style: normal;
    color: white;
    font-weight: bold;
    font-size: 0.75em;
    white-space: nowrap;
  }
`;

const Svg = styled.div`
  width: 40%;
  border-radius: 0px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 2.5px;
  padding: 5px;
  border: 0.5px solid #ffffff;
  border-radius: 4px;
  p {
    margin: 0;
  }
`;

const PreferenceSection: React.FunctionComponent<{
  section: any;
  preferences: any;
}> = ({ section, preferences }) => {
  return (
    <PreferenceSectionWrapper>
      <SectionHeader>{section.name}</SectionHeader>
      {section.preferenceGroups.nodes.map((template) => (
        <>
          <PreferenceTemplate
            key={template.templateId}
            preferenceTemplate={template}
            recipientPreference={preferences?.recipientPreferences?.find(
              (preference) => preference.templateId === template.templateId
            )}
            routingOptions={section.routingOptions}
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
    preferences.fetchPreferenceSections();
  }, []);

  console.log(preferences.preferenceSections);

  const renderPreferences = () => {
    if (preferences?.isLoading) {
      return <></>;
    }

    if (
      preferences.preferenceSections &&
      preferences.preferenceSections?.length > 0
    ) {
      return preferences.preferenceSections?.map((section, key) => {
        return (
          <PreferenceSection
            section={section}
            preferences={preferences}
            key={key}
          />
        );
      });
    }

    // TODO: Handle Backfilled preferences. (https://linear.app/trycourier/issue/C-6836/cleanup-react-preference-section-template-renderer-after-backfill)
    if (
      !preferences.preferenceSections ||
      preferences.preferenceSections?.length < 1
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
        <FooterWrapper>
          <CourierWrapper>
            <p>Notifications powered by</p>
            <Svg>
              <svg
                viewBox="0 0 145 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="145" height="33" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_1328_48105"
                      transform="translate(0 -0.000649931) scale(0.00268097 0.01178)"
                    />
                  </pattern>
                  <image
                    id="image0_1328_48105"
                    width="373"
                    height="85"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </Svg>
          </CourierWrapper>
          <Button>
            <p>More about preferences</p>
            <svg
              width="6"
              height="9"
              viewBox="0 0 6 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.0392 7.69575L4.5096 4.54163L1.0392 1.37009C0.570225 0.95186 1.33934 0.23739 1.80831 0.673043L5.76644 4.24539C5.93527 4.40222 5.93527 4.66361 5.76644 4.80302L1.80831 8.41022C1.33934 8.82845 0.570226 8.11398 1.0392 7.69575Z"
                fill="#F9FAFB"
              />
            </svg>
          </Button>
        </FooterWrapper>
      </ThemeProvider>
    </>
  );
};
