import { useEffect } from 'react';
import { useQuery } from 'urql';

import { useCourier } from '@trycourier/react-provider';
import useInbox from './use-inbox';

export const GET_MESSAGES = `
  query {
    unread:messages(params: {
      isRead: false
    }) {
      totalCount
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

    if (!results?.data?.unread) {
      return;
    }

    inbox.setMessages(results?.data?.unread?.nodes);
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
