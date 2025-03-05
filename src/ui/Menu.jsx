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
    <div className="fixed top-0 left-0 flex h-screen w-screen justify-center bg-transparent">
      <div
        ref={ref}
        className="dark:bg-surface-dark absolute bottom-18 left-5 h-45 w-52 rounded-xl bg-gray-100 pt-2 drop-shadow-xl md:left-[38%]"
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
