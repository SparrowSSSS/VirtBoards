import { FC, createContext, SetStateAction, useState, CSSProperties, useEffect, useMemo, useRef } from 'react';
import styles from "./Board.module.css";
import { BoardData, TBoardContext, TModal, TTool } from '../../config/types';
import BoardModal from './board-modals/BoardModal';
import { SplitLayout } from '@vkontakte/vkui';
import ControlInterface from './control-interface/ControlInterface';
import BoardWindow from './board-window/BoardWindow';
import cursors from '../../config/cursors';
import BoardEvents from './boartContainerEvents';
import globalConfig from '../../config/global';
import useBoardData from '../../hooks/useBoardData';

export const boardContext = createContext<TBoardContext | undefined>(undefined);

interface Props {
    fullScreenBoard: boolean,
    data: BoardData,
    setFullScreenBoard: (value: SetStateAction<boolean>) => void
};

const boardContainerStyles: CSSProperties = {
    width: "90%",
    height: "500px",
    position: "relative",
    backgroundColor: "transparent",
    margin: "15px auto"
}

export const Board: FC<Props> = ({ fullScreenBoard, setFullScreenBoard, data }) => {

    const [boardModal, setBoardModal] = useState<TModal | null>(null);

    const [boardData, setBoardData] = useState<BoardData>(data);

    const [activeTool, setActiveTool] = useState<TTool>("cursor");

    const [activeCursor, setActiveCursor] = useState(cursors.cursor);

    const [boardWindow, setBoardWindow] = useState<HTMLDivElement | null>(null);

    const [mouseDown, setMouseDown] = useState(false);

    const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout | null>(null);

    const boardContainerRef = useRef<HTMLDivElement | null>(null);

    const boardEvents = useMemo(() => new BoardEvents(boardWindow, setActiveCursor), [boardWindow]);

    const updateBoardData = useBoardData().mutation;

    useEffect(() => {
        if (boardContainerRef.current && boardWindow) {
            boardContainerRef.current.addEventListener("wheel", e => e.preventDefault());
        };
    }, [boardContainerRef, boardWindow]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateBoardData.mutate(boardData);
        }, globalConfig.updateBoardDataInterval);

        if (updateInterval) clearInterval(updateInterval);

        setUpdateInterval(interval);
    }, [boardData]);

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
        },

        events: {
            down: { mouseDown, setMouseDown }
        }
    };

    return (
        <div
            className={styles.boardContainer}
            style={boardContainerStyles}
            onMouseDown={e => boardEvents.onMouseDown(e, activeCursor, mouseDown)}
            onMouseMove={boardEvents.mouseMove}
            onMouseUp={boardEvents.mouseOut}
            onMouseOut={boardEvents.mouseOut}
            onWheel={e => boardEvents.onWheel(e, mouseDown, activeTool)}
            ref={boardContainerRef}
        >
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