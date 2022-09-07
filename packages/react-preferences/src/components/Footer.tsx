import { usePreferences } from "@trycourier/react-hooks";
import React, { useEffect } from "react";
import { BusinessFooter } from "./BusinessFooter";
import { FreeFooter } from "./FreeFooter";

export const Footer: React.FunctionComponent = () => {
  const preferences = usePreferences();
  useEffect(() => {
    preferences.fetchPreferencePage();
  }, []);

  if (preferences.isLoading || !preferences.preferencePage) {
    return null;
  }

  return (
    <>
      {preferences.preferencePage?.showCourierFooter ? (
        <FreeFooter />
      ) : (
        <BusinessFooter links={preferences.preferencePage.brand.links} />
      )}
    </>
  );
};
