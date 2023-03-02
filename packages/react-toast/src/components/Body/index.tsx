import React, { ReactElement, useCallback, useMemo } from "react";
import { toast, ToastProps } from "react-toastify";
import { Container, Message, Title, TextBlock, Dismiss } from "./styled";
import { getIcon } from "./helpers";
import { useToast } from "~/hooks";
import { useCourier, IInboxMessagePreview } from "@trycourier/react-provider";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";
import deepExtend from "deep-extend";
import tinycolor2 from "tinycolor2";

const containerStyles = {
  height: "100%",
  padding: "0 12px",
};

const ClickableContainer = styled.a(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return deepExtend(
    {
      ...containerStyles,
      display: "flex",
      "*, &": {
        "text-decoration": "none",
      },
      "&:hover": {
        background: tcPrimaryColor.setAlpha(0.14),
      },
      borderRadius: theme.brand.inapp.toast.borderRadius,
    },
    theme.message?.clickableContainer ?? {}
  );
});

const NonClickableContainer = styled.div(({ theme }) => {
  return deepExtend(
    {
      ...containerStyles,
      display: "flex",
      borderRadius: theme.brand.inapp.toast.borderRadius,
    },
    theme.message?.nonClickableContainer ?? {}
  );
});

const Body: React.FunctionComponent<
  Omit<IInboxMessagePreview, "title" | "preview"> & {
    toastProps?: ToastProps;
    onClick?: (event: React.MouseEvent) => void;
    title?: IInboxMessagePreview["title"] | ReactElement;
    preview?: IInboxMessagePreview["preview"] | ReactElement;
  }
> = ({ title, preview, actions, icon, data, onClick, messageId, ...props }) => {
  const { toastProps } = props as { toastProps: any };
  const [, { config }] = useToast();
  const { brand: courierBrand, dispatch } = useCourier();

  const brand = config?.brand ?? courierBrand;
  const { openLinksInNewTab } = config;

  const handleOnClickDismiss = useCallback(
    () => toast.dismiss(toastProps?.toastId),
    [toastProps?.toastId]
  );

  const Icon = getIcon(
    /* priority:
      1. from message
      2. from props.defaultIcon
      3. from props.brand.inapp.icons.message
      4. from remote brand.inapp.icons.message
    */
    brand?.inapp?.disableMessageIcon
      ? false
      : (icon || config?.defaultIcon) ?? brand?.inapp?.icons?.message
  );

  const handleClickMessage = (event: React.MouseEvent) => {
    event?.preventDefault();

    if (
      data?.trackingIds?.clickTrackingId &&
      data?.trackingIds?.readTrackingId
    ) {
      dispatch({
        type: "inbox/MARK_MESSAGE_READ",
        payload: {
          messageId,
        },
      });
    }

    if (onClick) {
      onClick(event);
    }
  };

  const clickAction = useMemo(() => {
    if (data?.clickAction) {
      return data.clickAction;
    }

    if (!actions?.length) {
      return;
    }

    return actions[0].href;
  }, [actions]);

  let containerProps: {
    href?: string;
    onMouseDown?: (event: React.MouseEvent) => void;
    rel?: string;
    target?: string;
  } = {};

  if (clickAction) {
    containerProps.href = clickAction;
    containerProps.onMouseDown = handleClickMessage;

    if (openLinksInNewTab) {
      containerProps = {
        ...containerProps,
        target: "_blank",
        rel: "noreferrer",
      };
    }
  }

  const renderedMessage = useMemo(() => {
    return (
      <>
        {Icon && <Icon data-testid="message-icon" />}
        <Message data-testid="message">
          {title && <Title data-testid="message-title">{title}</Title>}
          <TextBlock data-testid="message-body">
            {typeof preview === "string" ? (
              <Markdown>{preview as string}</Markdown>
            ) : (
              preview
            )}
          </TextBlock>
        </Message>
      </>
    );
  }, [title, preview]);

  return (
    <Container>
      {containerProps.href ? (
        <ClickableContainer {...containerProps}>
          {renderedMessage}
        </ClickableContainer>
      ) : (
        <NonClickableContainer>{renderedMessage}</NonClickableContainer>
      )}
      <Dismiss data-testid="dismiss" onClick={handleOnClickDismiss}>
        X
      </Dismiss>
    </Container>
  );
};

export default Body;
