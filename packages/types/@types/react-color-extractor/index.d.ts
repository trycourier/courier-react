declare module "react-color-extractor" {
  interface ColorExtractorProp {
    children: JSX;
    getColors?: Function;
  }

  export const ColorExtractor: React.FunctionComponent<ColorExtractorProp>;
}
