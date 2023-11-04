import { openDB, DBSchema } from 'idb';
import { BoardData, BoardNameAndId } from '../config/types';

export interface MyDB extends DBSchema {
    boards: {
        key: number,
        value: BoardData
    }

}

const useDB = async () => {
    try {
        const db = await openDB<MyDB>("boards-store", 1, {
            upgrade(db, oldVersion) {
                if (oldVersion == 0) {
                    db.createObjectStore("boards", { keyPath: "id" });
                };
            }
        });

        return db;
    } catch (e) {
        throw e;
    };
};

export default useDB;