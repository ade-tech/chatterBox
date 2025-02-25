import { Outlet, useParams } from "react-router-dom";
import Menus from "./Menus";
import ChatsMain from "../features/chats/ChatsMain";
import { ChatProvider } from "../hooks/useLastChat.jsx";
import MobileMenu from "./MobileMenu.jsx";
import { OnlineProvider } from "../contexts/OnlineContext.jsx";
import { useState } from "react";

function AppLayout() {
  const { id } = useParams() || null;
  const [isMobile, setIsMobile] = useState(false);

  return (
    <ChatProvider>
      <OnlineProvider>
        <div className="md:grid w-full h-[100dvh] transition-all duration-700 md:grid-cols-[0.5fr_3fr_6fr] relative  dark:bg-dark">
          <div>
            <MobileMenu mobileState={setIsMobile} />
            <Menus styles="hidden md:flex" />
          </div>
          <main className="border-r border-r-gray-100 dark:border-r-bg-dark ">
            <Outlet />
          </main>
          <div>
            <div className="md:hidden absolute z-[500] top-0 w-full bg-white dark:bg-dark ">
              {id && isMobile && <ChatsMain />}
            </div>
            <div className="hidden md:flex">
              <ChatsMain />
            </div>
          </div>
        </div>
      </OnlineProvider>
    </ChatProvider>
  );
}

export default AppLayout;
