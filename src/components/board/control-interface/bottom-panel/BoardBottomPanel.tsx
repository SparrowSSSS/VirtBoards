import { FC, useContext } from 'react';
import boardStyles from '../../Board.module.css';
import { Platform, usePlatform } from '@vkontakte/vkui';
import NotVKCOMPanel from './NotVKCOMPanel';
import VKCOMPanel from './VKCOMPanel';
import { useBoardActions } from '../../../../hooks/useActions';

const BoardBottomPanel: FC = () => {

    const platform = usePlatform();

    const boardContainer = document.querySelector(`.${boardStyles.boardContainer}`) as HTMLElement;

    const { setFullscreen } = useBoardActions();

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) setFullscreen(false);
        else setFullscreen(true);
    });

    const onFullScreen = () => {
        boardContainer.requestFullscreen();
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