import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useCourier } from '@trycourier/react-provider';

import useInbox from './use-inbox';

export const GET_MESSAGES = `
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
  const [results] = useQuery({
    query: GET_MESSAGES
  });

  useEffect(() => {
    inbox.setLoading(results?.fetching);

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
