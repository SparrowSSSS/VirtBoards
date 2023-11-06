import { BoardNameAndId } from "../config/types";

const checkOrigin = (boardName: string, boardsList: BoardNameAndId[]): boolean => {
    let checkBoardName: boolean = true;

    for (let board of boardsList) {
        if (boardName === board.name) {
            checkBoardName = false;
            break;
        };
    };

    return checkBoardName;
};

export default checkOrigin;