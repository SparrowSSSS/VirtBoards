import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import panels from '../../config/panels';
import { BoardNameAndId, TInterfaceOptions, TModal } from '../../config/types';

const initialState: TInterfaceOptions = {
    activePanel: panels.home,
    boardsList: [],
    isLoading: false,
    userName: "",
    activeModal: null
};

export const interfaceSlice = createSlice({
    name: "interface",
    initialState,
    reducers: {

        setPanel: (state, action: PayloadAction<string>) => {
            state.activePanel = action.payload;
        },

        setBoardsList: (state, action: PayloadAction<BoardNameAndId[]>) => {
            state.boardsList = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },

        setModal: (state, action: PayloadAction<TModal>) => {
            state.activeModal = action.payload;
        }
    }
});

export const interfaceActions = interfaceSlice.actions;

export type TInterfaceActions = typeof interfaceActions;

export default interfaceSlice.reducer;