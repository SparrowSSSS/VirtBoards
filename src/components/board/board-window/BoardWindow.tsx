import { FC, useEffect } from 'react';
import canvasConfig from '../../../config/canvas';
import elementsId from '../../../config/elementsId';
import { useBoardActions } from '../../../hooks/useActions';
import { useBoardSelector } from '../../../hooks/useStoreSelector';
import Canvas from '../canvas/Canvas';
import styles from "./BoardWindow.module.css";

const BoardWindow: FC = () => {

    const { setBoardWindow } = useBoardActions();
    const { boardData } = useBoardSelector();

    useEffect(() => {
        const boardWindow = document.getElementById(elementsId.boardWindow) as HTMLDivElement;

        if (boardWindow) {
            setBoardWindow(boardWindow);

            if (boardData?.components.length === 0) {
                boardWindow.scrollBy(Math.ceil(canvasConfig.width / 2), Math.ceil(canvasConfig.height / 2));
            };
        };

    }, []);

    return (
        <div className={styles.boardWindow} id={elementsId.boardWindow}>
            <div style={{ width: canvasConfig.width, height: canvasConfig.height }} />
            <Canvas />
        </div>
    )
};

export default BoardWindow;