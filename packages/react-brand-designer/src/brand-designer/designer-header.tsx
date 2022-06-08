import React from "react";
import styled, { CSSObject } from "styled-components";
import {
  CourierElement,
  LinkButton,
  PrettyDate,
  Title,
} from "@trycourier/react-elements";

export type DesignerHeaderProps = {
  title?: string;
  saveDate?: string | number | Date;
  saveDatePrefix?: string;
  saveButtonText?: string;
  disableSaveButton?: boolean;
  onSave: () => void;
};

export const BrandDesignerHeader: CourierElement<DesignerHeaderProps> = ({
  title,
  saveDate: date,
  saveDatePrefix: datePrefix,
  saveButtonText,
  onSave,
}) => {
  return (
    <HeaderContainer style={{ margin: 0 }}>
      <Title>{title ?? "Configure your brand"}</Title>
      <div className="publish">
        {date && <PrettyDate prefix={datePrefix ?? "Last published "} />}
        <CopyButton onClick={onSave}>
          {saveButtonText ?? "Publish Changes"}
        </CopyButton>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div(
  (): CSSObject => ({
    flexBasis: "48px",
    width: "100%",
    borderBottom: "2px solid #E1E5E9",
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

const CopyButton = styled(LinkButton)(
  (): CSSObject => ({
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#24324B",
    cursor: "pointer",
    background: "none",
    "&:hover": {
      background: "none",
    },
  })
);
