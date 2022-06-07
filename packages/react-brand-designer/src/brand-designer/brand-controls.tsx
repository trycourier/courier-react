import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import {
  Title,
  Button,
  Description,
  MediumColorPicker,
} from "@trycourier/react-elements";
import { BrandConfig, BrandHandler } from "../types";
import { LogoModal } from "./logo-modal";

export type BrandControlsProps = {
  config: BrandConfig;
  onChange: BrandHandler;
};

export const BrandControls: FC<BrandControlsProps> = (opts) => {
  const { config, onChange } = opts;
  const [isLogoModalOpen, setIsLogoModalOpen] = React.useState(false);

  const setColor = (key: string) => (color: string) => {
    onChange({
      ...config,
      colors: {
        ...config.colors,
        [key]: color,
      },
    });
  };
  const setLogo = (logo: BrandConfig["logo"]) => {
    onChange({
      ...config,
      logo,
    });
  };

  return (
    <BrandControlsContainer>
      <Title style={{ margin: "0 0 14px 0" }} level={3}>
        Brand colors
      </Title>
      <BrandColorInputsContainer>
        <MediumColorPicker
          value={config.colors.primary}
          label="Primary"
          onChange={setColor("primary")}
        />
        <MediumColorPicker
          value={config.colors.secondary}
          label="Secondary"
          onChange={setColor("secondary")}
        />
      </BrandColorInputsContainer>
      <Title style={{ margin: "0 0 7px 0" }} level={3}>
        Brand logo
      </Title>
      <Description>PNG or JPG with a width of 140px or more</Description>
      <ChooseFileButton onClick={() => setIsLogoModalOpen(true)}>
        Upload logo
      </ChooseFileButton>
      <LogoModal
        isOpen={isLogoModalOpen}
        onSave={setLogo}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </BrandControlsContainer>
  );
};

const BrandControlsContainer = styled.div(
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
    padding: "8px 17px",
    height: "24.59px",
    margin: "14px 0 0 0",
    backgroundColor: "#F0F0F0",
    color: "#73819B",
    borderRadius: 0,
    fontSize: "12px",
    fontWeight: 400,
  })
);
