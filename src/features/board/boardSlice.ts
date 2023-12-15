import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cursors from '../../config/cursors';
import { BoardData, TBoardOptions, TModal, TTool } from '../../config/types';

const initialState: TBoardOptions = {
    fullscreen: false,
    boardModal: null,
    boardData: null,
    activeTool: "cursor",
    activeCursor: cursors.cursor,
    boardWindow: null,
    boardPopout: null
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setFullscreen: (state, action: PayloadAction<boolean>) => {
            state.fullscreen = action.payload;
        },

        setBoardData: (state, action: PayloadAction<BoardData | null>) => {
            state.boardData = action.payload;
        },

        setActiveTool: (state, action: PayloadAction<TTool>) => {
            state.activeTool = action.payload;
        },

        setActiveCursor: (state, action: PayloadAction<string>) => {
            state.activeCursor = action.payload;
        },

        setBoardWindow: (state, action: PayloadAction<HTMLDivElement | null>) => {
            state.boardWindow = action.payload;
        },

        setModal: (state, action: PayloadAction<TModal | null>) => {
            state.boardModal = action.payload;
        },

        setPopout: (state, action: PayloadAction<React.ReactNode | null>) => {
            state.boardPopout = action.payload;
        }
    }
});

export const boardActions = boardSlice.actions;

export type TBoardActions = typeof boardActions;

export default boardSlice.reducer;