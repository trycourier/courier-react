import React, { useMemo } from "react";
import {
  Body,
  Container,
  Contents,
  getIcon,
  TimeAgo,
  Title,
  UnreadMarker
} from "./styled";
import useInbox from "~/hooks/use-inbox";
import distanceInWords from "date-fns/formatDistanceStrict";
import OptionsDropdown from '../OptionsDropdown';
import Actions from '../Actions';
const options = [{
  label: 'Mark as read',
  onClick: () => {}
},{
  label: 'Delete',
  onClick: () => {}
}]

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
  unread,
}) => {
  const { config } = useInbox();
  const renderedIcon = getIcon(icon ?? config?.defaultIcon);

  const timeAgo = useMemo(() => {
    return distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }, [created]);
  const actions = useMemo(() => {
    return [{href: data?.clickAction, label: 'View Details'}]
  }, [data])
  return (
    <Container data-testid="inbox-message">
      {unread && <UnreadMarker />}
      {renderedIcon}
      <Contents>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <TimeAgo>{timeAgo}</TimeAgo>
      </Contents>
      <Actions actions={actions} />
      {/* <OptionsDropdown options={options} /> */}
    </Container>
  );
};

export default Message;
