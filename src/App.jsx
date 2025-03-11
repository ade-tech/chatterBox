import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Chats from "./pages/Chats";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Bounce, ToastContainer } from "react-toastify";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Query client configuration for React Query.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

/**
 * Main application component.
 * @returns {JSX.Element} The App component.
 */
function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        stacked={true}
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Analytics />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="chats" />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chats/:id" element={<Chats />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/get-in" element={<Login />} />
          </Routes>
        </CurrentUserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
