import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
import { UseCurrentUserData } from "./CurrentUserContext";

const onlineContext = createContext();

export const OnlineProvider = function ({ children }) {
  const { user_id, isGettingUser } = UseCurrentUserData();
  const [onlineUsers, setIsOnlineUsers] = useState([]);

  useEffect(() => {
    if (isGettingUser || !user_id) return;
    const onlineChannel = supabase.channel("ChatterBoxonlinePresence", {
      config: {
        presence: {
          key: user_id,
        },
      },
    });
    onlineChannel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        console.log("i am online");
        await onlineChannel.track({ isOnline: true });
        const onlinePresence = onlineChannel.presenceState();
        const onlineUsers = Object.keys(onlinePresence);
        setIsOnlineUsers(onlineUsers);
        console.log("Initial Presence:", onlinePresence);
      }
      onlineChannel.on("presence", { event: "sync" }, () => {
        const onlinePresence = onlineChannel.presenceState();
        const onlineUsers = Object.keys(onlinePresence);
        setIsOnlineUsers(onlineUsers);
        console.log(onlinePresence);
      });

      onlineChannel.on("presence", { event: "join" }, ({ key }) => {
        console.log(key);
        setIsOnlineUsers((curOnline) => {
          if (!curOnline.includes(key)) return [...curOnline, key];
          return curOnline;
        });
      });

      onlineChannel.on("presence", { event: "leave" }, ({ key }) => {
        console.log(key);
        setIsOnlineUsers((curOnline) => curOnline.filter((cur) => cur !== key));
      });
    });

    return () =>
      onlineChannel
        .unsubscribe()
        .then(() => supabase.removeChannel(onlineChannel));
  }, [user_id, isGettingUser]);

  return (
    <onlineContext.Provider value={{ onlineUsers, isGettingUser }}>
      {children}
    </onlineContext.Provider>
  );
};

export function UseOnlineUsers() {
  const context = useContext(onlineContext);

  // if (context === undefined)
  //   throw new Error("Online Users context used outside of the provider");

  return context;
}
