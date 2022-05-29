import React from "react";
import styled, { CSSObject } from "styled-components";
import { Description } from "../description";

export const MediumColorPicker: React.FunctionComponent<{
  value: string;
  label: string;
  onChange: (value: string) => void;
}> = ({ value, label, onChange }) => {
  return (
    <ColorPickerContainer>
      <ColorPreview color={value} />
      <Description>{label}</Description>
      <ColorHex color={value}>{value.toUpperCase()}</ColorHex>
      <input
        type="color"
        name={label}
        value={value}
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.value)}
      />
    </ColorPickerContainer>
  );
};

const ColorPickerContainer = styled.label((): CSSObject => ({}));

const ColorPreview = styled.div<{ color: string }>(
  ({ color }): CSSObject => ({
    backgroundColor: color,
    borderRadius: "100%",
    width: "35px",
    height: "35px",
  })
);

const ColorHex = styled.p<{ color: string }>(
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
