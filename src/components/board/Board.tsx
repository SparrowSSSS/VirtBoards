import { FC, createContext, SetStateAction, useRef, useEffect, useState } from 'react';
import styles from "./Board.module.css";
import { BoardData, TBoardContext, TModal } from '../../config/types';
import BoardBottomPanel from './bottom-panel/BoardBottomPanel';
import Grid from './grid/Grid';
import BoardModal from './board-modals/BoardModal';
import { SplitLayout } from '@vkontakte/vkui';
import Canvas from './canvas/Canvas';
import canvasConfig from '../../config/canvas';

export const boardContext = createContext<TBoardContext | undefined>(undefined);

interface Props {
    fullScreenBoard: boolean,
    boardData?: BoardData,
    setBoardData: (value: SetStateAction<BoardData | undefined>) => void
    setFullScreenBoard: (value: SetStateAction<boolean>) => void
};

export const Board: FC<Props> = ({ fullScreenBoard, setBoardData, setFullScreenBoard, boardData }) => {

    const boardRef = useRef<HTMLDivElement>(null);

    const [boardModal, setBoardModal] = useState<TModal | null>(null);

    useEffect(() => {

        if (boardRef.current) {
            if ((boardData?.components.length as number) === 0) {
                boardRef.current.scrollBy(Math.ceil(canvasConfig.width / 2), Math.ceil(canvasConfig.height / 2));
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
            <div ref={boardRef} className={styles.boardWindow}>
                {/**
                 * <div className={styles.boardCanvas} ref={boardCanvasRef} onClick={e => console.log(e)}>
                    {boardData?.settings.grid ? <Grid boardCanvasSize={{ width: boardCanvasSize?.width as number, height: boardCanvasSize?.height as number }} /> : null}
                </div>
                 */}
                <Canvas />
                <div className={styles.controlInterface}>
                    <SplitLayout modal={<BoardModal />}></SplitLayout>
                </div>
                <BoardBottomPanel />
            </div>
        </boardContext.Provider>
    )
};

export default Board;