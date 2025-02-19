import { SyncLoader } from "react-spinners";
import { useTheme } from "../contexts/ThemeContext";

function Typing() {
  const { mode } = useTheme();
  return (
    <div className="w-16 h-12 flex items-center justify-center rounded-3xl bg-gray-200 dark:bg-bg-dark ">
      <SyncLoader
        speedMultiplier={0.7}
        size={7}
        color={mode === "dark" ? "#6f00ff" : "#030018"}
      />
    </div>
  );
}

export default Typing;
