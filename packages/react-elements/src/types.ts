import React from "react";

export type CourierElement<T = Record<string, unknown>> = React.FC<
  React.HTMLAttributes<HTMLElement> & T
>;
