import React from "react";
import styled, { CSSObject } from "styled-components";
import { Title } from "@trycourier/react-elements";
import { BrandColor } from "./brand-color";
import { Description } from "./description";

export const BrandOptions: React.FunctionComponent = () => {
  const [color, setColor] = React.useState("#22C3C6");
  const [color2, setColor2] = React.useState("#FBB03B");
  return (
    <BrandOptionsContainer>
      <Title style={{ margin: "0 0 14px 0" }} level={3}>
        Brand colors
      </Title>
      <BrandColorInputsContainer>
        <BrandColor value={color} label="Brand" onChange={setColor} />
        <BrandColor value={color2} label="Primary CTA" onChange={setColor2} />
      </BrandColorInputsContainer>
      <Title style={{ margin: "0 0 7px 0" }} level={3}>
        Brand colors
      </Title>
      <Description>PNG or JPG with a width of 140px or more</Description>
    </BrandOptionsContainer>
  );
};

const BrandOptionsContainer = styled.div(
  (): CSSObject => ({
    padding: "32px",
    boxSizing: "border-box",
    backgroundColor: "#F9FAFB",
    height: "100%",
    width: "256px",
  })
);

const BrandColorInputsContainer = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: "32px",
    ">:not(:last-child)": {
      marginRight: "26px",
    },
  })
);
``;
