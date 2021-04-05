import React from "react";
import { Line } from "./styled";
import EndPagination from "~/assets/pagination_end.svg";

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
