import { SetStateAction, ReactNode } from "react";

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
};

export type setStateF<T> = (value: SetStateAction<T>) => void;

export type TInterfaceContext = {
    panels: {
        activePanel: string,
        setActivePanel: setStateF<string>
    },

    modals: {
        activeModal: TModal | null,
        setActiveModal: setStateF<TModal | null>
    },

    popouts: {
        popout: ReactNode,
        setPopout: setStateF<ReactNode>
    },

    boards: {
        boardsList: BoardNameAndId[] | "loading",
        setBoardsList: setStateF<BoardNameAndId[] | "loading">
    },

    user: {
        userName: string,
        setUserName: setStateF<string>
    },

    snackbars: {
        snackbar: ReactNode | null,
        setSnackbar: setStateF<ReactNode | null>
    },

    loading: {
        isLoading: boolean,
        setIsLoading: setStateF<boolean>
    },

    func: {
        catchError: (error: any, ps: string) => void
    }
};

export type TTool = "cursor" | "pencil" | "eraser";

export type TBoardContext = {
    fullscreen: {
        fullScreenBoard: boolean,
        setFullScreenBoard: setStateF<boolean>
    },

    modals: {
        boardModal: TModal | null,
        setBoardModal: setStateF<TModal | null>
    },

    data: {
        boardData: BoardData,
        setBoardData: setStateF<BoardData>
    },

    tools: {
        activeTool: TTool,
        setActiveTool: setStateF<TTool>
    },

    cursor: {
        activeCursor: string,
        setActiveCursor: setStateF<string>
    },

    window: {
        boardWindow: HTMLDivElement | null,
        setBoardWindow: setStateF<HTMLDivElement | null>
    },

    events: {
        down: {
            mouseDown: boolean,
            setMouseDown: setStateF<boolean>
        }
    }
};

export type TStateDataCanvas = {
    scroll: {
        x: number,
        y: number
    },

    windowSize: {
        x: number,
        y: number
    }
};

export type TCatchError = (error: any, ps: string) => void;

export type TCanvasContext = {
    data: TStateDataCanvas
};