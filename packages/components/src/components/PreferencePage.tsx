import { Footer, Header, PreferenceList } from "@trycourier/react-preferences";
import React from "react";

const PreferencePage: React.FunctionComponent<{ draft?: boolean }> = ({
  draft = false,
}) => {
  return (
    <div>
      <Header draft={draft} />
      <PreferenceList draft={draft} />
      <Footer draft={draft} />
    </div>
  );
};

export default PreferencePage;
