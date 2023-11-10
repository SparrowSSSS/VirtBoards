import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<App />, document.getElementById("root"));

bridge.send('VKWebAppStorageGetKeys', {
  count: 20,
  offset: 0
})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { }); //runtime download
}
