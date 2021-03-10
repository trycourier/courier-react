import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { IToastMessage } from "../Toast/types";
import SideBar from "../SideBar";
import { Body, Title, Content } from "./styled";
import { getIcon, sendClickedRequest } from "./helpers";
import { useToastConfig } from "../../hooks";

const ToastBody: React.FunctionComponent<Partial<IToastMessage>> = ({
  title,
  body: content,
  icon,
  data,
  onClick,
  ...props
}) => {
  const { toastProps } = props as { toastProps: any };
  const dismiss = useCallback(() => toast.dismiss(toastProps.toastId), [
    toastProps.toastId,
  ]);
  const {
    clientKey,
    config: { theme, defaultIcon },
  } = useToastConfig();
  const hasAction = data?.clickAction || onClick;

  const open = useCallback(
    (event) => {
      if (onClick) {
        onClick(event);
      }
      sendClickedRequest(clientKey, data?.clickedUrl);
    },
    [clientKey, data?.clickedUrl, onClick]
  );
  const Icon = getIcon(icon ?? defaultIcon);

  return (
    <>
      {Icon && <Icon theme={theme?.icon} data-test-id="toast-icon" />}
      <Body theme={theme?.body} data-test-id="toast-body">
        <Title theme={theme?.title} data-test-id="toast-title">
          {title}
        </Title>
        <Content theme={theme?.content} data-test-id="toast-content">
          {content}
        </Content>
      </Body>
      <SideBar
        href={data?.clickAction}
        open={hasAction ? open : null}
        dismiss={dismiss}
      />
    </>
  );
};

export default ToastBody;
