import { useAppSelector } from "../app/hooks";

export const useBoardSelector = () => {
    return useAppSelector(state => state.board);
};

export const useInterfaceSelector = () => {
    return useAppSelector(state => state.interface);
};

export const useCanvasSelector = () => {
    return useAppSelector(state => state.canvas);
};

export const useEventsSelector = () => {
    return useAppSelector(state => state.events);
};