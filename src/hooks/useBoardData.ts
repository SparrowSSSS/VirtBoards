import { useMutation, useQuery } from "@tanstack/react-query";
import { BoardData } from "../config/types";
import BridgeStorage from "../services/bridgeServices";
import queryTags from "../config/queryTags";
import GeneralService from "../services/generalServices";
import IndexedDB from "../services/indexedService";
import { useCatchVirtBoardError } from "./useCatchError";
import errorsPS from "../config/errorsPS";

const useBoardData = () => {

    const catchError = useCatchVirtBoardError();

    return {
        updateBridge: useMutation({ mutationFn: (data: BoardData) => BridgeStorage.updateBoardData(data) }),
        updateIndex: useMutation({
            mutationFn: (data: BoardData) => IndexedDB.updateBoardData(data),
            onError: (error) => catchError(error, errorsPS.updateBoardData)
        }),
        query: (boardId: number) => useQuery({ queryKey: [queryTags.boardData], queryFn: () => GeneralService.getBoardData(boardId) })
    };
};

export default useBoardData;