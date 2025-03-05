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
    cloneElement(child, { onClick: open }),
  );
}

function Window({ children }) {
  const { openModal, close } = useContext(uploadModalContext);
  const { ref } = useClickOutside({ onClose: close });

  if (!openModal) return;

  return createPortal(
    <div className="bg-opacity-50 fixed top-0 left-0 z-[20000] flex h-screen w-screen items-center justify-center bg-[#0300189b]">
      <div
        ref={ref}
        className="dark:bg-surface-dark relative rounded-xl bg-gray-100 drop-shadow-xl"
      >
        {cloneElement(children, {
          onClose: close,
        })}
      </div>
    </div>,
    document.body,
  );
}

UploadModal.Trigger = Trigger;
UploadModal.Window = Window;

export default UploadModal;
