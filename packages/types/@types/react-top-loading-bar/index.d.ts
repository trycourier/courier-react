declare module "react-top-loading-bar" {
  type LoadingBarProps = {
    className?: string;
    onRef: (ref: React.RefObject) => void;
    color: string;
    height: number;
  };

  const ReactTopLoadingBar: React.FunctionComponent<LoadingBarProps>;

  export default ReactTopLoadingBar;
}
