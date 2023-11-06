import { BoardData } from "../config/types";
import { IDBPDatabase } from "idb";
import { MyDB } from "../hooks/useDB";
import * as indexedDB from "./indexedDBServices";
import * as vkBridge from "./bridgeServices";

export const addBoard = async (board: BoardData, db: IDBPDatabase<MyDB>) => {
    try {
        await Promise.all([vkBridge.addBoard(board), indexedDB.addBoard(db, board)]);
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

export const renameBoard = async (boardId: number, db: IDBPDatabase<MyDB>, boardName: string) => {
    try {
        await Promise.all([vkBridge.renameBoard(boardId, boardName), indexedDB.renameBoard(db, boardId, boardName)]);
    } catch(e) {
        throw e;
    };
};