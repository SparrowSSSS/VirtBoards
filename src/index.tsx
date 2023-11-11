import ReactDOM from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { });
};
