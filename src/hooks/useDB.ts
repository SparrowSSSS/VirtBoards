import { openDB, DBSchema } from 'idb';

export interface MyDB extends DBSchema {
    'boards-names': {
      key: number;
      value: string;
    },

    boards: {
        key: number,
        value: {
            name: string
        }
    }

  }

const useDB = async () => {
    const db = await openDB<MyDB>("boards-store", 1, {
        upgrade(db, oldVersion) {
            if (oldVersion == 0) {
                db.createObjectStore("boards-names");
                db.createObjectStore("boards");
            };
        }
    });

    return db;
};

export default useDB;