import {IDBPDatabase} from "idb";
import { MyDB } from "../hooks/useDB";
import { BoardNameAndId } from "../types";

const getBoardsList = async (db: IDBPDatabase<MyDB>): Promise<BoardNameAndId[]> => {
    const transaction = db.transaction("boards-names", "readonly");

    const boardsNames = transaction.objectStore("boards-names");

    try {
        const boardsList = await boardsNames.getAll();

        return boardsList;
    } catch (e) {
        throw e;
    };
};

export default getBoardsList;