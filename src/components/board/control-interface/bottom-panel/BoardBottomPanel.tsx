import { FC, useContext } from 'react';
import boardStyles from '../../Board.module.css';
import { Platform, usePlatform } from '@vkontakte/vkui';
import NotVKCOMPanel from './NotVKCOMPanel';
import VKCOMPanel from './VKCOMPanel';
import { useBoardActions, useCanvasActions } from '../../../../hooks/useActions';
import { boardContext } from '../../Board';
import { TBoardContext } from '../../../../config/types';

const BoardBottomPanel: FC = () => {

    const platform = usePlatform();

    const boardContainer = document.querySelector(`.${boardStyles.boardContainer}`) as HTMLElement;

    const { setFullscreen } = useBoardActions();

    const { setWindowSize } = useCanvasActions();

    const { window: { boardWindow } } = useContext(boardContext) as TBoardContext;

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) setFullscreen(false);
        else setFullscreen(true);
    });

    const onFullScreen = () => {
        boardContainer.requestFullscreen();

        setTimeout(() => {
            setWindowSize({ w: boardWindow?.clientWidth as number, h: boardWindow?.clientHeight as number });
        }, 100);
    };

    const offFullScreen = () => {
        document.exitFullscreen();
        
        setTimeout(() => {
            setWindowSize({ w: boardWindow?.clientWidth as number + 15, h: boardWindow?.clientHeight as number });
        }, 100);
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