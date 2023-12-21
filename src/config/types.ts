import { SetStateAction, ReactNode } from "react";

export type BoardNameAndId = {
    name: string,
    id: number
};

export type TCoords = { x: number, y: number };

export type TGraphOptions = {
    compressUrl: string,
    position: TCoords
};

export type BoardComponent = {
    id: number,
    options: TGraphOptions
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

export type setStateF<T> = (value: SetStateAction<T>) => void;

export type TScroll = { x: number, y: number };

export type TWindowSize = { w: number, h: number };

export type TRenameModalProps = { id: number, name: string, index: number }

export type TModal = { id: string, renameModalProps?: TRenameModalProps } | null

export type TInterfaceOptions = {
    activePanel: string,
    boardsList: BoardNameAndId[],
    userName: string,
    isLoading: boolean,
    activeModal: TModal
};

export type TBoardOptions = {
    fullscreen: boolean,
    boardData: BoardData | null,
    activeTool: TTool,
    activeCursor: string,
    boardModal: TModal
};

export type TCanvasOptions = {
    scroll: TScroll,
    windowSize: TWindowSize
};

export type TEventOptions = {
    mouseDown: boolean
};

export type TBoardContext = {
    popout: {
        boardPopout: ReactNode | null,
        setBoardPopout: setStateF<ReactNode | null>
    },

    window: {
        boardWindow: HTMLDivElement | null,
        setBoardWindow: setStateF<HTMLDivElement | null>
    }

};

export type TInterfaceContext = {
    popout: {
        interfacePopout: ReactNode | null,
        setPopout: setStateF<ReactNode | null>
    },

    snackbar: {
        interfaceSnackbar: ReactNode | null,
        setSnackbar: setStateF<ReactNode | null>
    }

};

export type TTool = "cursor" | "pencil" | "eraser";

export type TCatchError = (error: any, ps: string) => void;