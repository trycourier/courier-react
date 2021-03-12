import React from "react";
import { Container } from "./styled";
//@ts-ignore
import Bell from "./Bell";

interface IndicatorProps {
  onClick?: (event: React.MouseEvent) => void;
}

function Indicator({ onClick }: IndicatorProps) {
  return (
    <Container onClick={onClick}>
      <Bell />
    </Container>
  );
}

export default Indicator;
