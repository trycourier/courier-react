import styled from "styled-components";

export const StyledToggle = styled.div<{ checked: boolean }>`
  display: flex;
  height: 16px;

  label {
    margin: 0;
  }

  .react-toggle {
    touch-action: pan-x;

    display: inline-block;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;

    user-select: none;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  .react-toggle-screenreader-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .react-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transition: opacity 0.25s;
  }

  .react-toggle-track {
    width: 40px;
    height: 12px;
    padding: 0;
    border-radius: 30px;
    background-color: #eae7eb;
    transition: all 0.2s ease;
  }

  .react-toggle-thumb {
    height: 30px;
  }

  .react-toggle--checked .react-toggle-track {
    opacity: 0.5;
    background-color: ${({ theme }) =>
      theme?.brand?.colors?.primary ?? "#9121c2"};
  }

  .react-toggle-track-check {
    position: absolute;
    width: 14px;
    height: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    left: 8px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .react-toggle--checked .react-toggle-track-check {
    opacity: 1;
    transition: opacity 0.25s ease;
  }

  .react-toggle-track-x {
    display: none;
  }

  .react-toggle-thumb {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    position: absolute;
    top: -10px;
    left: -12px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fafafa;
    box-sizing: border-box;
    transition: all 0.25s ease;
    box-shadow: 0px 1.5px 4.5px rgba(44, 19, 56, 0.25);
  }

  .react-toggle--checked .react-toggle-thumb {
    left: 18px;
    background-color: ${({ theme }) =>
      theme?.brand?.colors?.primary ?? "#9121c2"};
  }

  .react-toggle--focus .react-toggle-thumb {
    box-shadow: 0px 0px 2px 3px #0099e0;
  }

  .react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    box-shadow: 0px 0px 5px 5px #0099e0;
  }

  label {
    display: flex;
    width: Calc(100% - 48px);
    font-size: 12px;
    color: #73819b;

    span {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
