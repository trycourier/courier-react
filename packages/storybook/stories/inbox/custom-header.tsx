import React from "react";
import { Header } from "@trycourier/react-inbox";

const props = {
  isOpen: true,
  theme: {
    header: {
      height: 0,
      paddingTop: 36,
    },
  },
  renderHeader: (props) => {
    return (
      <>
        <Header {...props} unreadMessageCount={9} messages={[{}]} />
        <div
          style={{
            background: "white",
            paddingLeft: 36,
            paddingBottom: 12,
            color: "#333",
          }}
        >
          Hello World
        </div>
      </>
    );
  },
};

export default props;
