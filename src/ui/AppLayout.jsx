import { Outlet } from "react-router-dom";
import Menus from "./Menus";
import ChatsMain from "../features/chats/ChatsMain";
import { ChatProvider } from "../hooks/useLastChat.jsx";
import MobileMenu from "./MobileMenu.jsx";
import { OnlineProvider } from "../contexts/OnlineContext.jsx";
import { useState } from "react";

function AppLayout() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <ChatProvider>
      <OnlineProvider>
        <div className="dark:bg-dark relative h-[100dvh] w-full transition-all duration-700 md:grid md:grid-cols-[0.5fr_2.5fr_6fr]">
          <div>
            <MobileMenu mobileState={setIsMobile} />
            <Menus styles="hidden md:flex" />
          </div>
          <main className="dark:border-r-bg-dark border-r border-r-gray-100">
            <Outlet />
          </main>

          <ChatsMain isMobile={isMobile} />
        </div>
      </OnlineProvider>
    </ChatProvider>
  );
}

export default AppLayout;
