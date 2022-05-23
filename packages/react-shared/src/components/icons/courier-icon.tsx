import styled from "styled-components";
import { getStandardIconStyles, IconProps } from "../icon";
import CourierSvg from "./courier-icon.svg";

export const CourierIcon = styled(CourierSvg)<IconProps>((opts) =>
  getStandardIconStyles(opts)
);
