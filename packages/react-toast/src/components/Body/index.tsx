import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ICourierToastMessage } from "../Toast/types";
import Actions from "../Actions";
import { Message, Title, Body } from "./styled";
import { getIcon, sendClickedRequest, sendReadRequest } from "./helpers";
import { useToast } from "~/hooks";

const ToastBody: React.FunctionComponent<Partial<ICourierToastMessage>> = ({
  title,
  body,
  icon,
  data,
  onClick,
  ...props
}) => {
  const { toastProps } = props as { toastProps: any };
  const handleOnClickDismiss = useCallback(
    () => toast.dismiss(toastProps.toastId),
    [toastProps.toastId]
  );
  const [, { clientKey, config }] = useToast();

  const handleOnClickDetails = useCallback(
    (event) => {
      if (data?.clickedUrl) {
        sendClickedRequest(clientKey, data?.clickedUrl);
        sendReadRequest(clientKey, data?.readUrl);
      }
      if (!data?.clickAction && !onClick) {
        return;
      }

      if (onClick) {
        onClick(event);
      }
    },
    [clientKey, data, onClick]
  );

  const Icon = getIcon(icon ?? config?.defaultIcon);

  return (
    <>
      {Icon && <Icon data-testid="message-icon" />}
      <Message data-testid="message">
        <Title data-testid="message-title">{title}</Title>
        <Body data-testid="message-body">{body}</Body>
      </Message>
      <Actions
        href={data?.clickAction}
        onClickDetails={handleOnClickDetails}
        onClickDismiss={handleOnClickDismiss}
      />
    </>
  );
};

export default ToastBody;
