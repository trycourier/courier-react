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

const ToastBody: React.FunctionComponent<Partial<ICourierToastMessage>> = ({
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
  const { createTrackEvent, brand: courierBrand } = useCourier();

  const brand = props.brand ?? config?.brand ?? courierBrand;

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
              return (
                <TextBlock key={index} data-testid="message-body">
                  {block.text}
                </TextBlock>
              );
            }

            if (block.type === "action") {
              return (
                <ActionBlock key={index} href={block.url} target="_blank">
                  {block.text}
                </ActionBlock>
              );
            }
          })
        ) : (
          <>
            <TextBlock data-testid="message-body">{body}</TextBlock>
            {data?.clickAction && (
              <ActionBlock
                href={data?.clickAction}
                target="_blank"
                onClick={handleOnClickDetails}
              >
                View Details
              </ActionBlock>
            )}
          </>
        )}
      </Message>
      <Dismiss onClick={handleOnClickDismiss}>X</Dismiss>
    </Container>
  );
};

export default ToastBody;
