import { IDBPDatabase } from "idb";
import { MyDB } from "../hooks/useDB";
import { BoardData } from "../types";

const updateSettings = async (db: IDBPDatabase<MyDB>, boardData: BoardData) => {
    const transaction = db.transaction("boards", "readwrite");

    const boards = transaction.objectStore("boards");

    try {
        await boards.put(boardData);
    } catch(e) {
        throw e;
    };
};

export default updateSettings;