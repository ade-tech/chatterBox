import { Outlet } from "react-router-dom";
import Menus from "./Menus";
import ChatsMain from "../features/chats/ChatsMain";
import { ChatProvider } from "../hooks/useLastChat.jsx";

function AppLayout() {
  return (
    <ChatProvider>
      <div className="grid w-full h-screen transition-all duration-700 md:grid-cols-[0.5fr_3fr_6fr]  dark:bg-dark">
        <Menus />
        <main className=" border-r border-r-gray-100 dark:border-r-bg-dark ">
          <Outlet />
        </main>
        <div className="">
          <ChatsMain />
        </div>
      </div>
    </ChatProvider>
  );
}

export default AppLayout;
