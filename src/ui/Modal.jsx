import { cloneElement } from "react";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function Modal({ children }) {
  const [curOpened, setCurOpened] = useState("");

  const OpenModal = (openWindow) => setCurOpened(openWindow);
  const CloseModal = () => setCurOpened("");

  return (
    <ModalContext.Provider value={{ curOpened, OpenModal, CloseModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({ children, opens }) {
  const { OpenModal } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      OpenModal(opens);
    },
  });
}

function Content({ children, name }) {
  const { curOpened, CloseModal } = useContext(ModalContext);

  if (curOpened !== name) return null;

  return (
    <div className="w-full h-full top-0 left-0 flex justify-center absolute  backdrop-blur-xs">
      {cloneElement(children, { onClose: () => CloseModal() })}
    </div>
  );
}

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
