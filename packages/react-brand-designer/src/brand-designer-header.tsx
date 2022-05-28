import React from "react";
import styled, { CSSObject } from "styled-components";
import { Title } from "@trycourier/react-elements";

const HeaderContainer = styled.div(
  (): CSSObject => ({
    flexBasis: "48px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 32px",
    boxSizing: "border-box",
  })
);

export const BrandDesignerHeader: React.FunctionComponent = () => {
  return (
    <HeaderContainer style={{ margin: 0 }}>
      <Title>Configure your brand</Title>
    </HeaderContainer>
  );
};
