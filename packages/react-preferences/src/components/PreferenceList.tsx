import React from "react";

import { Preferences } from "./preferences";
import { usePreferenceTemplates } from "../hooks";
import styled from "styled-components";

export const StyledList = styled.div`
  background: "#F9FAFB";
  overflow: scroll;
  display: flex;
  height: 410px;
  flex-direction: column;
  border-top: "1px solid rgba(203,213,224,.5)";
  scroll-snap-type: "y proximity";
`;

export const PreferenceList: React.FunctionComponent = () => {
  const preferenceTemplates = usePreferenceTemplates();
  return (
    <StyledList>
      {!preferenceTemplates?.length ? (
        <></>
      ) : (
        preferenceTemplates.map((template) => (
          <Preferences
            key={template.templateId}
            preferenceTemplate={template}
          ></Preferences>
        ))
      )}
    </StyledList>
  );
};
