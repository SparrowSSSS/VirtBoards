import ReactDOM from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./app/store";

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
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { });
};
