import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useActions } from "@trycourier/react-provider";
import { ICourierToastMessage } from "../Toast/types";
import Actions from "../Actions";
import {
  Message, Title, Body,
} from "./styled";
import { getIcon } from "./helpers";
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
  const { handleOnClick } = useActions();
  const handleOnClickDismiss = useCallback(
    () => toast.dismiss(toastProps.toastId),
    [toastProps.toastId],
  );
  const handleOnClickDetails = useCallback((event) => {
    handleOnClick(data);

    if (onClick) {
      onClick(event);
    }
  }, [data, handleOnClick, onClick]);
  const [, { config }] = useToast();
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
