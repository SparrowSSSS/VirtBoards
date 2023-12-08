import { useMutation, useQuery } from "@tanstack/react-query";
import { BoardData } from "../config/types";
import BridgeStorage from "../services/bridgeServices";
import queryTags from "../config/queryTags";
import GeneralService from "../services/generalServices";

const useBoardData = () => {
    return {
        mutation: useMutation({ mutationFn: (data: BoardData) => BridgeStorage.updateBoardData(data) }),
        query: (boardId: number) => useQuery({ queryKey: [queryTags.boardData], queryFn: () => GeneralService.getBoardData(boardId) })
    };
};

export default useBoardData;