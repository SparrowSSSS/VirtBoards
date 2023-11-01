import { MouseEvent, SetStateAction, ReactNode } from "react";

export type BoardNameAndId = {
    name: string,
    id: number
};

export type BoardComponent = {
    type: string
};

export type BoardData = {
    name: string,
    id: number,
    settings: {
        grid: boolean
    },
    components: BoardComponent[]
};

export type onClickRemoveBoard = (i: number) => void;

export type TInterfaceContext = {
    panels: {
        activePanel: string,
        setActivePanel: (value: SetStateAction<string>) => void
    },

    modals: {
        activeModal: string | null,
        setActiveModal: (value: SetStateAction<string | null>) => void
    },

    popouts: {
        popout: ReactNode,
        setPopout: (value: SetStateAction<ReactNode>) => void
    },

    boards: {
        boardsList: BoardNameAndId[] | "loading",
        setBoardsList: (value: SetStateAction<BoardNameAndId[] | "loading">) => void
    }
};

export type TBoardContext = {
    fullScreenBoard: boolean,
    boardData?: BoardData,
    setBoardModal: (value: SetStateAction<ReactNode | null>) => void,
    setBoardData: (value: SetStateAction<BoardData | undefined>) => void,
    setFullScreenBoard: (value: SetStateAction<boolean>) => void
};