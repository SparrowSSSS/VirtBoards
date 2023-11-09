import { FC, useContext} from 'react';
import { TBoardContext } from '../../../config/types';
import { boardContext } from '../Board';
import boardStyles from '../Board.module.css';
import { Platform, usePlatform } from '@vkontakte/vkui';
import NotVKCOMPanel from './NotVKCOMPanel';
import VKCOMPanel from './VKCOMPanel';

const BoardBottomPanel: FC = () => {

    const { fullScreenBoard, setFullScreenBoard, boardData, setBoardModal } = useContext(boardContext) as TBoardContext;

    const platform = usePlatform();

    const boardWindow = document.querySelector(`.${boardStyles.boardWindow}`) as HTMLElement;

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) setFullScreenBoard(false);
        else setFullScreenBoard(true);
    });

    const onFullScreen = () => {
        boardWindow.requestFullscreen();
    };

    const offFullScreen = () => {
        document.exitFullscreen();
    };

    return (
        <>
            {platform !== Platform.VKCOM
                ? <NotVKCOMPanel offFullScreen={offFullScreen} onFullScreen={onFullScreen} />
                : <VKCOMPanel offFullScreen={offFullScreen} onFullScreen={onFullScreen} />
            }
        </>
    )
};

export default BoardBottomPanel;