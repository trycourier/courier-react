import React, { ReactElement, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { Container, Message, Title, TextBlock, Dismiss } from "./styled";
import { getIcon } from "./helpers";
import { useToast } from "~/hooks";
import {
  useCourier,
  ICourierMessage,
  IActionBlock,
  ITextBlock,
} from "@trycourier/react-provider";
import Markdown from "markdown-to-jsx";

const Body: React.FunctionComponent<
  Omit<ICourierMessage, "title" | "body"> & {
    onClick?: (event: React.MouseEvent) => void;
    title?: ICourierMessage["title"] | ReactElement;
    body?: ICourierMessage["body"] | ReactElement;
  }
> = ({ title, body, blocks, icon, data, onClick, messageId, ...props }) => {
  const { toastProps } = props as { toastProps: any };
  const [, { config }] = useToast();
  const { brand: courierBrand, dispatch } = useCourier();

  const brand = props.brand ?? config?.brand ?? courierBrand;
  const { renderBlocks, openLinksInNewTab } = config;

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

  const blocksByType = useMemo(() => {
    return blocks?.reduce(
      (acc, cur) => {
        if (cur.type === "text") {
          acc.text.push(cur);
        }

        if (cur.type === "action") {
          acc.action.push(cur);
        }

        return acc;
      },
      {
        action: [],
        text: [],
      } as {
        action: IActionBlock[];
        text: ITextBlock[];
      }
    );
  }, [blocks]);

  const clickAction = useMemo(() => {
    if (data?.clickAction) {
      return data.clickAction;
    }

    if (!blocksByType?.action.length || blocksByType.action?.length > 1) {
      return;
    }

    return blocksByType.action[0].url;
  }, []);

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

  return (
    <Container>
      <a {...containerProps}>
        {Icon && <Icon data-testid="message-icon" />}
        <Message data-testid="message">
          {title && <Title data-testid="message-title">{title}</Title>}
          {blocksByType?.text?.length ? (
            blocksByType?.text?.map((block, index) => {
              if (block.type === "text") {
                if (renderBlocks?.text) {
                  const Block = renderBlocks?.text;
                  return <Block {...block} key={index} />;
                }

                return (
                  <TextBlock key={index} data-testid="message-body">
                    {block.text && <Markdown>{block.text}</Markdown>}
                  </TextBlock>
                );
              }
            })
          ) : (
            <TextBlock data-testid="message-body">
              {typeof body === "string" ? (
                <Markdown>{body as string}</Markdown>
              ) : (
                body
              )}
            </TextBlock>
          )}
        </Message>
      </a>
      <Dismiss data-testid="dismiss" onClick={handleOnClickDismiss}>
        X
      </Dismiss>
    </Container>
  );
};

export default Body;
