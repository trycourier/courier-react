import React, { useMemo } from "react";
import {
  Container,
  TimeAgo,
  Title,
  Body,
  getIcon,
  ClickAction,
} from "./styled";
import { useInbox } from "~/use-inbox";
import distanceInWords from "date-fns/formatDistanceStrict";

interface MessageProps {
  messageId: string;
  created: number;
  content: {
    title: string;
    body: string;
    icon?: string;
    data?: {
      clickAction: string;
    };
  };
}

const Message: React.FunctionComponent<MessageProps> = ({
  created,
  content,
}) => {
  const [, { config }] = useInbox();

  const icon = getIcon(content?.icon ?? config?.defaultIcon);
  const handleOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const timeAgo = useMemo(() => {
    return distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }, [created]);

  return (
    <Container data-test-id="inbox-message">
      {icon}
      <div>
        <Title>{content?.title}</Title>
        <Body>{content?.body}</Body>
        <TimeAgo>{timeAgo}</TimeAgo>
      </div>
      {content?.data?.clickAction && (
        <ClickAction onClick={handleOnClick}>View Details</ClickAction>
      )}
    </Container>
  );
};

export default Message;
