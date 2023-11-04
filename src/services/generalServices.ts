import { BoardData, BoardNameAndId } from "../config/types";
import { IDBPDatabase } from "idb";
import { MyDB } from "../hooks/useDB";
import * as indexedDB from "./indexedDBServices";
import * as vkBridge from "./bridgeServices";

export const addBoard = async (board: BoardNameAndId, db: IDBPDatabase<MyDB>) => {
    try {
        const b = { ...board, settings: { grid: true }, components: [] };

        await Promise.all([vkBridge.addBoard(b), indexedDB.addBoard(db, b)]);
    } catch (e) {
        throw e;
    };
};

export const deleteBoard = async (boardId: number, db: IDBPDatabase<MyDB>) => {
    try {
        await Promise.all([vkBridge.deleteBoard(boardId), indexedDB.deleteBoard(db, boardId)]);
    } catch (e) {
        throw e;
    };
};

export const getBoardData = async (boardId: number, db: IDBPDatabase<MyDB>): Promise<BoardData> => {
    try {
        const idbData = await indexedDB.getBoardData(db, boardId);

        return idbData;
    } catch(error1) {
        try {
            const bridgeData = await vkBridge.getBoardData(boardId);

            await indexedDB.addBoard(db, bridgeData);

            return bridgeData;
        } catch (error2) {
            throw new Error(`${error1}; ${error2}`);
        };
    };
};