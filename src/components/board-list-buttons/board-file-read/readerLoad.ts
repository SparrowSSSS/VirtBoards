import { BoardData, BoardNameAndId } from "../../../config/types";
import checkOrigin from "../../../utils/checkOrigin";
import getId from "../../../utils/getId";

const readerLoad = (reader: FileReader, boardsList: BoardNameAndId[]) => {
    const board = { ...JSON.parse(reader.result as string), id: getId() } as BoardData;

    if (!checkOrigin(board.name, boardsList)) {
        board.name = board.name + "(1)";
        let n = 1;
        while (!checkOrigin(board.name, boardsList)) {
            board.name = board.name.replace(new RegExp(`(${n})`), `${n + 1}`);
            n += 1;
        };
    };

    return board;
};

export default readerLoad;