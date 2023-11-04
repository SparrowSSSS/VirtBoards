import { FC, createContext, SetStateAction, useRef, useEffect, useState, ReactNode } from 'react';
import styles from "./Board.module.css";
import { BoardData, TBoardContext } from '../../config/types';
import BoardBottomPanel from './bottom-panel/BoardBottomPanel';
import Grid from './grid/Grid';
import BoardModal from './board-modals/BoardModal';

export const boardContext = createContext<TBoardContext | undefined>(undefined);

interface Props {
    fullScreenBoard: boolean,
    boardData?: BoardData,
    setBoardData: (value: SetStateAction<BoardData | undefined>) => void
    setFullScreenBoard: (value: SetStateAction<boolean>) => void
};

export const Board: FC<Props> = ({ fullScreenBoard, setBoardData, setFullScreenBoard, boardData }) => {

    const boardCanvasRef = useRef<HTMLDivElement>(null);

    const boardRef = useRef<HTMLDivElement>(null);

    const [boardCanvasSize, setBoardCanvasSize] = useState<{ width: number, height: number }>();

    const [boardModal, setBoardModal] = useState<ReactNode | null>(null);

    useEffect(() => {

        if (boardCanvasRef.current && boardRef.current) {
            const rect = boardCanvasRef.current.getBoundingClientRect();

            if((boardData?.components.length as number) === 0) {
                boardRef.current.scrollBy(Math.ceil(rect.width / 2), Math.ceil(rect.height / 2));
            };

            setBoardCanvasSize({ width: rect.width, height: rect.height });
        };

    }, []);

    return (
        <boardContext.Provider value={{ fullScreenBoard, setFullScreenBoard, boardData, setBoardData, setBoardModal }}>
            <div ref={boardRef} className={styles.boardWindow}>
                {boardModal && fullScreenBoard ? <BoardModal>{boardModal}</BoardModal> : null}
                <div className={styles.boardCanvas} ref={boardCanvasRef}>
                    {boardData?.settings.grid ? <Grid boardCanvasSize={{ width: boardCanvasSize?.width as number, height: boardCanvasSize?.height as number}} /> : null}
                </div>
                <BoardBottomPanel />
            </div>
        </boardContext.Provider>
    )
};

export default Board;