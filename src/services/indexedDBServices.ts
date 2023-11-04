import { IDBPDatabase } from "idb";
import { MyDB } from "../hooks/useDB";
import { BoardData } from "../config/types";

export const updateBoardData = async (db: IDBPDatabase<MyDB>, boardData: BoardData) => {
    const transaction = db.transaction("boards", "readwrite");

    const boards = transaction.objectStore("boards");

    try {
        await boards.put(boardData);
    } catch(e) {
        throw e;
    };
};

export const getBoardData = async (db: IDBPDatabase<MyDB>, boardId: number): Promise<BoardData> => {
    const transaction = db.transaction("boards", "readonly");

    const boards = transaction.objectStore("boards");

    try {
        const boardData = await boards.get(boardId) as BoardData;

        if (!boardData) throw new Error("Данные в локальном хранилище отсутствуют");
        
        return boardData;
    } catch(e) {
        throw e;
    };
};

export const deleteBoard = async (db: IDBPDatabase<MyDB>, boardId: number) => {
    const transaction = db.transaction("boards", "readwrite");

    const boards = transaction.objectStore("boards");

    try {
        await boards.delete(boardId);
    } catch(e) {
        throw e;
    };
};

export const addBoard = async (db: IDBPDatabase<MyDB>, board: BoardData) => {
    const transaction = db.transaction("boards", "readwrite");

    const boards = transaction.objectStore("boards");

    try {
        await boards.put(board);
    } catch (e) {
        throw e;
    };
};