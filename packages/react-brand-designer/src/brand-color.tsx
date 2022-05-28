import React from "react";
import styled, { CSSObject } from "styled-components";
import { Description } from "./description";

export const BrandColor: React.FunctionComponent<{
  value: string;
  label: string;
  onChange: (value: string) => void;
}> = ({ value, label, onChange }) => {
  return (
    <BrandColorContainer>
      <BrandColorPreview color={value} />
      <Description>{label}</Description>
      <BrandColorHex color={value}>{value.toUpperCase()}</BrandColorHex>
      <input
        type="color"
        name={label}
        value={value}
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.value)}
      />
    </BrandColorContainer>
  );
};

const BrandColorContainer = styled.label((): CSSObject => ({}));

const BrandColorPreview = styled.div<{ color: string }>(
  ({ color }): CSSObject => ({
    backgroundColor: color,
    borderRadius: "100%",
    width: "35px",
    height: "35px",
  })
);
const BrandColorHex = styled.p<{ color: string }>(
  ({ color }): CSSObject => ({
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "16px",
    margin: "0",
    color,
  })
);
