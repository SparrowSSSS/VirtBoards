import ReactDOM from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { });
};
