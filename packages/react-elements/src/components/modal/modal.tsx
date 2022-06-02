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
}) => {
  return (
    <>
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
    </>
  );
};

const Dialog = styled.dialog(
  (): CSSObject => ({
    background: "#24324B",
    border: "none",
    borderRadius: "0.25rem",
    overflow: "hidden",
    color: "white",
    padding: 0,
    width: 400,
  })
);

const Backdrop = styled.div(
  (): CSSObject => ({
    position: "fixed",
    content: "",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  })
);

const Header = styled.div(
  (): CSSObject => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    background: "rgb(88, 114, 162)",
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
