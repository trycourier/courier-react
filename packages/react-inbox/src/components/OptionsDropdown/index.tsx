import React, { useState } from 'react'
import { ArrowContainer, Container } from './styled'
import ArrowIcon from './arrow.svg'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'

const StyledTippy = styled(Tippy)`
  .tippy-tooltip {
    top: -15px;
  }
  .tippy-content {
    font-family: "Nunito", sans-serif;
    background-color: #FFFFFF !important;
    height: 83px;
    width: 108px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    color: #24324B;
    border-radius: 4px;
  }
`;
let tippyProps = {
  trigger: "click",
  placement: 'bottom-start',
  interactive: true,
  arrow: false,
  interactiveDebounce: 75,
  distance: 0,
  offset: [0, -15]
};


function OptionsDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Container>
      <StyledTippy {...tippyProps} content={"This is a message"}>
      <ArrowContainer onClick={() => setShowDropdown(!showDropdown)}>
        <ArrowIcon data-popper-arrow="" />
      </ArrowContainer>
      </StyledTippy>
    </Container>
  )
}

export default OptionsDropdown
