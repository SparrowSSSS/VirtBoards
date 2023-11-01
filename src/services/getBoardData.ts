import { MyDB } from "../hooks/useDB";
import { BoardData } from "../types";
import {IDBPDatabase} from "idb";

const getBoardData = async (db: IDBPDatabase<MyDB>, boardId: number): Promise<BoardData> => {
    const transaction = db.transaction("boards", "readonly");

    const boards = transaction.objectStore("boards");

    try {
        const boardData = await boards.get(boardId) as BoardData;
        return boardData;
    } catch(e) {
        throw e;
    };
};

export default getBoardData;