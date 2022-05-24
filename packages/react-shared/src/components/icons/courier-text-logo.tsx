import styled from "styled-components";
import CourierTextLogoSvg from "./assets/courier-text-logo.svg";
import { genIconStyles } from "./styles";
import { IconProps } from "./types";

export const CourierTextLogo = styled(CourierTextLogoSvg)<IconProps>(
  genIconStyles
);
