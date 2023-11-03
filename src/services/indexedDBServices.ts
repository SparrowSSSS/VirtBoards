import { IDBPDatabase } from "idb";
import { MyDB } from "../hooks/useDB";
import { BoardData, BoardNameAndId } from "../types";

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
        return boardData;
    } catch(e) {
        throw e;
    };
};

export const getBoardsList = async (db: IDBPDatabase<MyDB>): Promise<BoardNameAndId[]> => {
    const transaction = db.transaction("boards-names", "readonly");

    const boardsNames = transaction.objectStore("boards-names");

    try {
        const boardsList = await boardsNames.getAll();

        return boardsList;
    } catch (e) {
        throw e;
    };
};

export const deleteBoard = async (db: IDBPDatabase<MyDB>, boardId: number) => {
    const transaction = db.transaction(["boards-names", "boards"], "readwrite");

    const boardsNames = transaction.objectStore("boards-names");
    const boards = transaction.objectStore("boards");

    try {
        await boardsNames.delete(boardId);
        await boards.delete(boardId);
    } catch(e) {
        throw e;
    };
};

export const addBoard = async (db: IDBPDatabase<MyDB>, board: BoardNameAndId) => {
    const transaction = db.transaction(["boards-names", "boards"], "readwrite");

    const boardsNames = transaction.objectStore("boards-names");
    const boards = transaction.objectStore("boards");

    try {
        await boardsNames.put(board);
        await boards.put({...board, settings: {grid: true}, components: []});
    } catch (e) {
        throw e;
    };
};