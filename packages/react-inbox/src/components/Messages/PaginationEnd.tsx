import React from "react";
import { Line } from "./styled";
import PaginationEndIcon from "~/assets/pagination_end.svg";

function PaginationEnd({ title = "" }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: "1 0",
    }}>
      <Line />
      <PaginationEndIcon /> {title}
      <Line />
    </div>
  );
}

export default PaginationEnd;
