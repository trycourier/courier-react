import React from 'react'
import styled from 'styled-components';
import UpArrowIcon from './up_arrow.svg'

const StyledUpArrowIcon = styled(UpArrowIcon)`
  align-self: flex-end;
  margin-right: 14px;
  margin-bottom: 15px;
  cursor: pointer;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Option = styled.div`
  height: 25px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: black;
  cursor: pointer;
  display: flex;
  padding-left: 10px;
  align-items: center;
  :hover {
    background-color: #E4DFF0;
    color: #9D3789;
  }
`


function Options({ options, close }) {
  return (
    <Container>
      <StyledUpArrowIcon onClick={close} />
      {
        options.map(({ label }) => <Option>{label}</Option>)
      }
    </Container>
  )
}

export default Options
