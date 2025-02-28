import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
import { UseCurrentUserData } from "./CurrentUserContext";
import { UseLastSeen } from "../features/profile/useProfile";

const onlineContext = createContext();

export const OnlineProvider = function ({ children }) {
  const { user_id, isGettingUser } = UseCurrentUserData();
  const [onlineUsers, setIsOnlineUsers] = useState([]);
  const { updateLastSeen } = UseLastSeen();
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
        await onlineChannel.track({ isOnline: true });
        const onlinePresence = onlineChannel.presenceState();
        const onlineUsers = Object.keys(onlinePresence);
        setIsOnlineUsers(onlineUsers);
      }
      onlineChannel.on("presence", { event: "sync" }, () => {
        const onlinePresence = onlineChannel.presenceState();
        const onlineUsers = Object.keys(onlinePresence);
        setIsOnlineUsers(onlineUsers);
      });

      onlineChannel.on("presence", { event: "join" }, ({ key }) => {
        setIsOnlineUsers((curOnline) => {
          if (!curOnline.includes(key)) return [...curOnline, key];
          return curOnline;
        });
      });

      onlineChannel.on("presence", { event: "leave" }, ({ key }) => {
        updateLastSeen({ id: key, last_seen: new Date().toISOString() });
        setIsOnlineUsers((curOnline) => curOnline.filter((cur) => cur !== key));
      });
    });

    return () =>
      onlineChannel
        .unsubscribe()
        .then(() => supabase.removeChannel(onlineChannel));
  }, [user_id, isGettingUser, updateLastSeen]);

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
