import "@pixi/events";
import { Container, Stage } from '@pixi/react';
import { Application, Container as TContainer, DisplayObject, ICanvas } from "pixi.js";
import { FC, useContext, useEffect, useRef, useState } from 'react';
import canvasConfig from '../../../config/canvas';
import { useCanvasActions } from "../../../hooks/useActions";
import useCanvasDrawEvents from "../../../hooks/useCanvasDrawEvents";
import { useBoardSelector, useCanvasSelector } from "../../../hooks/useStoreSelector";
import getCursor from "../../../utils/getBoardCursor";
import styles from "./Canvas.module.css";
import Grid from './grid/Grid';
import { Provider } from "react-redux";
import store from "../../../app/store";
import { boardContext } from "../Board";
import { BoardData, TBoardContext } from "../../../config/types";
import GraphComponent from "./graph-component/GraphComponent";

const Canvas: FC = () => {

    const [render, setRender] = useState<boolean>(false);

    const canvasContainerRef = useRef<TContainer<DisplayObject> | null>(null);

    const [app, setApp] = useState<Application<ICanvas> | null>(null);

    const { scroll, windowSize } = useCanvasSelector();

    const { setWindowSize } = useCanvasActions();

    const { fullscreen, activeCursor, activeTool, boardData } = useBoardSelector();

    const { window: { boardWindow } } = useContext(boardContext) as TBoardContext;

    const draw = useCanvasDrawEvents(canvasContainerRef, app);

    useEffect(() => {
        if (boardWindow) {
            setWindowSize({ w: boardWindow.clientWidth, h: boardWindow.clientHeight });
        };
    }, [boardWindow]);

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
            onMouseMove={e => draw.stageMove(e, setRender)}
            onMouseUp={() => draw.stageOut(boardData as BoardData, scroll)}
            onMouseOut={() => draw.stageOut(boardData as BoardData, scroll)}
            onMount={setApp}
        >
            <Provider store={store}>
                <Container ref={canvasContainerRef}>
                    {boardData?.settings.grid ? <Grid /> : null}

                    {
                        boardData?.components.map(component => (
                            <GraphComponent key={component.id} component={component} />
                        ))
                    }
                </Container>
            </Provider>
        </Stage>
    )
};

export default Canvas;