import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCanvasOptions, TScroll, TWindowSize } from '../../config/types';

const initialState: TCanvasOptions = {
    scroll: { x: 0, y: 0 },
    windowSize: { w: 0, h: 0 }
};

export const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
        setScroll: (state, action: PayloadAction<TScroll>) => {
            state.scroll = action.payload;
        },

        setWindowSize: (state, action: PayloadAction<TWindowSize>) => {
            state.windowSize = action.payload;
        }
    }
});

export const canvasActions = canvasSlice.actions;

export type TCanvasActions = typeof canvasActions;

export default canvasSlice.reducer;