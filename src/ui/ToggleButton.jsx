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
      className={`${updating ? "cursor-not-allowed opacity-50" : ""} ${
        settingState ? "bg-accent-dark" : "dark:bg-surface-dark bg-gray-300"
      } w-12 cursor-pointer rounded-full px-1.5 py-1 transition-all duration-300 ease-in-out focus:outline-0`}
    >
      <div
        className={`${
          settingState ? "translate-x-5" : "translate-x-0"
        } h-4 w-4 rounded-full bg-white drop-shadow-md transition-all duration-300 ease-in-out`}
      ></div>
    </button>
  );
}

export default ToggleButton;
