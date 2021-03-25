import React, { useState } from 'react'
import { OptionsIconContainer, Container } from './styled'
import OptionsIcon from './options.svg'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import Options from './Options';

const StyledTippy = styled(Tippy)`
  .tippy-content {
    font-family: "Nunito", sans-serif;
    background-color: #FFFFFF !important;
    height: 83px;
    width: 108px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    color: #24324B;
    border-radius: 4px;
    > div {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }
  }
`;
let tippyProps = {
  trigger: "click",
  placement: 'bottom-start',
  interactive: true,
  arrow: false,
  interactiveDebounce: 75,
  distance: 0,
  offset: [0, -39]
};


function OptionsDropdown({ options }) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Container>
      <StyledTippy visible={showDropdown} {...tippyProps} content={<Options close={() => setShowDropdown(false)} options={options} />}>
      <OptionsIconContainer onClick={() => setShowDropdown(!showDropdown)}>
        <OptionsIcon />
      </OptionsIconContainer>
      </StyledTippy>
    </Container>
  )
}

export default OptionsDropdown
