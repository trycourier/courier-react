declare module "*.svg" {
  export type SvgComponent = React.FunctionComponent<{
    width?: string | number;
    height?: string | number;
    preserveAspectRatio?: string;
    viewBox?: string;
  }>;
  const Svg: SvgComponent;
  export default Svg;
}
