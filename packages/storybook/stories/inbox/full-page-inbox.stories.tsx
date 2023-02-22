import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import { CourierProvider } from "@trycourier/react-provider";

import fullPageInboxHooksString from "!raw-loader!./full-page-inbox-hooks.tsx";
import { FullPageInboxHooks } from "./full-page-inbox-hooks";
import Frame from "react-frame-component";
import { useElementalInbox } from "@trycourier/react-hooks";

export default {
  title: "Full Page Inbox",
};

const FramedInBbox = () => {
  const { getUnreadMessageCount, unreadMessageCount } = useElementalInbox();

  useEffect(() => {
    getUnreadMessageCount();
  }, []);

  return <div>Unread: {unreadMessageCount}</div>;
};

export const Hooks = () => {
  const [showIframe, setShowIframe] = useState(false);

  const [authorization, setAuthorization] = useState("");
  const [auth, setAuth] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6NzBmNmE0ZjQtMjkwNy00NTE4LWI4ZjMtYjljZmFiMjI0NzY0IGluYm94OnJlYWQ6bWVzc2FnZXMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvcHJvZHVjdGlvbiIsInRlbmFudF9pZCI6Ijc2ODI1MWNmLTNlYjgtNDI2YS05MmViLWZhYTBlNzY3ODc2OCIsImlhdCI6MTY3MzY1NzYwNSwianRpIjoiZGM5MzUzNTEtNDE4ZS00MGIyLTgwODUtODU0YzA5MmM4OGI2In0.FPDvb9VBWOW1V0luJ8b4TgmuffDCPqP--DUbXvvPpZo"
  );
  const handeInputOnChange = (event) => {
    setAuthorization(event.target.value);
  };

  /*const stagingJWTCourierProps = {
    wsOptions: {
      url: "wss://icnrz8ttcf.execute-api.us-east-1.amazonaws.com/staging",
    },
    apiUrl: "https://4rq7n8hhjd.execute-api.us-east-1.amazonaws.com/staging/q",
    clientKey: "MWIxZTk1M2YtMGViYi00N2FkLWJlYWItZjU3OWJkNjA2ZWIx",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6c21va2V5MTIzNDUgaW5ib3g6cmVhZDptZXNzYWdlcyBpbmJveDp3cml0ZTpldmVudHMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvcHJvZHVjdGlvbiIsInRlbmFudF9pZCI6IjFiMWU5NTNmLTBlYmItNDdhZC1iZWFiLWY1NzliZDYwNmViMSIsImlhdCI6MTY2OTY0OTA1MCwiZXhwIjoxNjY5ODIxODUwLCJqdGkiOiI2YThlZDdkNi0yMjliLTQ2MjktOWNkYy02OGZiOWM2ZGQ1ODAifQ.fYP2nB2PA4ltWukVPR0IXfgudHCTkbMXxvABiDI9TGg",
    userId: "smokey12345",
  };*/

  const devCourierProops = useMemo(
    () => ({
      apiUrl: "https://3rjq5oe9b1.execute-api.us-east-1.amazonaws.com/dev/q",
      wsOptions: {
        onReconnect: () => {
          console.log("reconnect");
        },
        url: "wss://20en15n3ng.execute-api.us-east-1.amazonaws.com/dev",
      },
      authorization: auth,
      userId: "70f6a4f4-2907-4518-b8f3-b9cfab224764",
    }),
    [auth]
  );

  /*const stagingCourierProps = {
    wsOptions: {
      url: "wss://icnrz8ttcf.execute-api.us-east-1.amazonaws.com/staging",
    },
    apiUrl: "https://4rq7n8hhjd.execute-api.us-east-1.amazonaws.com/staging/q",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6c21va2V5MTIzNDUgaW5ib3g6cmVhZDptZXNzYWdlcyBpbmJveDp3cml0ZTpldmVudHMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvcHJvZHVjdGlvbiIsInRlbmFudF9pZCI6IjFiMWU5NTNmLTBlYmItNDdhZC1iZWFiLWY1NzliZDYwNmViMSIsImlhdCI6MTY3MDk3NTgxMiwianRpIjoiNmRiNmYyODctNGMxNi00N2ZkLTliNDctNjYxNjZhY2VkOWUyIn0.QZwqutYC6TbTafsAr4Qe0FRx4K0vhp7tzGPlC_zlkg0",
    userId: "smokey12345",
  };*/

  console.log("devCourierProops", devCourierProops);

  return (
    <>
      <button
        onClick={() => {
          setShowIframe(!showIframe);
        }}
      >
        showIframe
      </button>

      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <input
            type="text"
            onChange={handeInputOnChange}
            name="auth"
            value={authorization}
          />
          <button
            onClick={() => {
              setAuth(authorization);
            }}
          >
            setauth
          </button>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n${fullPageInboxHooksString}\n\`\`\``}</ReactMarkdown>
        </div>

        <CourierProvider id="main" {...devCourierProops}>
          <FullPageInboxHooks />
        </CourierProvider>
        {showIframe && (
          <Frame>
            <CourierProvider id="iframe" {...devCourierProops}>
              <FramedInBbox />
            </CourierProvider>
          </Frame>
        )}
      </div>
    </>
  );
};
