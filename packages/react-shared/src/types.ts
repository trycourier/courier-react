import { Interpolation } from "styled-components";

export type ThemeFn<T = any> = (props: T) => Interpolation<React.CSSProperties>;
