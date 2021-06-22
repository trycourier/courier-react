import React from "react";
import { Line } from "./styled";
import PaginationEndIcon from "~/assets/pagination_end.svg";

import styled from "styled-components";

const Styled = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "1 0",
  color: theme?.brand?.colors?.primary ?? "#9121c2",
  fontSize: 12,

  "svg .running-man": {
    fill: theme?.brand?.colors?.primary ?? "#9121c2",
  },
  "svg .cliff": {
    stroke: theme?.brand?.colors?.primary ?? "#9121c2",
  },
}));

function PaginationEnd({ title = "" }) {
  return (
    <Styled>
      <Line />
      <PaginationEndIcon /> {title}
      <Line />
    </Styled>
  );
}

export default PaginationEnd;
