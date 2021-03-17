import React, { useMemo } from "react";
import {
  Container,
  TimeAgo,
  Title,
  Body,
  getIcon,
  ClickAction,
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
}) => {
  const { config } = useInbox();

  const renderedIcon = getIcon(icon ?? config?.defaultIcon);
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
    <Container data-testid="inbox-message">
      {renderedIcon}
      <div>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <TimeAgo>{timeAgo}</TimeAgo>
      </div>
      {data?.clickAction && (
        <ClickAction href={data?.clickAction}>View Details</ClickAction>
      )}
    </Container>
  );
};

export default Message;
