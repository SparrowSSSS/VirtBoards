import { TTool } from "../config/types";
import { WheelEvent, MouseEvent, useMemo } from "react";
import cursors from "../config/cursors";
import { useBoardActions } from "./useActions";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

class BoardEvents {

    boardWindow: HTMLDivElement | null;
    setActiveCursor: ActionCreatorWithPayload<string, "board/setActiveCursor">;

    wheelK = 150;
    mouseMoveK = 5;

    down: boolean;

    lastX: number;
    lastY: number;

    lastCursor: string;

    constructor(boardWindow: HTMLDivElement | null, setActiveCursor: ActionCreatorWithPayload<string, "board/setActiveCursor">) {
        this.boardWindow = boardWindow;
        this.setActiveCursor = setActiveCursor;
        this.lastX = 0;
        this.lastY = 0;
        this.down = false;
        this.lastCursor = "default";
    }

    wheel = (e: WheelEvent<HTMLDivElement>, down: boolean, tool: TTool) => {
        if (!(down && tool === "pencil") && this.boardWindow) {
            let by;

            if (e.deltaY > 0) by = this.wheelK;
            else by = -this.wheelK;

            this.boardWindow.scrollBy(0, by);
        };
    }

    mouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, activeCursor: string, mouseDown: boolean) => {
        e.preventDefault();

        if (e.button === 1 && this.boardWindow && !mouseDown) {
            this.lastCursor = activeCursor;
            this.setActiveCursor(cursors.grabbing);

            this.lastX = e.clientX;
            this.lastY = e.clientY;

            this.down = true;
        };
    }

    mouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (!this.down) return;

        let byX = 0;
        let byY = 0;

        if (e.clientX < this.lastX) byX = this.mouseMoveK;
        else if (e.clientX > this.lastX) byX = -this.mouseMoveK;

        if (e.clientY < this.lastY) byY = this.mouseMoveK;
        else if (e.clientY > this.lastY) byY = -this.mouseMoveK;

        this.boardWindow?.scrollBy(byX, byY);

        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }

    mouseOut = () => {
        if (!this.down) return;

        this.down = false;

        this.setActiveCursor(this.lastCursor);
    };
};

const useBoardEvents = (boardWindow: HTMLDivElement | null) => {
    const { setActiveCursor } = useBoardActions();

    return useMemo(() => new BoardEvents(boardWindow, setActiveCursor), [boardWindow]);
};

export default useBoardEvents;