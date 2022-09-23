import { usePreferences } from "@trycourier/react-hooks";
import React, { useEffect } from "react";
import { BusinessFooter } from "./BusinessFooter";
import { FreeFooter } from "./FreeFooter";
import styled from "styled-components";

export const Footer: React.FunctionComponent = () => {
  const preferences = usePreferences();
  useEffect(() => {
    preferences.fetchPreferencePage();
  }, []);

  if (preferences.isLoading || !preferences.preferencePage) {
    return null;
  }

  const FooterWrapepr = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    > div {
      height: 50px;
      padding: 10px;
    }
  `;

  return (
    <FooterWrapepr>
      {preferences.preferencePage?.showCourierFooter ? (
        <FreeFooter />
      ) : (
        <BusinessFooter links={preferences.preferencePage.brand.links} />
      )}
    </FooterWrapepr>
  );
};
