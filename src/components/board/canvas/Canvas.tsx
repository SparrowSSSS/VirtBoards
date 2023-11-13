import { Container, Stage } from '@pixi/react';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import canvasConfig from '../../../config/canvas';
import elementsId from '../../../config/elementsId';
import { TBoardContext, TCanvasContext, TStateDataCanvas } from '../../../config/types';
import { boardContext } from '../Board';
import styles from "./Canvas.module.css";
import Grid from './grid/Grid';

export const canvasContext = createContext<TCanvasContext | null>(null);

const Canvas: FC = () => {

    const [boardWindow, setBoardWindow] = useState<HTMLElement>();
    const [stateData, setStateData] = useState<TStateDataCanvas>({ scroll: { x: 0, y: 0 }, windowSize: { width: 0, height: 0 } });

    const { data: { boardData } } = useContext(boardContext) as TBoardContext;

    useEffect(() => {
        const bWindow = document.getElementById(elementsId.boardWindow);

        if (bWindow) {
            setBoardWindow(bWindow);
        };
    }, []);

    useEffect(() => {
        setInterval(() => {
            if (boardWindow) {
                setStateData({ scroll: { x: boardWindow.scrollLeft, y: boardWindow.scrollTop }, windowSize: { width: boardWindow.clientWidth, height: boardWindow.clientHeight } });
            };
        }, 10);
    }, [boardWindow]);

    return (
        <Stage width={stateData.windowSize.width} height={stateData.windowSize.height} options={{ backgroundColor: canvasConfig.color }} className={styles.boardCanvas} id={elementsId.canvasStage}>
            <canvasContext.Provider value={{ data: stateData }}>
                <Container>
                    {boardData?.settings.grid ? <Grid /> : null}
                </Container>
            </canvasContext.Provider>
        </Stage>
    )
};

export default Canvas;