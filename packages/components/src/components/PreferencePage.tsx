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
  padding-bottom: 100px;
`;
//Must add padding bottom of 100px to offset the footer

const HeaderContainer = styled.div`
  width: 50%;
`;

const FooterContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const PreferencePage: React.FunctionComponent<{
  tenantId?: string;
  draft?: boolean;
}> = ({ tenantId, draft = false }) => {
  return (
    <PreferencePageContainer>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <PreferencesV4Container>
        <PreferencesV4 tenantId={tenantId} draft={draft} />
      </PreferencesV4Container>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </PreferencePageContainer>
  );
};

export default PreferencePage;
