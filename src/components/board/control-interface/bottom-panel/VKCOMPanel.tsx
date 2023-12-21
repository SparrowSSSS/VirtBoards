import { Icon24Fullscreen, Icon24FullscreenExit, Icon24Settings } from '@vkontakte/icons';
import { FC } from 'react';
import { BoardData } from '../../../../config/types';
import { useBoardActions } from '../../../../hooks/useActions';
import { useBoardSelector } from '../../../../hooks/useStoreSelector';
import { boardModals } from '../../../../modals/BoardModals';
import SettingModal from '../../../../modals/SettingModal';
import styles from "./BoardBottomPanel.module.css";
import { boardBottomPanel, boardBottomPanelFullScreen } from './bottomPanelStyle';

interface Props {
    onFullScreen: () => void,
    offFullScreen: () => void
};

const VKCOMPanel: FC<Props> = ({ onFullScreen, offFullScreen }) => {

    const { fullscreen, boardData } = useBoardSelector();

    const { setBoardModal } = useBoardActions();

    const valBoardName = (name: string): string => {
        return name.length <= 11 ? name : name.slice(0, 11) + "...";
    };

    return (
        <>
            {!fullscreen
                ? (
                    <div className={styles.boardBottomPanel} style={boardBottomPanel}>
                        <div className={styles.bottomPanelButton} onClick={() => onFullScreen()}>
                            <Icon24Fullscreen className={styles.boardIcon} />
                        </div>
                    </div>
                )
                : (
                    <div className={`${styles.boardBottomPanel} ${styles.boardBottomPanelFullScreen}`} style={boardBottomPanelFullScreen}>
                        <div style={{ color: "#222222", fontWeight: "bold" }}>{valBoardName((boardData as BoardData).name)}</div>
                        <div style={{ display: "flex" }}>
                            <div className={styles.bottomPanelButton} style={{ marginRight: "15px" }} onClick={() => setBoardModal({ id: boardModals.settingsModal })}>
                                <Icon24Settings className={`${styles.boardIcon}`}></Icon24Settings>
                            </div>
                            <div onClick={() => offFullScreen()} className={styles.bottomPanelButton} >
                                <Icon24FullscreenExit className={styles.boardIcon} />
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
};

export default VKCOMPanel;