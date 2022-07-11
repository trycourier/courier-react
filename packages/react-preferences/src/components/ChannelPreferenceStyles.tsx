import styled from "styled-components";

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  text-align-center;
  background: rgba(213, 221, 228, 0.4);
  border-radius: 15px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  > div {
    margin-right: 7.5px;
  }

  white-space: nowrap;

  padding: 5px;

  margin-top: 15px;
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const Check = styled.svg`
  width: 15px;
  height: 15px;
  padding-left: 3.5px;
  fill: white;
`;

export const ChannelOption = styled.div`
  display: flex;
  width: 64px;
  height: 20px;

  background: transparent;
  border-radius: 12px;
  border: 1px solid black;
  whitespace: nowrap;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  justify-content: center;
  align-items: center;
  margin: 0 3px;

  svg {
    display: normal;
    margin-right: 3px;
  }
`;

export const Channel = styled.div`

  label {
    display: block;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
  }

  ${Input}:checked ~ ${ChannelOption} {
    background: #1e4637;
    color: white;
    border: 0;
  }

  ${Input}:checked ~ ${ChannelOption} > div {
    color: white;
  }
`;

export const ChannelCustomizationToggle = styled.label`
  input {
    display: none;
    opacity: 0;
    width: 0;
    height: 0;
  }

  div {
    width: 20px;
    height: 20px;
    border: solid 1px black;
    border-radius: 100%;
    margin: 0 2.5px;
    position: static;
    background-color: !white;
  
    display: flex;
    align-items: center;
  }

  ${Input}:checked ~ div > ${Check} {
    fill: white;
  }

  ${Input}:checked ~ div {
    border: 0;
    background-color: #1E4637;
  }
`;
