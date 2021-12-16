import React, { useRef, useState } from "react";
import styled from "styled-components";
import Tippy, { TippyProps } from "@tippyjs/react";
import OptionsIcon from "~/assets/options.svg";
import { OptionsIconButton } from "./styled";
import Options from "./Options";
import { useClickOutside } from "~/hooks";

const StyledTippy = styled(Tippy)`
  transform: translateX(-1px);
  .tippy-arrow {
    color: #344563 !important;
  }
  .tippy-content {
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
  interactive: true,
  interactiveDebounce: 75,
  offset: [0, -8],
};

function OptionsDropdown({ options }) {
  const ref = useRef(null);

  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = (event: React.MouseEvent) => {
    event?.preventDefault();
    setShowOptions(!showOptions);
  };

  const handleClickOutside: EventListener = (event) => {
    event?.preventDefault();
    setShowOptions(false);
  };

  useClickOutside(ref, handleClickOutside);

  return (
    <StyledTippy
      {...tippyProps}
      visible={showOptions}
      content={
        <span ref={ref}>
          <Options options={options} onClose={handleShowOptions} />{" "}
        </span>
      }
    >
      <OptionsIconButton onClick={handleShowOptions}>
        <OptionsIcon />
      </OptionsIconButton>
    </StyledTippy>
  );
}

export default OptionsDropdown;
