import React from "react";
import styled, { CSSObject } from "styled-components";
import { CourierElement, PrettyDate, Title } from "@trycourier/react-elements";

export type DesignerHeaderProps = {
  title?: string;
  saveDate?: string | number | Date;
  saveDatePrefix?: string;
  saveButton: React.ReactNode;
};

export const BrandDesignerHeader: CourierElement<DesignerHeaderProps> = ({
  title,
  saveDate: date,
  saveDatePrefix: datePrefix,
  saveButton,
}) => {
  return (
    <HeaderContainer style={{ margin: 0 }}>
      <Title>{title ?? "Configure your brand"}</Title>
      <div className="publish">
        {date && <PrettyDate prefix={datePrefix ?? "Last published "} />}
        {saveButton}
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div(
  ({ theme }): CSSObject => ({
    flexBasis: "48px",
    width: "100%",
    borderBottom: "2px solid #E1E5E9",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 32px",
    boxSizing: "border-box",
    backgroundColor: theme.headerBackgroundColor ?? "#fff",
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
