import { BoardData } from "../../config/types";

const loadFromURL = (boardData: BoardData) => {
    const data = { name: boardData.name, settings: boardData.settings, components: boardData.components };

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    const link = document.createElement('a');
    link.download = `${data.name}.json`;
    link.href = URL.createObjectURL(blob);

    link.click();

    URL.revokeObjectURL(link.href);
};

export default loadFromURL;