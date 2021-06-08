import React, { useEffect } from "react";
import { registerReducer } from "@trycourier/react-provider";

import { Preferences } from "./Preferences";
import reducer from "~/reducer";
import { useCourier } from "@trycourier/react-provider";

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
  const { brand } = useCourier();

  useEffect(() => {
    registerReducer("preferences", reducer);
  }, []);

  return (
    <StyledList>
      {!brand?.preferenceTemplates?.length ? (
        <></>
      ) : (
        brand?.preferenceTemplates?.map((template) => (
          <Preferences
            key={template.templateId}
            preferenceTemplate={template}
          ></Preferences>
        ))
      )}
    </StyledList>
  );
};
