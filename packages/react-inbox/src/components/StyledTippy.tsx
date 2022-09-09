import styled from "styled-components";
import Tippy from "@tippyjs/react";

const StyledTippy = styled(Tippy)`
  transform: translateX(-1px);
  .tippy-content {
    box-sizing: border-box;
    background-color: #1c273a;
    width: 122px;
    font-size: 12px;
    text-align: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    color: white;
    font-weight: 700;
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

export default StyledTippy;
