import React from "react";

export type CourierElement<T = Record<string, unknown>> = React.FC<
  T & React.HTMLAttributes<HTMLElement>
>;
