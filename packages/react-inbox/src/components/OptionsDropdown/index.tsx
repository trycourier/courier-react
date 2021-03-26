import React from "react";
import { OptionsIconContainer, Container } from "./styled";
import OptionsIcon from "./options.svg";
import styled from "styled-components";
import Tippy, { TippyProps } from "@tippyjs/react";
import Options from "./Options";

const StyledTippy = styled(Tippy)`
  transform: translateX(-1px);
  .tippy-arrow {
    color: #344563 !important;
  }

  .tippy-content {
    font-family: "Nunito", sans-serif;
    background-color: #344563;
    width: 108px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    color: #24324b;
    border-radius: 4px !important;

    > div {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      border-radius: 4px !important;
    }
  }
`;

const tippyProps: TippyProps = {
  placement: "bottom",
  trigger: "click",
  interactive: true,
  interactiveDebounce: 75,
  offset: [0, -8],
};

function OptionsDropdown({ options }) {
  return (
    <Container>
      <StyledTippy {...tippyProps} content={<Options options={options} />}>
        <OptionsIconContainer>
          <OptionsIcon />
        </OptionsIconContainer>
      </StyledTippy>
    </Container>
  );
}

export default OptionsDropdown;
