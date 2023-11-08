import { BoardData } from "../config/types";
import IndexedDB, { OpenDBError } from "./indexedService";
import BridgeStorage from "./bridgeServices";
import getErrorMessage from "../utils/getErrorMessage";

class GeneralServices {
    static getBoardsList = async () => {
        try {
            const boardsList = await IndexedDB.getBoardsList();

            return boardsList;
        } catch (e) {
            if (e instanceof OpenDBError) throw e;

            const errorMessage = getErrorMessage(e);

            try {
                if (errorMessage !== "404") {
                    await IndexedDB.cleardDB();
                };

                const boardsList = await BridgeStorage.getBoardsList();

                IndexedDB.setBoardsList(boardsList);

                return boardsList;
            } catch (e2) {
                throw new Error(`${e} ; ${e2}`);
            };
        };
    }

    static getBoardData = async (boardId: number): Promise<BoardData> => {
        try {
            const idbData = await IndexedDB.getBoardData(boardId);

            return idbData;
        } catch (error1) {
            const errorMessage = getErrorMessage(error1);

            try {
                if (error1 instanceof OpenDBError) throw error1;

                if (errorMessage !== "404") {
                    await IndexedDB.cleardDB();
                };

                const bridgeData = await BridgeStorage.getBoardData(boardId);

                IndexedDB.updateBoardData(bridgeData);

                return bridgeData;
            } catch (error2) {
                throw new Error(`${error1} ; ${error2}`);
            };
        };
    }

    static addBoard = async (board: BoardData) => {
        try {
            await Promise.all([BridgeStorage.addBoard(board), IndexedDB.addBoard(board)]);
        } catch (e) {
            throw e;
        };
    }

    static deleteBoard = async (boardId: number) => {
        try {
            await Promise.all([BridgeStorage.deleteBoard(boardId), IndexedDB.deleteBoard(boardId)]);
        } catch (e) {
            throw e;
        };
    }

    static renameBoard = async (boardId: number, boardName: string) => {
        try {
            await Promise.all([BridgeStorage.renameBoard(boardId, boardName), IndexedDB.renameBoard(boardId, boardName)]);
        } catch (e) {
            throw e;
        };
    };
};

export default GeneralServices;