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

export type TScroll = { x: number, y: number };

export type TWindowSize = { w: number, h: number };

export type TInterfaceOptions = {
    activePanel: string,
    activeModal: TModal | null,
    popout: ReactNode | null,
    boardsList: BoardNameAndId[],
    userName: string,
    snackbar: ReactNode | null,
    isLoading: boolean
};

export type TBoardOptions = {
    fullscreen: boolean,
    boardData: BoardData | null,
    activeTool: TTool,
    activeCursor: string,
    boardWindow: any,
    boardModal: TModal | null,
    boardPopout: ReactNode | null
};

export type TCanvasOptions = {
    scroll: TScroll,
    windowSize: TWindowSize
};

export type TEventOptions = {
    mouseDown: boolean
};

export type TTool = "cursor" | "pencil" | "eraser";

export type TCatchError = (error: any, ps: string) => void;