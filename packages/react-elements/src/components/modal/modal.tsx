import React from "react";
import styled, { CSSObject } from "styled-components";
import { CourierElement } from "~/types";
import { Title } from "../title";

export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  titleColor?: string;
  headerColor?: string;
};

export const Modal: CourierElement<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <div className={className}>
      {isOpen && <Backdrop className="modal-backdrop" onClick={onClose} />}
      <Dialog className="modal" open={isOpen}>
        {title && (
          <Header className="modal-header">
            <ModalTitle className="modal-title" level={3}>
              {title}
            </ModalTitle>
          </Header>
        )}
        <div className="modal-body">{children}</div>
      </Dialog>
    </div>
  );
};

const Dialog = styled.dialog(
  (): CSSObject => ({
    background: "white",
    border: "none",
    borderRadius: "10px",
    overflow: "hidden",
    color: "white",
    padding: 0,
    width: 400,
    zIndex: 51,
    top: "50%",
    animationDuration: "500ms",
    animationName: "fadeInUpModal",
    transform: "translateY(-50%)",
    "@keyframes fadeInUpModal": {
      from: {
        opacity: 0.75,
        marginTop: "7px",
      },

      to: {
        opacity: 1,
        marginTop: "-7px",
      },
    },
  })
);

const Backdrop = styled.div(
  (): CSSObject => ({
    position: "fixed",
    content: "",
    top: 0,
    left: 0,
    zIndex: 50,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  })
);

const Header = styled.div(
  (): CSSObject => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    background: "#9e9e9e",
    padding: "0.5rem",
    boxSizing: "border-box",
  })
);

const ModalTitle = styled(Title)(
  (): CSSObject => ({
    color: "white",
    margin: 0,
  })
);
