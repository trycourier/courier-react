import styled from "styled-components";

export const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  height: 50px;
  width: 200px;
  background-color: black;
  color: white;
  font-size: 20px;
  font-family: Verdana;
  cursor: pointer;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background-color: lightgray;
  border-radius: 4px;
  height: 45px;
  width: calc(200px - 20px);
  margin: 10px 0;
  padding: 0 10px;
  font-size: 14px;
`;

export const Label = styled.div`
  font-size: 14px;
  color: black;
  font-family: Verdana;
`;