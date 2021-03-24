import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 38px;
  border: 1px solid #73819B;
  background: #f9fafb;
  border-radius: 4px;
  > :first-child {
    border-radius: 4px 0px 0px 4px;
  }
  > :last-child {
    border-radius: 0px 4px 4px 0px;
  }
`;

export const Tab = styled.div`
  background-color: '#F9FAFB';
  color: #73819B;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  &.active {
    height: 38px;
    margin: -1px;
    color: #9D3789;
    border: 1px solid #9D3789;
    background-color: #E4DFF0;
    font-weight: 700;
  }
`;