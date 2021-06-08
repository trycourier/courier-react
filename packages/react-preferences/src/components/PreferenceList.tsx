import React, { useEffect } from "react";
import { useCourier, registerReducer } from "@trycourier/react-provider";

import { Preferences } from "./Preferences";
import reducer from "~/reducer";
import usePreferenceActions from "~/hooks/use-preferences-actions";
import styled from "styled-components";

export const StyledList = styled.div`
  padding: 0 24px;
  overflow: scroll;
  display: flex;
  height: 410px;
  flex-direction: column;
  border-top: 1px solid rgba(203, 213, 224, 0.5);
  scroll-snap-type: "y proximity";
`;

export const PreferenceList: React.FunctionComponent = () => {
  const { brand, preferences } = useCourier();
  const { fetchRecipientPreferences } = usePreferenceActions();

  useEffect(() => {
    registerReducer("preferences", reducer);
    fetchRecipientPreferences();
  }, []);

  return (
    <StyledList>
      {preferences?.isLoading || !brand?.preferenceTemplates?.length ? (
        <></>
      ) : (
        brand?.preferenceTemplates?.map((template) => (
          <Preferences
            key={template.templateId}
            preferenceTemplate={template}
            recipientPreference={preferences?.recipientPreferences?.find(
              (preference) => preference.templateId === template.templateId
            )}
          ></Preferences>
        ))
      )}
    </StyledList>
  );
};
