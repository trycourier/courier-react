import { useEffect } from 'react';
import { gql, useQuery } from "@apollo/client";
import { useGraphQlClient, useCourier } from '@trycourier/react-provider';

import useInbox from './use-inbox';

export const GET_MESSAGES = gql`
  query {
    messages {
      nodes {
        id
        messageId
        created
        content {
          title
          body
          data
        }
      }
    }
  }
`;


const useMessages = () => {
  const inbox = useInbox();
  const { transport } = useCourier();
  const client = useGraphQlClient();
  const results = useQuery(GET_MESSAGES, {
    client,
  });

  useEffect(() => {
    inbox.setLoading(results?.loading);

    if (!results?.data) {
      return;
    }

    inbox.setMessages(results?.data);
  }, [results])

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: (courierEvent) => {
        inbox.newMessage(courierEvent?.data);
      }
    });
  }, [transport]);
};

export default useMessages;
