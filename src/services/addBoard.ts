import { IDBPDatabase } from "idb";
import { MyDB } from "../hooks/useDB";
import { BoardNameAndId } from "../types";

const addBoard = async (db: IDBPDatabase<MyDB>, board: BoardNameAndId) => {
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

export default addBoard;