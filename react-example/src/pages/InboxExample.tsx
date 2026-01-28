import React from "react";
import { Inbox } from "@trycourier/react-inbox";
import { Link } from "react-router-dom";

const InboxExample: React.FC = () => {
  const NavLink = Link as React.ComponentType<{
    to: string;
    children: React.ReactNode;
  }>;

  return (
    <div style={{ padding: "20px" }}>
      <NavLink to="/">← Back to Home</NavLink>
      <h1>Inbox Example</h1>
      <p>Click the bell icon to open the inbox:</p>
      <div style={{ position: "relative", height: "400px" }}>
        <Inbox />
      </div>
    </div>
  );
};

export default InboxExample;
