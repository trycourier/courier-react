import React, { useRef, useState } from "react";
import { TippyProps } from "@tippyjs/react";
import OptionsIcon from "~/assets/options.svg";
import { OptionsIconButton } from "./styled";
import Options from "./Options";
import { useClickOutside } from "~/hooks";
import { IMessageOption } from "~/hooks/use-message-options";

import StyledTippy from "../StyledTippy";

const tippyProps: TippyProps = {
  placement: "bottom",
  interactive: true,
  interactiveDebounce: 75,
  offset: [0, -8],
};

const OptionsDropdown: React.FunctionComponent<{
  options: IMessageOption[];
}> = ({ options }) => {
  const ref = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = (event: React.MouseEvent) => {
    event?.preventDefault();
    setShowOptions(!showOptions);
  };

  const handleClickOutside: EventListener = (event) => {
    event?.preventDefault();
    if (!showOptions) {
      return;
    }
    setShowOptions(false);
  };

  useClickOutside(ref, handleClickOutside);

  return (
    <span ref={ref}>
      <StyledTippy
        {...tippyProps}
        visible={showOptions}
        content={<Options options={options} onClose={handleShowOptions} />}
      >
        <OptionsIconButton onClick={handleShowOptions}>
          <OptionsIcon />
        </OptionsIconButton>
      </StyledTippy>
    </span>
  );
};

export default OptionsDropdown;
