import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useAppDispatch } from "../app/hooks";
import { boardActions, TBoardActions } from "../features/board/boardSlice";
import { canvasActions, TCanvasActions } from "../features/canvas/canvasSlice";
import { eventsActions, TEventsActions } from "../features/events/eventsSlice";
import { interfaceActions, TInterfaceActions } from "../features/interface/interfaceSlice";

function useActions<T>(actions: any): T {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

export const useEventActions = () => {
    return useActions<TEventsActions>(eventsActions);
};

export const useBoardActions = () => {
    return useActions<TBoardActions>(boardActions);
};

export const useCanvasActions = () => {
    return useActions<TCanvasActions>(canvasActions);
};

export const useInterfaceActions = () => {
    return useActions<TInterfaceActions>(interfaceActions);
};