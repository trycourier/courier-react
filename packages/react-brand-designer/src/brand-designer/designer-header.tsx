import React from "react";
import styled, { CSSObject } from "styled-components";
import {
  Button,
  CourierElement,
  PrettyDate,
  Title,
} from "@trycourier/react-elements";

export type DesignerHeaderOpts = {
  title?: string;
  saveDate?: string | number | Date;
  saveDatePrefix?: string;
  saveButtonText?: string;
  disableSaveButton?: boolean;
  onSave: () => void;
};

export const BrandDesignerHeader: CourierElement<DesignerHeaderOpts> = ({
  title,
  saveDate: date,
  saveDatePrefix: datePrefix,
  saveButtonText,
  disableSaveButton,
  onSave,
}) => {
  return (
    <HeaderContainer style={{ margin: 0 }}>
      <Title>{title ?? "Configure your brand"}</Title>
      <div className="publish">
        {date && <PrettyDate prefix={datePrefix ?? "Last published "} />}
        <SaveButton onClick={onSave} disabled={disableSaveButton}>
          {saveButtonText ?? "Publish Changes"}
        </SaveButton>
      </div>
    </HeaderContainer>
  );
};

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

const SaveButton = styled(Button)(
  (): CSSObject => ({
    padding: "10px 24px",
    maxHeight: "32px",
    background: "#24324B",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "14px",
  })
);
