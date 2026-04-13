import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Courier React Examples</h1>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Link to="/preferences-hooks">Preferences Hooks</Link>
        <Link to="/preference-list">Preference List</Link>
        <Link to="/inbox">Inbox Example</Link>
      </nav>
    </div>
  );
};

export default Home;
