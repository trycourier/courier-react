import { createGlobalStyle } from "styled-components";

const TippyStyle = createGlobalStyle`
  @keyframes badge-pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(222, 80, 99, 0.3);
      box-shadow: 0 0 0 0 rgba(222, 80, 99, 0.3);
    }
    10% {
      -moz-box-shadow: 0 0 0 10px rgba(222, 80, 99, 0);
      box-shadow: 0 0 0 10px rgba(222, 80, 99, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(222, 80, 99, 0);
      box-shadow: 0 0 0 0 rgba(222, 80, 99, 0);
    }
  }
  .tippy-box[data-animation="fade"][data-state="hidden"] {
    opacity: 0;
  }

  .tippy-box {
    position: relative;
    color: #fff;
    font-size: 14px;
    line-height: 1.4;
    outline: 0;
    transition-property: transform, visibility, opacity;
  }
  
  
  .tippy-box[data-inertia][data-state="visible"] {
    transition-timing-function: cubic-bezier(0.54, 1.5, 0.38, 1.11);
  }
  
  .tippy-content {
    position: relative;
    padding: 5px 9px;
    z-index: 1;
  }
`;

export default TippyStyle;
