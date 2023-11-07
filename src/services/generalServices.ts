import { BoardData } from "../config/types";
import IndexedDB from "./indexedService";
import BridgeStorage from "./bridgeServices";

class GeneralServices {
    static getBoardsList = async () => {

    };

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

    static getBoardData = async (boardId: number): Promise<BoardData> => {
        try {
            const idbData = await IndexedDB.getBoardData(boardId);
    
            return idbData;
        } catch(error1) {
            try {
                const bridgeData = await BridgeStorage.getBoardData(boardId);
    
                await IndexedDB.addBoard(bridgeData);
    
                return bridgeData;
            } catch (error2) {
                throw new Error(`${error1}; ${error2}`);
            };
        };
    }

    static renameBoard = async (boardId: number, boardName: string) => {
        try {
            await Promise.all([BridgeStorage.renameBoard(boardId, boardName), IndexedDB.renameBoard(boardId, boardName)]);
        } catch(e) {
            throw e;
        };
    };
};

export default GeneralServices;