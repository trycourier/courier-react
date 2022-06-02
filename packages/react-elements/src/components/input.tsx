import styled, { CSSObject } from "styled-components";

export const Input = styled.input(
  (): CSSObject => ({
    width: "100%",
    boxSizing: "border-box",
    padding: "0.75rem",
    borderRadius: "0.25rem",
    border: "none",
    "&:focus": {
      outline: "none",
    },
  })
);
