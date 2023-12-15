import { MutableRefObject, MouseEvent, useMemo } from "react";
import { Application, Container as TContainer, DisplayObject, Graphics, ICanvas } from "pixi.js";
import { BoardData, TTool } from "../config/types";
import LZString from "lz-string";
import { useBoardActions, useEventActions } from "./useActions";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type TCoords = { x: number, y: number };

class CanvasDrawEvents {
    canvasContainerRef: MutableRefObject<TContainer<DisplayObject> | null>;
    currentCoords: TCoords = { x: 0, y: 0 };
    firstCoords: TCoords = { x: 0, y: 0 };
    graph: Graphics | null = null;
    setMouseDown: ActionCreatorWithPayload<boolean, "events/setMouseDown">;
    app: Application<ICanvas> | null;
    setBoardData: ActionCreatorWithPayload<BoardData | null, "board/setBoardData">;
    minX: number = 0;
    minY: number = 0;

    constructor(
        canvasContainerRef: MutableRefObject<TContainer<DisplayObject> | null>,
        setMouseDown: ActionCreatorWithPayload<boolean, "events/setMouseDown">,
        app: Application<ICanvas> | null,
        setBoardData: ActionCreatorWithPayload<BoardData | null, "board/setBoardData">
    ) {
        this.canvasContainerRef = canvasContainerRef;
        this.setMouseDown = setMouseDown;
        this.app = app;
        this.setBoardData = setBoardData;
    }

    stageDown = (e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>, tool: TTool, fullscreen: boolean) => {
        if (!this.canvasContainerRef.current || tool !== "pencil" || !fullscreen || e.button !== 0 || !this.app) return;

        this.setMouseDown(true);

        const graph = new Graphics();

        this.canvasContainerRef.current.addChild(graph as DisplayObject);

        const y = e.clientY + 24;
        const x = e.clientX + 3;

        this.minX = x;
        this.minY = y;

        graph.beginFill("red", 1);
        graph.drawCircle(x, y, 2 / 2);

        this.graph = graph;

        this.currentCoords = { x: x, y: y };
        this.firstCoords = { x: x, y: y };
    }

    stageMove = (e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
        if (!this.graph) return;

        const y = e.clientY + 24;
        const x = e.clientX + 3;

        if (x < this.minX) this.minX = x;
        if (y < this.minY) this.minY = y;

        this.graph.drawCircle(x, y, 2 / 2);

        this.graph.lineStyle(2, "red", 1);
        this.graph.moveTo(this.currentCoords.x, this.currentCoords.y);
        this.graph.lineTo(x, y);
        this.graph.lineStyle(0);

        this.currentCoords = { x: x, y: y };
    }

    stageOut = async () => {
        if (!this.graph) return;

        const blob = await this.app?.renderer.extract.base64(this.graph as DisplayObject);

        if (blob) {
            const compressBlob = LZString.compress(blob);

            const position: TCoords = { x: this.minX, y: this.minY };
        };

        this.setMouseDown(false);
        this.graph.destroy();
        this.graph = null;
    }
};

const useCanvasDrawEvents = (canvasContainerRef: MutableRefObject<TContainer<DisplayObject> | null>, app: Application<ICanvas> | null) => {
    const { setBoardData } = useBoardActions();
    const { setMouseDown } = useEventActions();

    return useMemo(() => new CanvasDrawEvents(canvasContainerRef, setMouseDown, app, setBoardData), [app]);
};

export default useCanvasDrawEvents;