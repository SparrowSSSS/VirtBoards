import {IDBPDatabase} from "idb";
import { MyDB } from "../hooks/useDB";

const deleteBoard = async (db: IDBPDatabase<MyDB>, boardId: number) => {
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

export default deleteBoard;