import styled from "styled-components";
import { genButtonStyles } from "./styles";
import { ButtonProps } from "./types";

export const LinkButton = styled.a<ButtonProps>(genButtonStyles);
