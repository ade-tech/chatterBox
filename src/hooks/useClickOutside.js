import { useEffect, useRef } from "react";

export const useClickOutside = ({ onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
        console.log(e.target);
      }
    }
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [onClose]);

  return ref;
};
