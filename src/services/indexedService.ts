import { IDBPDatabase } from "idb";
import { openDB, DBSchema } from 'idb';
import { BoardData, BoardNameAndId } from '../config/types';

export interface MyDB extends DBSchema {
    boards: {
        key: number,
        value: BoardData
    },

    boardNames: {
        key: number,
        value: BoardNameAndId
    }

}

const config = {
    dbName: "boards-store",
    dbVersion: 1,
    dbUpgrade: (db: IDBPDatabase<MyDB>, oldVersion: number) => {
        if (oldVersion == 0) {
            db.createObjectStore("boards", { keyPath: "id" });
            db.createObjectStore("boardNames", { keyPath: "id" });
        };
    }
};

const createDB = async () => {
    try {
        const db = await openDB<MyDB>(config.dbName, config.dbVersion, {
            upgrade(db, oldVersion) {
                config.dbUpgrade(db, oldVersion);
            }
        });

        return db;
    } catch (e) {
        throw e;
    };
};

class IndexedDB {
    static getBoardsList = async (): Promise<BoardNameAndId[]> => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boardNames", "readonly");

            const bn = transaction.objectStore("boardNames");

            const boardsList = await bn.getAll();

            db.close();

            if (boardsList && boardsList.length > 0) return boardsList;
            else throw new Error("404");
        } catch (e) {
            throw e;
        };
    };

    static updateBoardData = async (boardData: BoardData) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readwrite");

            const boards = transaction.objectStore("boards");

            await boards.put(boardData);
        } catch (e) {
            throw e;
        };
    }

    static getBoardData = async (boardId: number): Promise<BoardData> => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readonly");

            const boards = transaction.objectStore("boards");
            const boardData = await boards.get(boardId);

            if (!boardData) throw new Error("Данные в локальном хранилище отсутствуют");

            return boardData;
        } catch (e) {
            throw e;
        };
    }

    static deleteBoard = async (boardId: number) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readwrite");

            const boards = transaction.objectStore("boards");

            await boards.delete(boardId);
        } catch (e) {
            throw e;
        };
    }

    static addBoard = async (board: BoardData) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readwrite");

            const boards = transaction.objectStore("boards");

            await boards.put(board);
        } catch (e) {
            throw e;
        };
    }

    static renameBoard = async (boardId: number, newBoardName: string) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readonly");

            const boards = transaction.objectStore("boards");

            const boardData = await boards.get(boardId);

            if (boardData) {
                boardData.name = newBoardName;

                await this.updateBoardData(boardData);
            };
        } catch (e) {
            throw e;
        };
    };
};

export default IndexedDB;