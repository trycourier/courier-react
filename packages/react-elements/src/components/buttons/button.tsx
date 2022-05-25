import styled from "styled-components";
import { genButtonStyles } from "./styles";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>(genButtonStyles);
