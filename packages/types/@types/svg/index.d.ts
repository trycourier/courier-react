declare module "*.svg" {
  const Component: React.FunctionComponent<{ width?: string; height?: string }>;
  export default Component;
}
