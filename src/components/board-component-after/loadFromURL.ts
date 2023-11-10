import { Platform } from "@vkontakte/vkui";
import { BoardData } from "../../config/types";
import bridge from "@vkontakte/vk-bridge";

const loadFromURL = (boardData: BoardData, platform: string) => {
    const data = { name: boardData.name, settings: boardData.settings, components: boardData.components };

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    const link = document.createElement('a');
    link.download = `${data.name}.json`;
    link.href = URL.createObjectURL(blob);

    if (platform === Platform.ANDROID) {
        bridge.send("VKWebAppDownloadFile", { url: link.href, filename: `${data.name}.json` })
            .then(data => {
                if (!data.result) {
                    throw new Error("");
                };
            })
            .catch(error => {
                throw error;
            });
    } else {
        link.click();

        URL.revokeObjectURL(link.href);
    };
};

export default loadFromURL;