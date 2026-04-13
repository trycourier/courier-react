import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourierProvider } from "@trycourier/react-provider";
import "./App.css";
import PreferenceHooks from "./pages/PreferencesHooks";
import PreferenceListExample from "./pages/PreferenceListExample";
import InboxExample from "./pages/InboxExample";
import Home from "./Home";

const App: React.FC = () => {
  const clientKey = process.env.REACT_APP_COURIER_CLIENT_KEY;
  const userId = process.env.REACT_APP_COURIER_USER_ID;

  return (
    <CourierProvider clientKey={clientKey} userId={userId}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preferences-hooks" element={<PreferenceHooks />} />
            <Route
              path="/preference-list"
              element={<PreferenceListExample />}
            />
            <Route path="/inbox" element={<InboxExample />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CourierProvider>
  );
};

export default App;
