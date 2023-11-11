import { MouseEvent, SetStateAction, ReactNode } from "react";

export type BoardNameAndId = {
    name: string,
    id: number
};

export type BoardComponent = {
    type: string
};

export type TSettings = {
    grid?: boolean
}

export type BoardData = {
    name: string,
    id: number,
    settings: TSettings,
    components: BoardComponent[]
};

export type onClickRemoveBoard = (i: number) => void;

export type TModal = {
    id: string,
    modal: ReactNode
}

export type TInterfaceContext = {
    panels: {
        activePanel: string,
        setActivePanel: (value: SetStateAction<string>) => void
    },

    modals: {
        activeModal: TModal | null,
        setActiveModal: (value: SetStateAction<TModal | null>) => void
    },

    popouts: {
        popout: ReactNode,
        setPopout: (value: SetStateAction<ReactNode>) => void
    },

    boards: {
        boardsList: BoardNameAndId[] | "loading",
        setBoardsList: (value: SetStateAction<BoardNameAndId[] | "loading">) => void
    },

    user: {
        userName: string,
        setUserName: (value: SetStateAction<string>) => void
    },

    snackbars: {
        snackbar: ReactNode | null,
        setSnackbar: (value: SetStateAction<ReactNode | null>) => void
    },

    loading: {
        isLoading: boolean,
        setIsLoading: (value: SetStateAction<boolean>) => void
    },

    func: {
        catchError: (error: any, ps: string) => void
    }
};

export type TBoardContext = {
    fullscreen: {
        fullScreenBoard: boolean,
        setFullScreenBoard: (value: SetStateAction<boolean>) => void
    },

    modals: {
        boardModal: TModal | null,
        setBoardModal: (value: SetStateAction<TModal | null>) => void
    },

    data: {
        boardData?: BoardData,
        setBoardData: (value: SetStateAction<BoardData | undefined>) => void
    }
};