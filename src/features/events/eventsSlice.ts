import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TEventOptions } from '../../config/types';

const initialState: TEventOptions = {
    mouseDown: false
};

export const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setMouseDown: (state, action: PayloadAction<boolean>) => {
            state.mouseDown = action.payload;
        }
    }
});

export const eventsActions = eventsSlice.actions;

export type TEventsActions = typeof eventsActions;

export default eventsSlice.reducer;