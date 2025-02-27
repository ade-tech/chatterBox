import { useEffect, useState } from "react";

function ToggleButton({ id, defaultState, field, clickAction, updating }) {
  const [settingState, setSettingState] = useState(null);

  useEffect(() => {
    if (!defaultState) return;
    setSettingState(defaultState);
  }, [defaultState]);
  return (
    <button
      disabled={updating}
      onClick={() => {
        if (updating) return;
        setSettingState((curState) => !curState);
        clickAction({ id, data: { field, value: settingState } });
      }}
      className={`${updating ? "opacity-50 cursor-not-allowed" : ""} ${
        settingState ? "bg-accent-dark" : "bg-gray-300 dark:bg-surface-dark"
      }  w-12 rounded-full py-1 px-1.5 cursor-pointer transition-all duration-300 ease-in-out focus:outline-0`}
    >
      <div
        className={`${
          settingState ? "translate-x-0" : "translate-x-5"
        } w-4 h-4 rounded-full bg-white drop-shadow-md transition-all duration-300 ease-in-out `}
      ></div>
    </button>
  );
}

export default ToggleButton;
