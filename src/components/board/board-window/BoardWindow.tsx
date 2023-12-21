import { FC, useContext, useEffect } from 'react';
import canvasConfig from '../../../config/canvas';
import elementsId from '../../../config/elementsId';
import { TBoardContext } from '../../../config/types';
import { useBoardSelector } from '../../../hooks/useStoreSelector';
import { boardContext } from '../Board';
import Canvas from '../canvas/Canvas';
import styles from "./BoardWindow.module.css";

const BoardWindow: FC = () => {

    const { window: { boardWindow, setBoardWindow } } = useContext(boardContext) as TBoardContext;

    const { boardData } = useBoardSelector();

    useEffect(() => {
        if (boardWindow) {
            if (boardData?.components.length === 0) {
                boardWindow.scrollBy(Math.ceil(canvasConfig.width / 2), Math.ceil(canvasConfig.height / 2));
            }
        };
    }, [boardWindow])

    useEffect(() => {
        const bw = document.getElementById(elementsId.boardWindow) as HTMLDivElement;

        if (bw) setBoardWindow(bw);
    }, []);

    return (
        <div className={styles.boardWindow} id={elementsId.boardWindow}>
            <div style={{ width: canvasConfig.width, height: canvasConfig.height }} />
            <Canvas />
        </div>
    )
};

export default BoardWindow;