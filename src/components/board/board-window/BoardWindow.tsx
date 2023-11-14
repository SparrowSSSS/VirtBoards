import { FC, useContext, useEffect } from 'react';
import canvasConfig from '../../../config/canvas';
import cursors from '../../../config/cursors';
import elementsId from '../../../config/elementsId';
import { TBoardContext } from '../../../config/types';
import { boardContext } from '../Board';
import Canvas from '../canvas/Canvas';
import styles from "./BoardWindow.module.css";

const BoardWindow: FC = () => {

    const {data: {boardData}, window: {setBoardWindow} } = useContext(boardContext) as TBoardContext;

    useEffect(() => {
        const boardWindow = document.getElementById(elementsId.boardWindow) as HTMLDivElement;

        if (boardWindow) {
            setBoardWindow(boardWindow);

            if ((boardData?.components.length as number) === 0) {
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