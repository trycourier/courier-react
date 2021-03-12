declare module "better-react-spinkit" {
  type SpinnerProps = {
    className?: string;
    color?: string;
    duration?: string;
    scaleEnd?: number;
    scaleStart?: number;
    size?: number;
  };

  const Pulse: React.FunctionComponent<SpinnerProps>;

  export { Pulse };
}
