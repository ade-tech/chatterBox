import React, {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../../hooks/useClickOutside";

const uploadModalContext = createContext();
function UploadModal({ children }) {
  const [openModal, setOpenModal] = useState(false);

  const open = useCallback(() => setOpenModal(true), []);
  const close = useCallback(() => setOpenModal(false), []);
  return (
    <uploadModalContext.Provider value={{ open, close, openModal }}>
      {children}
    </uploadModalContext.Provider>
  );
}

function Trigger({ children }) {
  const { open } = useContext(uploadModalContext);

  return React.Children.map(children, (child) =>
    cloneElement(child, { onClick: open })
  );
}

function Window({ children }) {
  const { openModal, close } = useContext(uploadModalContext);
  const { ref } = useClickOutside({ onClose: close });

  if (!openModal) return;

  return createPortal(
    <div className="w-screen h-screen left-0  z-[20000] flex justify-center items-center fixed top-0  bg-[#0300189b] bg-opacity-50">
      <div
        ref={ref}
        className=" dark:bg-surface-dark rounded-xl bg-gray-100 drop-shadow-xl relative "
      >
        {cloneElement(children, {
          onClose: close,
        })}
      </div>
    </div>,
    document.body
  );
}

UploadModal.Trigger = Trigger;
UploadModal.Window = Window;

export default UploadModal;
