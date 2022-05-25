import styled from "styled-components";
import CourierSvg from "./assets/courier.svg";
import { genIconStyles } from "./styles";
import { IconProps } from "./types";

export const Courier = styled(CourierSvg)<IconProps>(genIconStyles);
