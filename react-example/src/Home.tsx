import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  // Type assertion for React 17 compatibility with react-router-dom v5
  const NavLink = Link as React.ComponentType<{
    to: string;
    children: React.ReactNode;
  }>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Courier React Examples</h1>
      <ul>
        <li>
          <NavLink to="/inbox">Inbox Example</NavLink>
        </li>
        <li>
          <NavLink to="/preferences-hooks">Preferences Hooks</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Home;
