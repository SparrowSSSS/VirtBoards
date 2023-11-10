import { IDBPDatabase } from "idb";
import { openDB, DBSchema } from 'idb';
import { BoardData, BoardNameAndId } from '../config/types';

export interface MyDB extends DBSchema {
    boards: {
        key: number,
        value: BoardData
    }
};

const config = {
    dbName: "boards-store",
    dbVersion: 1,
    dbUpgrade: (db: IDBPDatabase<MyDB>, oldVersion: number) => {
        if (oldVersion == 0) {
            db.createObjectStore("boards", { keyPath: "id" });
        };
    }
};

const createDB = async () => {
    try {
        const db = await openDB<MyDB>(config.dbName, config.dbVersion, {
            upgrade(db, oldVersion) {
                config.dbUpgrade(db, oldVersion);
            },

            blocked() {
                throw new Error("Не удаётся подключиться к локальной базе данных, рекомендуем закрыть все вкладки с приложением, кроме этой");
            },

            blocking() {
                throw new Error("Рекомендуем закрыть текущую вкладку с приложением, так как она препятствует работе с локальной базой данных");
            },

            terminated() {
                throw new Error("Неизвестная ошибка подключения к локальной базой данных");
            }
        });

        return db;
    } catch (e) {
        throw e;
    };
};

class IndexedDB {

    static addBoard = async (board: BoardData) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readwrite");

            const boards = transaction.objectStore("boards");

            await boards.put(board);
        } catch (e) {
            throw e;
        }
    }

    static getBoardData = async (boardId: number): Promise<BoardData> => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readonly");

            const boards = transaction.objectStore("boards");
            const boardData = await boards.get(boardId);

            if (!boardData) throw new Error("404");

            return boardData;
        } catch (e) {
            throw e;
        }
    }

    static updateBoardData = async (boardData: BoardData) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readwrite");

            const boards = transaction.objectStore("boards");

            await boards.put(boardData);
        } catch (e) {
            throw e;
        }
    }

    static deleteBoard = async (boardId: number) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readwrite");

            const boards = transaction.objectStore("boards");

            await Promise.all([boards.delete(boardId)]);
        } catch (e) {
            throw e;
        }
    }

    static renameBoard = async (newBoardName: BoardNameAndId) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boards", "readwrite");

            const boards = transaction.objectStore("boards");

            const boardData = await boards.get(newBoardName.id) as BoardData;

            await Promise.all([boards.put({...boardData, name: newBoardName.name})]);
        } catch (e) {
            throw e;
        }
    };
};

export default IndexedDB;