import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const navigate = useNavigate();
  const [lastChat, setLastChat] = useState(null);
  const { id } = useParams();
  useEffect(
    function () {
      if (id !== undefined) setLastChat(id);
    },
    [id]
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setLastChat(null);
        navigate("/chats", { replace: true });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ lastChat, setLastChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useLastChat() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error("Chat Context assesed outside of it's provider");
  return context;
}
