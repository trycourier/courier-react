import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ICourierToastMessage } from "../Toast/types";
import Actions from "../Actions";
import { Container, Message, Title, Body } from "./styled";
import { getIcon } from "./helpers";
import { useToast } from "~/hooks";
import { useCourier } from "@trycourier/react-provider";

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
  const { createTrackEvent } = useCourier();

  const handleOnClickDismiss = useCallback(
    () => toast.dismiss(toastProps?.toastId),
    [toastProps?.toastId]
  );

  const handleOnClickDetails = useCallback((event) => {
    if (onClick) {
      onClick(event);
    }

    createTrackEvent({
      trackingId: data?.clickTrackingId,
    });
  }, []);

  const Icon = getIcon(icon ?? config?.defaultIcon);

  return (
    <>
      <Container>
        {Icon && <Icon data-testid="message-icon" />}
        <Message data-testid="message">
          <Title data-testid="message-title">{title}</Title>
          <Body data-testid="message-body">{body}</Body>
        </Message>
      </Container>
      <Actions
        href={data?.clickAction}
        onClickDetails={handleOnClickDetails}
        onClickDismiss={handleOnClickDismiss}
      />
    </>
  );
};

export default ToastBody;
