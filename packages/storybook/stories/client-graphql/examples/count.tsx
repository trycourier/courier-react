import React, { useEffect, useState } from "react";
import { Inbox } from "@trycourier/client-graphql";

const CountExample: React.FunctionComponent<{
  userId: string;
  clientKey: string;
}> = ({ userId, clientKey }) => {
  const [count, setCount] = useState<number>();

  useEffect(() => {
    const inboxApi = Inbox({
      apiUrl: process.env.INBOX_API_URL,
      userId,
      clientKey,
    });

    const getInboxCount = async () => {
      const result = await inboxApi.getInboxCount();
      setCount(result?.count);
    };

    getInboxCount();
  }, []);

  return (
    <div>
      {typeof count === "undefined" ? (
        "Loading..."
      ) : (
        <div>
          Inbox Count: <strong>{count}</strong>
        </div>
      )}
    </div>
  );
};

export default CountExample;
