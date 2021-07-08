import React, { useEffect } from "react";
import { useCourier, registerReducer } from "@trycourier/react-provider";

import { PreferenceTemplate } from "./PreferenceTemplate";
import reducer from "~/reducer";
import usePreferenceActions from "~/hooks/use-preferences-actions";
import styled, { ThemeProvider, ThemeProps } from "styled-components";

export const StyledList = styled.div`
  overflow: scroll;
  display: flex;
  height: 433px;
  flex-direction: column;
  border-top: 1px solid rgba(203, 213, 224, 0.5);
  scroll-snap-type: "y proximity";
  background: rgba(255, 255, 255, 0.2);
`;

export const PreferenceList: React.FunctionComponent<{
  // TODO: define Preferences theming
  theme?: ThemeProps<any>;
}> = (props) => {
  const { brand, preferences } = useCourier();
  const { fetchRecipientPreferences } = usePreferenceActions();

  useEffect(() => {
    registerReducer("preferences", reducer);
    fetchRecipientPreferences();
  }, []);

  return (
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
  );
};
