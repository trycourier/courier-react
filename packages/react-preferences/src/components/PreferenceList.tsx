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

export const PreferenceList: React.FunctionComponent<{
  // TODO: define Preferences theming
  theme?: ThemeProps<any>;
}> = (props) => {
  const { brand } = useCourier();
  const preferences = usePreferences();

  useEffect(() => {
    preferences.fetchRecipientPreferences();
  }, []);

  return (
    <>
      <ThemeProvider
        theme={{
          ...props.theme,
          brand,
        }}
      >
        <StyledList>
          {preferences?.isLoading || !brand?.preferenceTemplates?.length ? (
            <></>
          ) : (
            brand?.preferenceTemplates?.map((template) => (
              <PreferenceTemplate
                key={template.templateId}
                preferenceTemplate={template}
                recipientPreference={preferences?.recipientPreferences?.find(
                  (preference) => preference.templateId === template.templateId
                )}
              ></PreferenceTemplate>
            ))
          )}
        </StyledList>
      </ThemeProvider>
    </>
  );
};
