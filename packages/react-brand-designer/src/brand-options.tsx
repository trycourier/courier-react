import React from "react";
import styled, { CSSObject } from "styled-components";
import { Title, Button, CourierElement } from "@trycourier/react-elements";
import { BrandColor } from "./brand-color";
import { Description } from "./description";

export type BrandOptionsParams = {
  options: {
    colors: {
      primary: string;
      secondary: string;
      [key: string]: string;
    };
  };
  onChange: (options: BrandOptionsParams["options"]) => void;
};

export const BrandOptions: CourierElement<BrandOptionsParams> = (opts) => {
  const { options, onChange } = opts;

  const setColor = (key: string) => (color: string) => {
    onChange({
      ...options,
      colors: {
        ...options.colors,
        [key]: color,
      },
    });
  };

  return (
    <BrandOptionsContainer>
      <Title style={{ margin: "0 0 14px 0" }} level={3}>
        Brand colors
      </Title>
      <BrandColorInputsContainer>
        <BrandColor
          value={options.colors.primary}
          label="Primary"
          onChange={setColor("primary")}
        />
        <BrandColor
          value={options.colors.secondary}
          label="Secondary"
          onChange={setColor("secondary")}
        />
      </BrandColorInputsContainer>
      <Title style={{ margin: "0 0 7px 0" }} level={3}>
        Upload logo
      </Title>
      <Description>PNG or JPG with a width of 140px or more</Description>
      <ChooseFileButton>Choose file</ChooseFileButton>
    </BrandOptionsContainer>
  );
};

const BrandOptionsContainer = styled.div(
  (): CSSObject => ({
    padding: "32px",
    boxSizing: "border-box",
    backgroundColor: "#F9FAFB",
    height: "100%",
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

const ChooseFileButton = styled(Button)(
  (): CSSObject => ({
    padding: "4px 24px",
    height: "24.59px",
    margin: "14px 0 0 0",
    backgroundColor: "#F0F0F0",
    color: "#73819B",
    borderRadius: 0,
  })
);
