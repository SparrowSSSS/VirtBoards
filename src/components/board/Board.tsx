import { FC, createContext, SetStateAction, useEffect, useState, CSSProperties } from 'react';
import styles from "./Board.module.css";
import { BoardData, TBoardContext, TModal } from '../../config/types';
import BoardBottomPanel from './bottom-panel/BoardBottomPanel';
import BoardModal from './board-modals/BoardModal';
import { SplitLayout } from '@vkontakte/vkui';
import Canvas from './canvas/Canvas';
import canvasConfig from '../../config/canvas';
import elementsId from '../../config/elementsId';

export const boardContext = createContext<TBoardContext | undefined>(undefined);

interface Props {
    fullScreenBoard: boolean,
    boardData?: BoardData,
    setBoardData: (value: SetStateAction<BoardData | undefined>) => void
    setFullScreenBoard: (value: SetStateAction<boolean>) => void
};

const boardContainerStyles: CSSProperties = {
    width: "90%",
    height: "500px",
    position: "relative",
    backgroundColor: "transparent",
    margin: "15px auto"
}

export const Board: FC<Props> = ({ fullScreenBoard, setBoardData, setFullScreenBoard, boardData }) => {

    const [boardModal, setBoardModal] = useState<TModal | null>(null);

    useEffect(() => {
        const boardWindow = document.getElementById(elementsId.boardWindow);

        if (boardWindow) {
            if ((boardData?.components.length as number) === 0) {
                boardWindow.scrollBy(Math.ceil(canvasConfig.width / 2), Math.ceil(canvasConfig.height / 2));
            };
        };

    }, []);

    const boardContextValue: TBoardContext = {
        modals: {
            boardModal,
            setBoardModal
        },

        data: {
            boardData,
            setBoardData
        },

        fullscreen: {
            fullScreenBoard,
            setFullScreenBoard
        }
    }

    return (
        <boardContext.Provider value={boardContextValue}>
            <div className={styles.boardContainer} style={boardContainerStyles}>
                <div className={styles.boardWindow} id={elementsId.boardWindow}>
                    <div style={{ width: canvasConfig.width, height: canvasConfig.height, position: "relative", zIndex: 1 }} />
                    <Canvas />
                </div>
                <div className={styles.controlInterface}>
                    <SplitLayout modal={<BoardModal />}></SplitLayout>
                </div>
                <BoardBottomPanel />
            </div>
        </boardContext.Provider>
    )
};

export default Board;