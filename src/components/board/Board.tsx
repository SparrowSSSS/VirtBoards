import { FC, CSSProperties, useEffect, useRef, useState } from 'react';
import styles from "./Board.module.css";
import { SplitLayout } from '@vkontakte/vkui';
import ControlInterface from './control-interface/ControlInterface';
import BoardWindow from './board-window/BoardWindow';
import globalConfig from '../../config/global';
import useBoardData from '../../hooks/useBoardData';
import useBoardEvents from '../../hooks/useBoardEvents';
import { useBoardSelector, useEventsSelector } from '../../hooks/useStoreSelector';
import BoardModals from '../../modals/BoardModals';

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

    const boardEvents = useBoardEvents();

    const updateBoardData = useBoardData().updateBridge;

    const boardWindow = useBoardSelector().boardWindow as HTMLDivElement | null;
    const { boardData, activeCursor, activeTool, boardPopout } = useBoardSelector();

    const { mouseDown } = useEventsSelector();

    useEffect(() => {
        if (boardContainerRef.current && boardWindow) {
            boardContainerRef.current.addEventListener("wheel", e => e.preventDefault());
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
            <BoardWindow />
            <div className={styles.modalInterface}>
                <SplitLayout modal={<BoardModals />} popout={boardPopout}></SplitLayout>
            </div>
            <ControlInterface />
        </div>
    )
};

export default Board;