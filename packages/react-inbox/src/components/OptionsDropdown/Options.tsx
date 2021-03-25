import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #344563;
  border-radius: 4px !important;
`;

const Option = styled.div`
  height: 25px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: white;
  cursor: pointer;
  display: flex;
  padding-left: 10px;
  align-items: center;
  :hover {
    background-color: #5C6A82;
  }
`


function Options({ options, close }) {
  return (
    <Container>
      {
        options.map(({ label, onClick = () => {} }) => <Option key={label} onClick={() => {
          onClick();
          close()
        }}>{label}</Option>)
      }
    </Container>
  )
}

export default Options
