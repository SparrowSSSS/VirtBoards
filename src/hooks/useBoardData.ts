import { useMutation, useQuery } from "@tanstack/react-query";
import { BoardData, TInterfaceContext } from "../config/types";
import BridgeStorage from "../services/bridgeServices";
import queryTags from "../config/queryTags";
import GeneralService from "../services/generalServices";
import IndexedDB from "../services/indexedService";
import errorsPS from "../config/errorsPS";
import useCatchError from "./useCatchError";
import { useContext } from "react";
import { interfaceContext } from "../panels/Panels";

const useBoardData = () => {

    const { popout: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

    const catchError = useCatchError(setPopout);

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