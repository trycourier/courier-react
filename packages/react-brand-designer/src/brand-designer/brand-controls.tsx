import React, { FC, useMemo } from "react";
import styled, { CSSObject } from "styled-components";
import {
  Title,
  Button,
  Description,
  MediumColorPicker,
  CourierElement,
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
      <UploadLogoControls
        logo={config.logo}
        onClick={() => setIsLogoModalOpen(true)}
      />
      <LogoModal
        isOpen={isLogoModalOpen}
        onSave={setLogo}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </BrandControlsContainer>
  );
};

const BrandControlsContainer = styled.div(
  ({ theme }): CSSObject => ({
    padding: "32px",
    boxSizing: "border-box",
    background: theme?.background ?? "#F9FAFB",
    height: "100%",
    overflow: "scroll",
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

const UploadLogoControls: CourierElement<{ logo?: BrandConfig["logo"] }> = ({
  logo,
  onClick,
}) => {
  const button = useMemo(() => {
    if (!logo || typeof logo.src !== "string") {
      return <UploadLogoButton onClick={onClick}>Upload logo</UploadLogoButton>;
    }

    return <ChangeLogoButton src={logo.src} onClick={onClick} />;
  }, [logo]);

  return <UploadLogoControlsContainer>{button}</UploadLogoControlsContainer>;
};

const ChangeLogoButton: CourierElement<{ src: string }> = ({
  src,
  ...props
}) => {
  return (
    <ChangeLogoButtonContainer {...props}>
      <img className="logo-img" src={src} alt="logo" />
      <div className="logo-overlay">
        <p>Change Logo</p>
      </div>
    </ChangeLogoButtonContainer>
  );
};

const ChangeLogoButtonContainer = styled.button`
  all: unset;
  display: inline-block;
  border-radius: 0.3em;
  border: 1px solid #e7e2e9;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  width: 140px;
  position: relative;
  z-index: 1;

  &:hover {
    border-style: none;
  }

  .logo-img {
    z-index: 2;
    float: left;
    max-width: 100%;
  }

  .logo-overlay {
    position: absolute;
    z-index: 3;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(241, 242, 242, 0.85);
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-overlay:hover {
    opacity: 1;
  }

  .logo-overlay > p {
    margin: 0;
    font-size: 14px;
    line-height: 19px;
    font-weight: 700;
    color: rgba(36, 50, 75, 1);
  }
`;

const UploadLogoButton = styled(Button)(
  (): CSSObject => ({
    padding: "8px 17px",
    height: "24.59px",
    backgroundColor: "#F0F0F0",
    color: "#73819B",
    borderRadius: 4,
    fontSize: "12px",
    fontWeight: 400,
  })
);

const UploadLogoControlsContainer = styled.div`
  margin: 0.9em 0 0 0;
`;
