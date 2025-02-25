import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { useClickOutside } from "../hooks/useClickOutside";

const menuContext = createContext();
function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const OpenFn = () => setIsOpen(true);
  const CloseFn = () => setIsOpen(false);

  return (
    <menuContext.Provider value={{ OpenFn, CloseFn, isOpen }}>
      {children}
    </menuContext.Provider>
  );
}

function Trigger({ children }) {
  const { OpenFn, isOpen } = useContext(menuContext);

  return cloneElement(children, {
    onOpen: OpenFn,
    isOpen,
  });
}

function Window({ children }) {
  const { isOpen, CloseFn } = useContext(menuContext);

  const ref = useClickOutside({ onClose: CloseFn });
  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen left-0 flex justify-center fixed top-0  bg-transparent">
      <div
        ref={ref}
        className="w-52 h-45 dark:bg-surface-dark rounded-xl bg-gray-100 absolute bottom-18 left-[38%] drop-shadow-xl pt-2"
      >
        {React.Children.map(children, (child) => {
          return cloneElement(child, { onClose: CloseFn });
        })}
      </div>
    </div>
  );
}

Menu.Trigger = Trigger;
Menu.Window = Window;

export default Menu;
