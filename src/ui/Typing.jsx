import { SyncLoader } from "react-spinners";
import { useTheme } from "../contexts/ThemeContext";

function Typing() {
  const { mode } = useTheme();
  return (
    <div className="dark:bg-bg-dark flex h-12 w-16 items-center justify-center rounded-3xl bg-gray-200">
      <SyncLoader
        speedMultiplier={0.7}
        size={7}
        color={mode === "dark" ? "#6f00ff" : "#030018"}
      />
    </div>
  );
}

export default Typing;
