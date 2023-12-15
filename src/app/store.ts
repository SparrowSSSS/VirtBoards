import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "../features/interface/interfaceSlice";
import boardReducer from "../features/board/boardSlice";
import canvasReducer from "../features/canvas/canvasSlice";
import eventsReducer from "../features/events/eventsSlice";

const store = configureStore({
    reducer: {
        interface: interfaceReducer,
        board: boardReducer,
        canvas: canvasReducer,
        events: eventsReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["interface/setPopout", "interface/setModal", "board/setBoardWindow", "board/setModal", "board/setPopout"]
            }
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;