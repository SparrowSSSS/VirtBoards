import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cursors from '../../config/cursors';
import { BoardData, TBoardOptions, TModal, TTool } from '../../config/types';

const initialState: TBoardOptions = {
    fullscreen: false,
    boardModal: null,
    boardData: null,
    activeTool: "cursor",
    activeCursor: cursors.cursor
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

        setBoardModal: (state, action: PayloadAction<TModal>) => {
            state.boardModal = action.payload;
        },
    }
});

export const boardActions = boardSlice.actions;

export type TBoardActions = typeof boardActions;

export default boardSlice.reducer;