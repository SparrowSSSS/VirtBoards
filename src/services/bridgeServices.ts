import bridge from "@vkontakte/vk-bridge";
import { BoardData, BoardNameAndId } from "../config/types";

const bridgeStoragesPS = {
    boardNames: "boardNames",
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
    }

    static addBoard = async (board: BoardData, newBoardsList: BoardNameAndId[]) => {
        try {
            await Promise.all([
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boardNames}`, value: JSON.stringify(newBoardsList) }),
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boards}-${board.id}`, value: JSON.stringify(board) })
            ]);
        } catch (e) {
            throw e;
        };
    }

    static updateBoardData = async (newBoardData: BoardData) => {
        try {
            await bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boards}-${newBoardData.id}`, value: JSON.stringify(newBoardData) });
        } catch (e) {
            throw e;
        };
    }

    static getBoardsList = async (): Promise<BoardNameAndId[]> => {
        try {
            const { keys } = await bridge.send('VKWebAppStorageGet', { keys: [bridgeStoragesPS.boardNames] });

            if (!keys[0].value) return [];

            const boardsList = JSON.parse(keys[0].value) as BoardNameAndId[];

            return boardsList;
        } catch (e) {
            throw e;
        };
    }

    static deleteBoard = async (boardId: number, newBoardsList: BoardNameAndId[]) => {
        try {
            await Promise.all([
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boardNames}`, value: JSON.stringify(newBoardsList) }),
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boards}-${boardId}`, value: "" })
            ]);
        } catch (e) {
            throw e;
        };
    }

    static renameBoard = async (newBoardsList: BoardNameAndId[], newBoardName: BoardNameAndId) => {
        try {
            const boardData = await this.getBoardData(newBoardName.id);

            const newBoardData: BoardData = {...boardData, name: newBoardName.name};

            await Promise.all([
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boardNames}`, value: JSON.stringify(newBoardsList) }),
                bridge.send('VKWebAppStorageSet', { key: `${bridgeStoragesPS.boards}-${newBoardName.id}`, value: JSON.stringify({...boardData, name: newBoardData}) })
            ]);
        } catch (e) {
            throw e;
        };
    }

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
    }
};

export default BridgeStorage;