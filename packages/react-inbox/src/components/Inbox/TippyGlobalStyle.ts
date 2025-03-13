import { createGlobalStyle } from "styled-components";

const TippyStyle = createGlobalStyle`
  @keyframes inbox--badge-pulse {
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
  
  .tippy-box[data-animation=fade][data-state=hidden]{
      opacity:0
  }
  [data-tippy-root]{
      max-width:calc(100vw - 10px)
  }
  .inbox--tippy-main{
      background:transparent;
      position:relative;
      color: #1c273a;
      font-size:14px;
      line-height:1.4;
      outline:0;
      transition-property:transform,visibility,opacity
  }
  .inbox--tooltip[data-placement^=top]>.tippy-arrow{
      bottom:0
  }
  .inbox--tooltip[data-placement^=top]>.tippy-arrow:before{
      bottom:-4px;
      left:3px;
      border-width:4px 4px 0;
      border-top-color:initial;
      transform-origin:center top
  }
  .inbox--tooltip[data-placement^=bottom]>.tippy-arrow{
      top:0
  }
  .inbox--tooltip[data-placement^=bottom]>.tippy-arrow:before{
      top:-4px;
      left:3px;
      border-width:0 4px 4px;
      border-bottom-color:initial;
      transform-origin:center bottom
  }
  .inbox--tooltip[data-placement^=left]>.tippy-arrow{
      right:0
  }
  .inbox--tooltip[data-placement^=left]>.tippy-arrow:before{
      border-width:8px 0 8px 8px;
      border-left-color:initial;
      right:-7px;
      transform-origin:center left
  }
  .inbox--tooltip[data-placement^=right]>.tippy-arrow{
      left:0
  }
  .inbox--tooltip[data-placement^=right]>.tippy-arrow:before{
      left:-7px;
      border-width:8px 8px 8px 0;
      border-right-color:initial;
      transform-origin:center right
  }
  .tippy-box[data-inertia][data-state=visible]{
      transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)
  }
  .inbox--tooltip .tippy-arrow{
      width:16px;
      height:16px;
      color:#1c273a;
  }
  .inbox--tooltip .tippy-arrow:before{
      content:"";
      position:absolute;
      border-color:transparent;
      border-style:solid
  }
  .inbox--tooltip .tippy-content{
      position:relative;
      padding:5px 9px;
      z-index:1
  }
  
`;

export default TippyStyle;
