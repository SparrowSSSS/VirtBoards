import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import panels from '../../config/panels';
import { BoardNameAndId, TInterfaceOptions, TModal } from '../../config/types';

const initialState: TInterfaceOptions = {
    activeModal: null,
    activePanel: panels.home,
    boardsList: [],
    isLoading: false,
    popout: null,
    snackbar: null,
    userName: ""
};

export const interfaceSlice = createSlice({
    name: "interface",
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<TModal | null>) => {
            state.activeModal = action.payload;
        },

        setPanel: (state, action: PayloadAction<string>) => {
            state.activePanel = action.payload;
        },

        setBoardsList: (state, action: PayloadAction<BoardNameAndId[]>) => {
            state.boardsList = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setPopout: (state, action: PayloadAction<ReactNode | null>) => {
            state.popout = action.payload;
        },

        setSnackbar: (state, action: PayloadAction<ReactNode | null>) => {
            state.snackbar = action.payload;
        },

        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        }
    }
});

export const interfaceActions = interfaceSlice.actions;

export type TInterfaceActions = typeof interfaceActions;

export default interfaceSlice.reducer;