import { MutableRefObject, MouseEvent, useMemo } from "react";
import { Application, Container as TContainer, DisplayObject, Graphics, ICanvas } from "pixi.js";
import { BoardComponent, BoardData, setStateF, TCoords, TScroll, TTool } from "../config/types";
import LZString from "lz-string";
import { useBoardActions, useEventActions } from "./useActions";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

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
    lineWidth: number = 2;
    cursorMarginY: number = 24;
    cursorMarginX: number = 3;
    color: string;

    constructor(
        canvasContainerRef: MutableRefObject<TContainer<DisplayObject> | null>,
        setMouseDown: ActionCreatorWithPayload<boolean, "events/setMouseDown">,
        app: Application<ICanvas> | null,
        setBoardData: ActionCreatorWithPayload<BoardData | null, "board/setBoardData">,
        color: string
    ) {
        this.canvasContainerRef = canvasContainerRef;
        this.setMouseDown = setMouseDown;
        this.app = app;
        this.setBoardData = setBoardData;
        this.color = color;
    }

    stageDown = (e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>, tool: TTool, fullscreen: boolean) => {
        if (!this.canvasContainerRef.current || tool !== "pencil" || !fullscreen || e.button !== 0 || !this.app) return;

        this.setMouseDown(true);

        const graph = new Graphics();

        this.canvasContainerRef.current.addChild(graph as DisplayObject);

        const y = e.clientY + this.cursorMarginY;
        const x = e.clientX + this.cursorMarginX;

        this.minX = x;
        this.minY = y;

        graph.beginFill(this.color, 1);
        graph.drawCircle(x, y, this.lineWidth / 2);

        this.graph = graph;

        this.currentCoords = { x: x, y: y };
        this.firstCoords = { x: x, y: y };
    }

    stageMove = (e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>, setRender: setStateF<boolean>) => {
        if (!this.graph) return;

        setRender(p => p ? false : true);

        const y = e.clientY + this.cursorMarginY;
        const x = e.clientX + this.cursorMarginX;

        if (x < this.minX) this.minX = x;
        if (y < this.minY) this.minY = y;

        this.graph.drawCircle(x, y, this.lineWidth / 2);

        this.graph.lineStyle(this.lineWidth, this.color, 1);
        this.graph.moveTo(this.currentCoords.x, this.currentCoords.y);
        this.graph.lineTo(x, y);
        this.graph.lineStyle(0);

        this.currentCoords = { x: x, y: y };
    }

    stageOut = async (boardData: BoardData, scroll: TScroll) => {
        if (!this.graph) return;

        const blob = await this.app?.renderer.extract.base64(this.graph as DisplayObject);

        if (blob) {
            const compressBlob = LZString.compress(blob);

            const position: TCoords = { x: this.minX + scroll.x, y: this.minY + scroll.y };

            const boardComponents = boardData.components;

            let id;

            if (boardComponents.length === 0) {
                id = 0;
            } else {
                id = boardComponents[boardComponents.length - 1].id + 1;
            };

            const newComponent: BoardComponent = { id: id, options: { compressUrl: compressBlob, position: position } };

            const components = [...boardComponents, newComponent];

            this.setBoardData({ ...boardData, components: components });

        };

        this.setMouseDown(false);
        this.graph.destroy();
        this.graph = null;
    }
};

const useCanvasDrawEvents = (canvasContainerRef: MutableRefObject<TContainer<DisplayObject> | null>, app: Application<ICanvas> | null) => {
    const { setBoardData } = useBoardActions();
    const { setMouseDown } = useEventActions();

    const color = "red";

    return useMemo(() => new CanvasDrawEvents(canvasContainerRef, setMouseDown, app, setBoardData, color), [app, color]);
};

export default useCanvasDrawEvents;