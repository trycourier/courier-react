import { Footer, Header, PreferenceList } from "@trycourier/react-preferences";
import React from "react";

const PreferencePage: React.FunctionComponent = () => {
  return (
    <div>
      <Header />
      <PreferenceList />
      <Footer />
    </div>
  );
};

export default PreferencePage;
