import { Footer, Header, PreferencesV4 } from "@trycourier/react-preferences";
import React from "react";
import styled from "styled-components";

const PreferencePageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreferencesV4Container = styled.div`
  width: 50%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  overflow: auto;
`;

const HeaderContainer = styled.div`
  width: 50%;
`;

const PreferencePage: React.FunctionComponent<{ draft?: boolean }> = ({
  draft = false,
}) => {
  return (
    <PreferencePageContainer>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <PreferencesV4Container>
        <PreferencesV4 draft={draft} />
      </PreferencesV4Container>
      <Footer />
    </PreferencePageContainer>
  );
};

export default PreferencePage;
