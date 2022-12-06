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
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        <Header />
      </div>
      <div
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.2)",
          width: "50%",
        }}
      >
        <PreferencesV4 draft={draft} />
      </div>
      <Footer />
    </div>
  );
};

export default PreferencePage;
