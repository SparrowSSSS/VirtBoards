import { Icon24Fullscreen, Icon24FullscreenExit } from '@vkontakte/icons';
import { FC, useContext } from 'react';
import { TBoardContext } from '../../../config/types';
import { boardContext } from '../Board';
import styles from "./BoardBottomPanel.module.css";

interface Props {
    onFullScreen: () => void,
    offFullScreen: () => void
};

const NotVKCOMPanel: FC<Props> = ({ onFullScreen, offFullScreen }) => {

    const { fullscreen: {fullScreenBoard} } = useContext(boardContext) as TBoardContext;

    return (
        <div className={`${styles.boardBottomPanel} ${fullScreenBoard ? styles.boardBottomPanelFullScreenTl : ""}`}>
            <div className={styles.bottomPanelButton} onClick={() => !fullScreenBoard ? onFullScreen() : offFullScreen()}>
                {!fullScreenBoard
                    ? <Icon24Fullscreen className={styles.boardIcon} />
                    : <Icon24FullscreenExit className={styles.boardIcon} />
                }
            </div>
        </div>
    )
};

export default NotVKCOMPanel;