import { FC, CSSProperties, useEffect, useRef, useState, createContext, useContext } from 'react';
import styles from "./Board.module.css";
import { SplitLayout } from '@vkontakte/vkui';
import ControlInterface from './control-interface/ControlInterface';
import BoardWindow from './board-window/BoardWindow';
import globalConfig from '../../config/global';
import useBoardData from '../../hooks/useBoardData';
import useBoardEvents from '../../hooks/useBoardEvents';
import { useBoardSelector, useEventsSelector } from '../../hooks/useStoreSelector';
import BoardModals from '../../modals/BoardModals';
import { TBoardContext } from '../../config/types';
import useGetBoardContext from '../../hooks/useGetBoardContext';
import { useCanvasActions } from '../../hooks/useActions';

export const boardContext = createContext<TBoardContext | null>(null);

const boardContainerStyles: CSSProperties = {
    width: "90%",
    height: "500px",
    position: "relative",
    backgroundColor: "transparent",
    margin: "15px auto"
}

export const Board: FC = () => {

    const [updateInterval, setUpdateInterval] = useState<NodeJS.Timer>();

    const boardContainerRef = useRef<HTMLDivElement | null>(null);

    const updateBoardData = useBoardData().updateBridge;

    const { boardData, activeCursor, activeTool } = useBoardSelector();

    const { mouseDown } = useEventsSelector();

    const { setScroll } = useCanvasActions();

    const boardContextValue = useGetBoardContext();

    const { window: { boardWindow }, popout: { boardPopout } } = boardContextValue;

    const boardEvents = useBoardEvents(boardWindow);

    useEffect(() => {
        if (boardContainerRef.current && boardWindow) {
            boardContainerRef.current.addEventListener("wheel", e => e.preventDefault());
            boardWindow.addEventListener("scroll", () => setScroll({ x: boardWindow.scrollLeft, y: boardWindow.scrollTop }));
        };
    }, [boardContainerRef, boardWindow]);

    useEffect(() => {
        if (!boardData) return;

        const interval = setInterval(() => {
            updateBoardData.mutate(boardData);
        }, globalConfig.updateBoardDataInterval);

        if (updateInterval) clearInterval(updateInterval);

        setUpdateInterval(interval);
    }, [boardData]);

    return (
        <div
            className={styles.boardContainer}
            style={boardContainerStyles}
            onMouseDown={e => boardEvents.mouseDown(e, activeCursor, mouseDown)}
            onMouseMove={boardEvents.mouseMove}
            onMouseUp={boardEvents.mouseOut}
            onMouseOut={boardEvents.mouseOut}
            onWheel={e => boardEvents.wheel(e, mouseDown, activeTool)}
            ref={boardContainerRef}
        >
            <boardContext.Provider value={boardContextValue}>
                <BoardWindow />
                <div className={styles.modalInterface}>
                    <SplitLayout modal={<BoardModals />} popout={boardPopout}></SplitLayout>
                </div>
                <ControlInterface />
            </boardContext.Provider>
        </div>
    )
};

export default Board;