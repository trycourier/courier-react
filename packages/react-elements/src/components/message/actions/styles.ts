import tinycolor2 from "tinycolor2";

export const getStyles = (theme) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return {
    cursor: "pointer",
    border: "none",
    background: "transparent",
    borderRadius: "6px",
    padding: 0,
    marginLeft: "6px",
    height: "24px",
    width: "24px",
    transition: "background 200ms ease-in-out",

    "&:hover": {
      background: tcPrimaryColor.setAlpha(0.14).toRgbString(),
    },
  };
};
