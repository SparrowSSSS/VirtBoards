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

};

export class OpenDBError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OpenDBError"
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
            },

            blocked() {
                throw new OpenDBError("Не удаётся подключиться к локальной базе данных, рекомендуем закрыть все вкладки с приложением, кроме этой");
            },

            blocking() {
                throw new OpenDBError("Рекомендуем закрыть текущую вкладку с приложением, так как она препятствует работе с локальной базой данных");
            },

            terminated() {
                throw new OpenDBError("Неизвестная ошибка подключения к локальной базой данных");
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
    }

    static cleardDB = async () => {
        try {
            const db = await createDB();

            const transaction = db.transaction(["boardNames", "boards"], "readwrite");

            const bn = transaction.objectStore("boardNames");
            const b = transaction.objectStore("boards");

            await Promise.all([bn.clear(), b.clear()]);
        } catch (e) {
            throw e;
        };
    }

    static setBoardsList = async (boardsList: BoardNameAndId[]) => {
        try {
            const db = await createDB();

            const transaction = db.transaction("boardNames", "readwrite");

            const bn = transaction.objectStore("boardNames");

            const list = [];

            for (let i of boardsList) {
                list.push(bn.add(i));
            };

            await Promise.all(list);
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

            if (!boardData) throw new Error("404");

            return boardData;
        } catch (e) {
            throw e;
        };
    }

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

    static deleteBoard = async (boardId: number) => {
        try {
            const db = await createDB();

            const transaction = db.transaction(["boards", "boardNames"], "readwrite");

            const boards = transaction.objectStore("boards");
            const boardNames = transaction.objectStore("boardNames");

            await Promise.all([boards.delete(boardId), boardNames.delete(boardId)]);
        } catch (e) {
            throw e;
        };
    }

    static addBoard = async (board: BoardData) => {
        try {
            const db = await createDB();

            const transaction = db.transaction(["boards", "boardNames"], "readwrite");

            const boards = transaction.objectStore("boards");
            const boardNames = transaction.objectStore("boardNames");

            await Promise.all([boards.add(board), boardNames.add({id: board.id, name: board.name})]);
        } catch (e) {
            throw e;
        };
    }

    static renameBoard = async (boardId: number, newBoardName: string) => {
        try {
            const db = await createDB();

            const transaction = db.transaction(["boards", "boardNames"], "readwrite");

            const boards = transaction.objectStore("boards");
            const boardNames = transaction.objectStore("boardNames");

            const boardData = await boards.get(boardId) as BoardData;

            await Promise.all([boards.put({...boardData, name: newBoardName}), boardNames.put({name: newBoardName, id: boardId})]);
        } catch (e) {
            throw e;
        };
    };
};

export default IndexedDB;