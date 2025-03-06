import { cloneElement } from "react";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

/**
 * Modal component for displaying modal dialogs.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The Modal component.
 */
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

/**
 * Trigger component for opening a modal.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @param {string} props.opens - The name of the modal to open.
 * @returns {JSX.Element} The Trigger component.
 */
function Trigger({ children, opens }) {
  const { OpenModal } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      OpenModal(opens);
    },
  });
}

/**
 * Content component for displaying modal content.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @param {string} props.name - The name of the modal.
 * @returns {JSX.Element} The Content component.
 */
function Content({ children, name }) {
  const { curOpened, CloseModal } = useContext(ModalContext);

  if (curOpened !== name) return null;

  return (
    <div className="absolute top-0 left-0 z-[200] flex h-[100dvh] w-full justify-center backdrop-blur-xs">
      {cloneElement(children, { onClose: () => CloseModal() })}
    </div>
  );
}

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
