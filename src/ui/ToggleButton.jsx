import { useState } from "react";

function ToggleButton({ defaultState, clickAction, updating }) {
  const [state, setState] = useState(defaultState);
  return (
    <button
      disabled={updating}
      onClick={() => {
        if (updating) return;
        setState((curState) => !curState);
        clickAction(state);
      }}
      className={`${updating ? "opacity-50 cursor-not-allowed" : ""} ${
        state ? "bg-accent-dark" : "bg-gray-300 dark:bg-surface-dark"
      }  w-12 rounded-full py-1 px-1.5 cursor-pointer transition-all duration-300 ease-in-out focus:outline-0`}
    >
      <div
        className={`${
          state ? "translate-x-0" : "translate-x-5"
        } w-4 h-4 rounded-full bg-white drop-shadow-md transition-all duration-300 ease-in-out `}
      ></div>
    </button>
  );
}

export default ToggleButton;
