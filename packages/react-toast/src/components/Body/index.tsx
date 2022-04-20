import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ICourierToastMessage } from "../Toast/types";
import {
  Container,
  Message,
  Title,
  TextBlock,
  ActionBlock,
  Dismiss,
} from "./styled";
import { getIcon } from "./helpers";
import { useToast } from "~/hooks";
import { useCourier } from "@trycourier/react-provider";
import Markdown from "markdown-to-jsx";

const Body: React.FunctionComponent<Partial<ICourierToastMessage>> = ({
  title,
  body,
  blocks,
  icon,
  data,
  onClick,
  ...props
}) => {
  const { toastProps } = props as { toastProps: any };
  const [, { config }] = useToast();
  const { brand: courierBrand } = useCourier();

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

  return (
    <Container>
      {Icon && <Icon data-testid="message-icon" />}
      <Message data-testid="message">
        {title && <Title data-testid="message-title">{title}</Title>}
        {blocks?.length ? (
          blocks?.map((block, index) => {
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

            if (block.type === "action") {
              if (renderBlocks?.action) {
                const Block = renderBlocks?.action;
                return <Block {...block} key={index} />;
              }

              let actionProps = {};
              const openInNewTab =
                typeof block.openInNewTab === "boolean"
                  ? block.openInNewTab
                  : openLinksInNewTab;

              if (openInNewTab) {
                actionProps = {
                  ...actionProps,
                  target: "_blank",
                  rel: "noreferrer",
                };
              }

              return (
                <ActionBlock data-testid={`action-${index}`} key={index}>
                  <a href={block.url} {...actionProps}>
                    {block.text}
                  </a>
                </ActionBlock>
              );
            }
          })
        ) : (
          <>
            <TextBlock data-testid="message-body">
              {typeof body === "string" ? (
                <Markdown>{body as string}</Markdown>
              ) : (
                body
              )}
            </TextBlock>
            {data?.clickAction && (
              <ActionBlock data-testid="action-0">
                <a
                  href={data?.clickAction}
                  onClick={onClick}
                  rel="noreferrer"
                  target="_blank"
                >
                  View Details
                </a>
              </ActionBlock>
            )}
          </>
        )}
      </Message>
      <Dismiss data-testid="dismiss" onClick={handleOnClickDismiss}>
        X
      </Dismiss>
    </Container>
  );
};

export default Body;
