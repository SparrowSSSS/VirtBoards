import { Icon24Fullscreen, Icon24FullscreenExit } from '@vkontakte/icons';
import { FC, useContext } from 'react';
import { useBoardSelector } from '../../../../hooks/useStoreSelector';
import styles from "./BoardBottomPanel.module.css";
import { boardBottomPanel, boardBottomPanelFullScreenTl } from './bottomPanelStyle';

interface Props {
    onFullScreen: () => void,
    offFullScreen: () => void
};

const NotVKCOMPanel: FC<Props> = ({ onFullScreen, offFullScreen }) => {

    const { fullscreen } = useBoardSelector();

    return (
        <div className={`${styles.boardBottomPanel} ${fullscreen ? styles.boardBottomPanelFullScreenTl : ""}`} style={fullscreen ? boardBottomPanelFullScreenTl : boardBottomPanel}>
            <div className={styles.bottomPanelButton} onClick={() => !fullscreen ? onFullScreen() : offFullScreen()}>
                {!fullscreen
                    ? <Icon24Fullscreen className={styles.boardIcon} />
                    : <Icon24FullscreenExit className={styles.boardIcon} />
                }
            </div>
        </div>
    )
};

export default NotVKCOMPanel;