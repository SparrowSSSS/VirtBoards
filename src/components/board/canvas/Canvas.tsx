import { Container, Stage } from '@pixi/react';
import { createContext, FC, useContext, useEffect, useState, WheelEvent } from 'react';
import canvasConfig from '../../../config/canvas';
import cursors from '../../../config/cursors';
import { TBoardContext, TCanvasContext, TStateDataCanvas } from '../../../config/types';
import { boardContext } from '../Board';
import styles from "./Canvas.module.css";
import Grid from './grid/Grid';

export const canvasContext = createContext<TCanvasContext | null>(null);

const Canvas: FC = () => {

    const [stateData, setStateData] = useState<TStateDataCanvas>({ scroll: { x: 0, y: 0 }, windowSize: { width: 0, height: 0 } });

    const [render, setRender] = useState<boolean>(false);

    const { data: { boardData }, fullscreen: { fullScreenBoard }, cursor: { activeCursor }, window: { boardWindow } } = useContext(boardContext) as TBoardContext;

    useEffect(() => {
        if (boardWindow) {
            setStateData({ scroll: { x: boardWindow.scrollLeft, y: boardWindow.scrollTop }, windowSize: { width: boardWindow.clientWidth, height: boardWindow.clientHeight } });
        };
    }, [render]);

    useEffect(() => {
        const r = {render: render};
        setInterval(() => {
            setRender(!r.render);
            r.render = !r.render;
        }, 25);
    }, []);

    const getCursor = () => {
        if (fullScreenBoard) {
            return activeCursor;
        } else {
            if (activeCursor !== cursors.pencil && activeCursor !== cursors.eraser) return activeCursor;
            else return cursors.cursor;
        };
    };

    return (
        <Stage
            style={{ cursor: getCursor() }}
            width={stateData.windowSize.width}
            height={stateData.windowSize.height}
            options={{ backgroundColor: canvasConfig.color }}
            className={styles.boardCanvas}
            
        >
            <canvasContext.Provider value={{ data: stateData }}>
                <Container>
                    {boardData?.settings.grid ? <Grid /> : null}
                </Container>
            </canvasContext.Provider>
        </Stage>
    )
};

export default Canvas;