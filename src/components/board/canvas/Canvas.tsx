import "@pixi/events";
import { Container, Stage } from '@pixi/react';
import { Application, Container as TContainer, DisplayObject, ICanvas } from "pixi.js";
import { FC, useEffect, useRef, useState } from 'react';
import canvasConfig from '../../../config/canvas';
import { useCanvasActions } from "../../../hooks/useActions";
import useCanvasDrawEvents from "../../../hooks/useCanvasDrawEvents";
import { useBoardSelector, useCanvasSelector } from "../../../hooks/useStoreSelector";
import getCursor from "../../../utils/getBoardCursor";
import styles from "./Canvas.module.css";
import { checkChanges } from "./canvasUtils";
import Grid from './grid/Grid';
import { Provider } from "react-redux";
import store from "../../../app/store";

const Canvas: FC = () => {

    const [render, setRender] = useState<boolean>(false);

    const canvasContainerRef = useRef<TContainer<DisplayObject> | null>(null);

    const [app, setApp] = useState<Application<ICanvas> | null>(null);

    const { scroll, windowSize } = useCanvasSelector();

    const { setScroll, setWindowSize } = useCanvasActions();

    const { boardWindow, fullscreen, activeCursor, activeTool, boardData } = useBoardSelector();

    const draw = useCanvasDrawEvents(canvasContainerRef, app);

    useEffect(() => {
        if (boardWindow && checkChanges(boardWindow, { scroll, windowSize })) {
            setScroll({ x: boardWindow.scrollLeft, y: boardWindow.scrollTop });
            setWindowSize({ w: boardWindow.clientWidth, h: boardWindow.clientHeight });
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
            style={{ cursor: getCursor(fullscreen, activeCursor) }}
            width={windowSize.w}
            height={windowSize.h}
            options={{ backgroundColor: canvasConfig.color }}
            className={styles.boardCanvas}
            raf={false}
            renderOnComponentChange={true}
            onMouseDown={e => draw.stageDown(e, activeTool, fullscreen)}
            onMouseMove={draw.stageMove}
            onMouseUp={draw.stageOut}
            onMouseOut={draw.stageOut}
            onMount={setApp}
        >
            <Provider store={store}>
                <Container ref={canvasContainerRef}>
                    {boardData?.settings.grid ? <Grid /> : null}
                </Container>
            </Provider>
        </Stage>
    )
};

export default Canvas;