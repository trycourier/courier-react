import styled from "styled-components";
import { ThemedOpts } from "~/types";
import { getStandardIconStyles } from "../icon";
import CourierSvg from "./courier-icon.svg";

export const CourierIcon = styled(CourierSvg)<ThemedOpts>((opts) =>
  getStandardIconStyles(opts)
);
