import React from "react";
import styled, { CSSObject } from "styled-components";
import { CourierElement } from "..";

export type PrettyDateOpts = {
  locale?: string;
  date?: string | number | Date;
  dateFormat?: Intl.DateTimeFormatOptions;
  prefix?: string;
  color?: string;
};

export const PrettyDate: CourierElement<PrettyDateOpts> = (opts) => {
  return (
    <PrettyDateContainer>
      {opts.prefix}
      {new Date().toLocaleDateString(
        opts.locale,
        opts.dateFormat ?? {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )}
    </PrettyDateContainer>
  );
};

const PrettyDateContainer = styled.p<{
  color?: string;
}>(
  ({ color }): CSSObject => ({
    color: color ?? "rgba(115, 129, 155, 0.5);",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "-0.02em",
    display: "inline-block",
  })
);
