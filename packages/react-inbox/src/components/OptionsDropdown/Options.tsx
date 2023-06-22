import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #344563;
  border-radius: 4px !important;
`;

const Option = styled.button`
  height: 25px;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: white;
  cursor: pointer;
  padding-left: 10px;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 4px;

  :hover {
    background-color: #5c6a82;
  }
`;

function Options({ options, onClose }) {
  return (
    <Container>
      {options.map(({ label, onClick }, index: number) => {
        const handleOnClick = (event: React.MouseEvent) => {
          event.preventDefault();
          onClose();
          onClick();
        };

        return (
          <Option key={`${label}-${index}`} onClick={handleOnClick}>
            {label}
          </Option>
        );
      })}
    </Container>
  );
}

export default Options;
