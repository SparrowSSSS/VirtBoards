import "@pixi/events";
import { Container, Stage } from '@pixi/react';
import { Application, Container as TContainer, DisplayObject, ICanvas } from "pixi.js";
import { createContext, FC, useContext, useEffect, useRef, useState, useMemo } from 'react';
import canvasConfig from '../../../config/canvas';
import { TBoardContext, TCanvasContext, TStateDataCanvas } from '../../../config/types';
import getCursor from "../../../utils/getBoardCursor";
import { boardContext } from '../Board';
import styles from "./Canvas.module.css";
import CanvasDrawEvents from "./canvasDrawEvents";
import { checkChanges } from "./canvasUtils";
import Grid from './grid/Grid';

export const canvasContext = createContext<TCanvasContext | null>(null);

const Canvas: FC = () => {

    const [stateData, setStateData] = useState<TStateDataCanvas>({ scroll: { x: 0, y: 0 }, windowSize: { x: 0, y: 0 } });

    const [render, setRender] = useState<boolean>(false);

    const canvasContainerRef = useRef<TContainer<DisplayObject> | null>(null);

    const [app, setApp] = useState<Application<ICanvas> | null>(null);

    const { data: { boardData, setBoardData }, fullscreen: { fullScreenBoard }, cursor: { activeCursor }, window: { boardWindow }, tools: { activeTool }, events: {down: {setMouseDown}} } = useContext(boardContext) as TBoardContext;

    const draw = useMemo(() => new CanvasDrawEvents(canvasContainerRef, setMouseDown, app, setBoardData), [canvasContainerRef, app]);

    useEffect(() => {
        if (boardWindow && checkChanges(boardWindow, stateData)) {
            setStateData({ scroll: { x: boardWindow.scrollLeft, y: boardWindow.scrollTop }, windowSize: { x: boardWindow.clientWidth, y: boardWindow.clientHeight } });
        };
    }, [render]);

    useEffect(() => {
        const r = { render: render };
        setInterval(() => {
            setRender(!r.render);
            r.render = !r.render;
        }, 25);
    }, []);

    return (
        <Stage
            style={{ cursor: getCursor(fullScreenBoard, activeCursor) }}
            width={stateData.windowSize.x}
            height={stateData.windowSize.y}
            options={{ backgroundColor: canvasConfig.color }}
            className={styles.boardCanvas}
            raf={false}
            renderOnComponentChange={true}
            onMouseDown={e => draw.stageDown(e, activeTool, fullScreenBoard)}
            onMouseMove={draw.stageMove}
            onMouseUp={draw.stageOut}
            onMouseOut={draw.stageOut}
            onMount={setApp}
        >
            <canvasContext.Provider value={{ data: stateData }}>
                <Container ref={canvasContainerRef}>
                    {boardData?.settings.grid ? <Grid /> : null}
                </Container>
            </canvasContext.Provider>
        </Stage>
    )
};

export default Canvas;