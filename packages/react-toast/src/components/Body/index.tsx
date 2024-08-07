import React, { ReactElement, useCallback, useMemo } from "react";
import { toast, ToastOptions } from "react-toastify";
import {
  Container,
  Message,
  Title,
  TextElement,
  Dismiss,
  ActionElement,
} from "./styled";
import { getIcon } from "./helpers";
import { useToast } from "~/hooks";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import styled from "styled-components";
import deepExtend from "deep-extend";
import tinycolor2 from "tinycolor2";
import { themeDefaults } from "~/constants";
import { IInboxMessagePreview, defaultMarkdownOptions } from "@trycourier/core";

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
      cursor: "pointer",
      borderRadius:
        theme.brand?.inapp?.toast?.borderRadius ??
        themeDefaults.inapp.toast.borderRadius,
    },
    theme.message?.container,
    theme?.message?.clickableContainer
  );
});

const NonClickableContainer = styled.div(({ theme }) => {
  return deepExtend(
    {
      ...containerStyles,
      display: "flex",
      borderRadius:
        theme.brand?.inapp?.toast?.borderRadius ??
        themeDefaults.inapp.toast.borderRadius,
    },
    theme.message?.container ?? {}
  );
});

const Body: React.FunctionComponent<{
  message: IInboxMessagePreview;
  markdownOptions?: MarkdownToJSX.Options;
  toastProps?: ToastOptions;
  onClick?: (event: React.MouseEvent) => void;
  icon: IInboxMessagePreview["icon"] | ReactElement;
  title?: IInboxMessagePreview["title"] | ReactElement;
  preview?: IInboxMessagePreview["preview"] | ReactElement;
}> = ({
  message,
  onClick,
  title,
  preview,
  icon,
  markdownOptions,
  ...props
}) => {
  const { actions, data, messageId } = message;
  title = message.title ?? title;
  preview = message.preview ?? preview;
  icon = message.icon ?? icon;

  const [, { config }] = useToast();

  const courier = useCourier();
  const { brand: courierBrand } = courier;
  const brand = config?.brand ?? courierBrand;

  const { toastProps } = props;
  const { markMessageRead, trackClick } = useInbox();

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

  const clickActionDetails = useMemo(() => {
    if (data?.clickAction) {
      return {
        href: data.clickAction,
      };
    }

    if (!actions?.length || actions.length > 1) {
      return;
    }

    return {
      trackingId: actions[0].data?.trackingId,
      href: actions[0].href,
    };
  }, [data?.clickAction, actions]);

  let containerProps: {
    href?: string;
    onClick?: (event: React.MouseEvent) => void;
    rel?: string;
    target?: string;
  } = {};

  if (clickActionDetails?.href) {
    containerProps.href = clickActionDetails?.href;

    if (openLinksInNewTab) {
      containerProps = {
        ...containerProps,
        target: "_blank",
        rel: "noreferrer",
      };
    }

    containerProps.onClick = async (event) => {
      event.preventDefault();

      if (messageId) {
        const promises = [
          markMessageRead(messageId),
          clickActionDetails?.trackingId &&
            trackClick(messageId, clickActionDetails?.trackingId),
        ].filter(Boolean);

        if (promises.length) {
          await Promise.all(promises);
        }
      }

      if (onClick) {
        onClick(event);
        return;
      }

      if (courier.onRouteChange) {
        courier.onRouteChange(clickActionDetails?.href, message);
        return;
      }

      if (openLinksInNewTab) {
        window.open(clickActionDetails?.href, "_blank");
      } else {
        window.location.href = clickActionDetails?.href;
      }
    };
  }

  const renderedMessage = useMemo(() => {
    const renderActionButtons = (actions?.length ?? 0) > 1;
    const handleActionClick = (action) => async (event) => {
      event.preventDefault();

      const promises = [
        messageId && markMessageRead(messageId),
        messageId &&
          action?.data?.trackingId &&
          trackClick(messageId, action?.data?.trackingId),
      ].filter(Boolean);

      if (promises.length) {
        await Promise.all(promises);
      }

      if (courier.onRouteChange) {
        courier.onRouteChange(action?.href, message);
        return;
      }

      if (openLinksInNewTab) {
        window.open(action?.href, "_blank");
      } else {
        window.location.href = action?.href;
      }
    };

    return (
      <>
        {Icon && <Icon data-testid="message-icon" />}
        <Message data-testid="message">
          {title && <Title data-testid="message-title">{title}</Title>}
          <TextElement data-testid="message-body">
            {typeof preview === "string" ? (
              <Markdown options={markdownOptions ?? defaultMarkdownOptions}>
                {preview as string}
              </Markdown>
            ) : (
              preview
            )}
          </TextElement>
          {renderActionButtons
            ? actions?.slice(0, 2)?.map((action, index) => (
                <ActionElement
                  primary={index === 0}
                  backgroundColor={action.background_color}
                  key={`${action.href}-${index}`}
                  onClick={handleActionClick(action)}
                >
                  {action.content}
                </ActionElement>
              ))
            : undefined}
        </Message>
      </>
    );
  }, [actions, title, preview]);

  return (
    <Container>
      {courier.onRouteChange || containerProps.href ? (
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
