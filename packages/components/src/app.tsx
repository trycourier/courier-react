import React, { useEffect } from "react";
import { CourierProvider } from "@trycourier/react-provider";
import { useElementalInbox } from "@trycourier/react-hooks";

const apiUrl = "https://7fjohtftv9.execute-api.us-east-1.amazonaws.com/dev/q";
const wsOptions = {
  url: "wss://47f0tdh3y5.execute-api.us-east-1.amazonaws.com/dev",
};

const MyInbox = () => {
  const inbox = useElementalInbox();

  (window as any).renewSession = (token: string) => inbox.renewSession(token);

  useEffect(() => {
    inbox.fetchMessages();
  }, []);

  return (
    <div>
      <h1>Inbox Messages</h1>
      {inbox.messages?.map((message, index) => {
        if (read(message)) return null;

        return (
          <div key={index}>
            <h1>{message.title}</h1>
            <hr />
            <p>{message.preview}</p>
          </div>
        );
      })}
    </div>
  );
};

export const App = () => {
  const authorization =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImluYm94OnJlYWQ6bWVzc2FnZXMgdXNlcl9pZDphd0oxb1plQ0xGQ1NaOWI5Q3hSMnJ2IiwidGVuYW50X3Njb3BlIjoicHVibGlzaGVkL3Byb2R1Y3Rpb24iLCJ0ZW5hbnRfaWQiOiIwMzhiYTIyZS1lNjQxLTRhNTYtYTFiZi00NjNjODFjNjVlZjIiLCJpYXQiOjE2NjYyMjExMTYsImV4cCI6MTY2NjIyMTQxNiwianRpIjoiMWFmNjFhODAtMjg4OS00YTA3LThkZDUtMTg1MmVlZjg1MGNlIn0.tKTf-ZxjPlB4zA0_bT-0r1nZ_OF2_k6okguf2smyjyI";

  return (
    <CourierProvider
      userId="awJ1oZeCLFCSZ9b9CxR2rv"
      authorization={authorization}
      apiUrl={apiUrl}
      wsOptions={wsOptions}
    >
      <MyInbox />
    </CourierProvider>
  );
};

const read = (message: any) => {
  return new Date(message.created) < new Date("2022-10-19T23:09:00.870Z");
};
