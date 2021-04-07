import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ICourierToastMessage } from "../Toast/types";
import Actions from "../Actions";
import { Message, Title, Body } from "./styled";
import { getIcon } from "./helpers";
import { useTrackEvent } from "@trycourier/react-provider";
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
  const [, { config }] = useToast();
  const [, trackEvent] = useTrackEvent();

  const handleOnClickDismiss = useCallback(
    () => toast.dismiss(toastProps.toastId),
    [toastProps.toastId]
  );

  const handleOnClickDetails = useCallback((event) => {
    if (onClick) {
      onClick(event);
    }

    trackEvent({
      trackingId: data?.clickTrackingId,
    });
  }, []);

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
