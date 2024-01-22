import tinycolor2 from "tinycolor2";
import { InboxTheme } from "~/types";

export const getStyles = (theme: InboxTheme) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return {
    cursor: "pointer",
    border: "none",
    background: "transparent",
    borderRadius: "6px",
    padding: 0,
    marginLeft: theme.rtl ? undefined : "6px",
    marginRight: theme.rtl ? "6px" : undefined,
    height: "24px",
    width: "24px",
    transition: "background 200ms ease-in-out",

    "&:hover": {
      background: tcPrimaryColor.setAlpha(0.14).toRgbString(),
    },
  };
};
