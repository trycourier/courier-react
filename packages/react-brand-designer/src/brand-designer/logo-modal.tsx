import React, { ComponentPropsWithoutRef } from "react";
import { Button, Input, Modal } from "@trycourier/react-elements";
import { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { BrandConfig } from "~/types";

export const LogoModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (logo: BrandConfig["logo"]) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [logo, setLogo] = React.useState<BrandConfig["logo"]>({
    src: "",
  });

  const handleApplyClick = () => {
    onSave(logo);
    onClose();
  };

  return (
    <StyledModal title="Upload Logo" isOpen={isOpen} onClose={onClose}>
      <LogoFormContainer>
        <label htmlFor="path">Image Path</label>
        <LogoInput
          name="path"
          type="text"
          placeholder="Enter a URL"
          onChange={(e) => setLogo({ ...logo, src: e.target.value ?? "" })}
        />
        <label htmlFor="href">Image Href</label>
        <LogoInput
          name="href"
          type="text"
          placeholder="Enter a URL"
          onChange={(e) =>
            setLogo({ src: logo?.src ?? "", href: e.target.value ?? "" })
          }
        />
        <LogoControlsContainer>
          <LogoButton onClick={handleApplyClick}>Apply</LogoButton>
          <LogoButton className="danger" onClick={onClose}>
            Cancel
          </LogoButton>
        </LogoControlsContainer>
      </LogoFormContainer>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)((): CSSObject => ({}));

const LogoFormContainer = styled.form(
  (): CSSObject => ({
    boxSizing: "border-box",
    width: "100%",
    padding: "1rem",
    label: {
      fontSize: "0.875rem",
      display: "inline-block",
      marginBottom: "0.5rem",
    },
  })
);

const LogoInput = styled(Input)(
  (): CSSObject => ({
    marginBottom: "0.75rem",
  })
);

const LogoControlsContainer = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    ">:not(:last-child)": {
      marginRight: "0.5rem",
    },
  })
);

const LogoButtonWrapper = styled(Button)(
  (): CSSObject => ({
    width: "fit-content",
    background: "none",
    border: "0.15rem solid rgb(88, 114, 162)",
    "&.danger": {
      background: "rgb(88, 114, 162)",
      border: "none",
    },
  })
);

const LogoButton: FC<ComponentPropsWithoutRef<"button">> = (props) => (
  <LogoButtonWrapper type="button" {...props}>
    {props.children}
  </LogoButtonWrapper>
);
