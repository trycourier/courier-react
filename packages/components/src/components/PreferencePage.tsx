import { Footer, Header, PreferencesV4 } from "@trycourier/react-preferences";
import React from "react";

const PreferencePage: React.FunctionComponent<{ draft?: boolean }> = ({
  draft = false,
}) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header draft={draft} />
      <div
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid rgba(203, 213, 224, 0.5)",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <PreferencesV4 draft={draft} />
      </div>
      <Footer draft={draft} />
    </div>
  );
};

export default PreferencePage;
