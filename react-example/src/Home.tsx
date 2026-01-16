import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  // Type assertion for React 17 compatibility with react-router-dom v5
  const NavLink = Link as React.ComponentType<{
    to: string;
    children: React.ReactNode;
  }>;

  return (
    <div>
      <NavLink to="/preferences-hooks">Preferences Hooks</NavLink>
    </div>
  );
};

export default Home;
