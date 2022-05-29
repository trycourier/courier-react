import styled, { CSSObject } from "styled-components";

export const Description = styled.p(
  (): CSSObject => ({
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 400,
    fontSize: "10px",
    color: "#79849A",
    margin: "6px 0 0 0",
  })
);
