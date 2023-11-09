import { BoardData, BoardNameAndId } from "../../../config/types";
import IndexedDB from "../../../services/indexedService";
import checkOrigin from "../../../utils/checkOrigin";

const readerLoad = async (reader: FileReader, boardsList: BoardNameAndId[]) => {
    try {
        const board = { ...JSON.parse(reader.result as string), id: Date.now() } as BoardData;

        if (!checkOrigin(board.name, boardsList)) {
            board.name = board.name + "(1)";
            let n = 1;
            while (!checkOrigin(board.name, boardsList)) {
                board.name = board.name.replace(new RegExp(`(${n})`), `${n + 1}`);
                n += 1;
            };
        };

        await IndexedDB.addBoard(board);

        return board;
    } catch (e) {
        throw e;
    };
};

export default readerLoad;