import React, { useMemo } from "react";
import {
  Body,
  ClickAction,
  Container,
  Contents,
  getIcon,
  TimeAgo,
  Title,
} from "./styled";
import useInbox from "~/hooks/use-inbox";
import distanceInWords from "date-fns/formatDistanceStrict";

interface MessageProps {
  messageId: string;
  created: number;
  title: string;
  body: string;
  icon?: string;
  data?: {
    clickAction: string;
  };
}

const Message: React.FunctionComponent<MessageProps> = ({
  created,
  title,
  body,
  icon,
  data,
  messageId,
}) => {
  const { config } = useInbox();
  const renderedIcon = getIcon(icon ?? config?.defaultIcon);

  const timeAgo = useMemo(() => {
    return distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }, [created]);

  return (
    <Container data-testid="inbox-message">
      {renderedIcon}
      {messageId}
      <Contents>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <TimeAgo>{timeAgo}</TimeAgo>
      </Contents>
      {data?.clickAction && (
        <ClickAction href={data?.clickAction}>View Details</ClickAction>
      )}
    </Container>
  );
};

export default Message;
