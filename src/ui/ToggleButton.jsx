import { useState } from "react";

function ToggleButton({ id, defaultState, field, clickAction, updating }) {
  const [settingState, setSettingState] = useState(defaultState);

  return (
    <button
      disabled={updating || settingState === null}
      onClick={() => {
        setSettingState((prevState) => {
          const newState = !prevState;
          clickAction({ id, data: { field, value: newState } });
          return newState;
        });
      }}
      className={`${updating ? "opacity-50 cursor-not-allowed" : ""} ${
        settingState ? "bg-accent-dark" : "bg-gray-300 dark:bg-surface-dark"
      }  w-12 rounded-full py-1 px-1.5 cursor-pointer transition-all duration-300 ease-in-out focus:outline-0`}
    >
      <div
        className={`${
          settingState ? "translate-x-5" : "translate-x-0"
        } w-4 h-4 rounded-full bg-white drop-shadow-md transition-all duration-300 ease-in-out `}
      ></div>
    </button>
  );
}

export default ToggleButton;
