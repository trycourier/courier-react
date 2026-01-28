import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CourierProvider } from "@trycourier/react-provider";
import "./App.css";
import PreferenceHooks from "./pages/PreferencesHooks";
import InboxExample from "./pages/InboxExample";
import Home from "./Home";

const App: React.FC = () => {
  const clientKey = process.env.REACT_APP_COURIER_CLIENT_KEY;
  const userId = process.env.REACT_APP_COURIER_USER_ID;

  console.log(clientKey, userId);

  return (
    <CourierProvider clientKey={clientKey} userId={userId}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/preferences-hooks" component={PreferenceHooks} />
            <Route path="/inbox" component={InboxExample} />
          </Switch>
        </div>
      </BrowserRouter>
    </CourierProvider>
  );
};

export default App;
