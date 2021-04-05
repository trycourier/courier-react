import React from "react";
import EndPagination from "../../assets/pagination_end.svg";
import { Line } from "./styled";

function EndOfTheRoad() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: "1 0",
    }}>
      <Line />
      <EndPagination /> End Of The Road
      <Line />
    </div>
  );
}

export default EndOfTheRoad;
