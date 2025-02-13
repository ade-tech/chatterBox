import { Outlet, useParams } from "react-router-dom";
import Menus from "./Menus";
import ChatsMain from "../features/chats/ChatsMain";
import { ChatProvider } from "../hooks/useLastChat.jsx";
import MobileMenu from "./MobileMenu.jsx";
import ChatModal from "./ChatModal.jsx";

function AppLayout() {
  const { id } = useParams() || null;
  console.log(id);
  return (
    <ChatProvider>
      <div className="md:grid w-full h-screen transition-all duration-700 md:grid-cols-[0.5fr_3fr_6fr] relative  dark:bg-dark">
        <div>
          <MobileMenu />
          <Menus styles="hidden md:flex" />
        </div>
        <main className=" border-r border-r-gray-100 dark:border-r-bg-dark ">
          <Outlet />
        </main>
        <div>
          {id && <ChatModal />}
          <div className="hidden md:flex">
            <ChatsMain />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}

export default AppLayout;
