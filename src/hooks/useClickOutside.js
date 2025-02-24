import { useEffect, useRef } from "react";

export const useClickOutside = ({ onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("Outside");
        onClose();
      }
    }
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [onClose]);

  return ref;
};
