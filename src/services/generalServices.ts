import localStorages from "../config/localStorages";
import { BoardData, BoardNameAndId } from "../config/types";
import getErrorMessage from "../utils/getErrorMessage";
import BridgeStorage from "./bridgeServices";
import IndexedDB from "./indexedService";

class GeneralService {
    static getBoardsList = async (type: "init" | "check"): Promise<BoardNameAndId[]> => {
        try {
            let boardsList: BoardNameAndId[] = [];

            let check = localStorage.getItem(localStorages.boards);

            if (check) {
                boardsList = JSON.parse(check) as BoardNameAndId[];
                if (type === "init") localStorage.setItem(localStorages.boards, "");

                return boardsList;
            };

            boardsList = await BridgeStorage.getBoardsList();

            return boardsList;
        } catch (e) {
            throw e;
        };
    }

    static addBoard = async (board: BoardData) => {
        try {
            const boardsList = await this.getBoardsList("check");

            const boardName: BoardNameAndId = {name: board.name, id: board.id};

            const newBoardsList = [...boardsList, boardName];

            await Promise.all([BridgeStorage.addBoard(board, newBoardsList), IndexedDB.addBoard(board)]);

            localStorage.setItem(localStorages.boards, JSON.stringify(newBoardsList));
        } catch (e) {
            throw e;
        };
    }

    static deleteBoard = async (boardId: number) => {
        try {
            const boardsList = await this.getBoardsList("check");

            const index = boardsList.findIndex(b => b.id === boardId);
            
            boardsList.splice(index, 1);

            await Promise.all([BridgeStorage.deleteBoard(boardId, boardsList), IndexedDB.deleteBoard(boardId)]);

            localStorage.setItem(localStorages.boards, JSON.stringify(boardsList));
        } catch (e) {
            throw e;
        };
    }

    static renameBoard = async (boardId: number, newBoardName: string) => {
        try {
            const boardsList = await this.getBoardsList("check");

            const index = boardsList.findIndex(b => b.id === boardId);

            boardsList[index].name = newBoardName;

            const newBoard: BoardNameAndId = {name: newBoardName, id: boardId}

            await Promise.all([BridgeStorage.renameBoard(boardsList, newBoard), IndexedDB.renameBoard(newBoard)]);

            localStorage.setItem(localStorages.boards, JSON.stringify(boardsList));
        } catch (e) {
            throw e;
        };
    }

    static getBoardData = async (boardId: number) => {
        try {
            const idbBoardData = await IndexedDB.getBoardData(boardId);

            return idbBoardData;
        } catch (e1) {
            try {
                const bridgeBoardData = await BridgeStorage.getBoardData(boardId);

                try {
                    await IndexedDB.updateBoardData(bridgeBoardData);
                } catch (e) {
                    console.log(getErrorMessage(e));
                };

                return bridgeBoardData;
            } catch (e2) {
                throw new Error(`${e1} ; ${e2}`);
            };
        };
    }
    
};

export default GeneralService;