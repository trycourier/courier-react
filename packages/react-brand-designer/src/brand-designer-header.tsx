import React from "react";
import styled, { CSSObject } from "styled-components";
import { Button, PrettyDate, Title } from "@trycourier/react-elements";

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
    "div.publish": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      ">:not(:last-child)": {
        marginRight: "8px",
      },
    },
  })
);

export const BrandDesignerHeader: React.FunctionComponent = () => {
  return (
    <HeaderContainer style={{ margin: 0 }}>
      <Title>Configure your brand</Title>
      <div className="publish">
        <PrettyDate prefix="Last published " />
        <PublishButton>Publish Changes</PublishButton>
      </div>
    </HeaderContainer>
  );
};

const PublishButton = styled(Button)(
  (): CSSObject => ({
    padding: "10px 24px",
    maxHeight: "32px",
    background: "#24324B",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "14px",
  })
);
