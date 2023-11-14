import { FC, createContext, SetStateAction, useState, CSSProperties, useEffect, WheelEvent } from 'react';
import styles from "./Board.module.css";
import { BoardData, TBoardContext, TModal, TTool } from '../../config/types';
import BoardModal from './board-modals/BoardModal';
import { SplitLayout } from '@vkontakte/vkui';
import ControlInterface from './control-interface/ControlInterface';
import BoardWindow from './board-window/BoardWindow';
import cursors from '../../config/cursors';
import addBoardEvents from './boartContainerEvents';
import BoardEvents from './boartContainerEvents';

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

    const [activeTool, setActiveTool] = useState<TTool>("cursor");

    const [activeCursor, setActiveCursor] = useState(cursors.cursor);

    const [boardWindow, setBoardWindow] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const boardContainer = document.querySelector(`.${styles.boardContainer}`) as HTMLDivElement;

        if (boardContainer && boardWindow) {
            new BoardEvents(boardWindow, boardContainer, setActiveCursor).addEvents();
        };
    }, [boardWindow]);

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
        },

        tools: {
            activeTool,
            setActiveTool
        },

        cursor: {
            activeCursor,
            setActiveCursor
        },

        window: {
            boardWindow,
            setBoardWindow
        }
    };

    return (
        <div className={styles.boardContainer} style={boardContainerStyles} >
            <boardContext.Provider value={boardContextValue}>
                <BoardWindow />
                <div className={styles.modalInterface}>
                    <SplitLayout modal={<BoardModal />}></SplitLayout>
                </div>
                <ControlInterface />
            </boardContext.Provider>
        </div>
    )
};

export default Board;