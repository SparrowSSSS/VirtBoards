import bridge from "@vkontakte/vk-bridge";
import { BoardData, BoardNameAndId } from "../config/types";
import { parseStorageKey } from "../utils/parseStorageKeys";

const bridgeStoragesPS = {
    boardNames: "boardName",
    boards: "board"
};

class BridgeStorage {
    static getUserName = async (): Promise<string> => {
        try {
            const userInfo = await bridge.send('VKWebAppGetUserInfo');

            if (userInfo.id) return `${userInfo.first_name} ${userInfo.last_name}`;
            else throw new Error("Отсуствует id");
        } catch (e) {
            throw e;
        };
    };

    static getBoardsList = async (): Promise<BoardNameAndId[]> => {
        try {
            const { keys } = await bridge.send('VKWebAppStorageGetKeys', { count: 6, offset: 0 });

            const boardNameKeys = parseStorageKey(keys, bridgeStoragesPS.boardNames);

            if (boardNameKeys.length === 0) return [];

            const boardsId = await bridge.send('VKWebAppStorageGet', { keys: boardNameKeys });

            const boardsList: BoardNameAndId[] = [];

            boardsId.keys.forEach(boardName => {
                boardsList.push({ id: Number(boardName.key.split("-")[1]), name: boardName.value });
            });

            return boardsList;
        } catch (e) {
            throw e;
        };
    };

    static addBoard = async (board: BoardData) => {
        try {
            await Promise.all([
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boardNames}-${board.id}`, value: board.name }),
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boards}-${board.id}`, value: JSON.stringify(board) })
            ]);
        } catch (e) {
            throw e;
        };
    };

    static deleteBoard = async (boardId: number) => {
        try {
            await Promise.all([
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boardNames}-${boardId}`, value: "" }),
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boards}-${boardId}`, value: "" })
            ]);
        } catch (e) {
            throw e;
        };
    };

    static getBoardData = async (boardId: number): Promise<BoardData> => {
        try {
            const { keys } = await bridge.send('VKWebAppStorageGet', { keys: [`${bridgeStoragesPS.boards}-${boardId}`] });
    
            if (keys.length) {
                return JSON.parse(keys[0].value);
            } else {
                throw new Error("Данные отсутствуют в ВК хранилище");
            };
        } catch (e) {
            throw e;
        };
    };
};

export default BridgeStorage;