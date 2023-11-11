import { Icon24Fullscreen, Icon24FullscreenExit, Icon24Settings } from '@vkontakte/icons';
import { FC, useContext } from 'react';
import { BoardData, TBoardContext } from '../../../config/types';
import { boardContext } from '../Board';
import { boardModals } from '../board-modals/BoardModal';
import SettingModal from '../board-modals/setting-modal/SettingModal';
import styles from "./BoardBottomPanel.module.css";

interface Props {
    onFullScreen: () => void,
    offFullScreen: () => void
};

const VKCOMPanel: FC<Props> = ({ onFullScreen, offFullScreen }) => {

    const { data: {boardData}, fullscreen: {fullScreenBoard}, modals: {setBoardModal} } = useContext(boardContext) as TBoardContext;

    const valBoardName = (name: string): string => {
        return name.length <= 11 ? name : name.slice(0, 11) + "...";
    };

    return (
        <>
            {!fullScreenBoard
                ? (
                    <div className={styles.boardBottomPanel}>
                        <div className={styles.bottomPanelButton} onClick={() => onFullScreen()}>
                            <Icon24Fullscreen className={styles.boardIcon} />
                        </div>
                    </div>
                )
                : (
                    <div className={`${styles.boardBottomPanel} ${styles.boardBottomPanelFullScreen}`}>
                        <div style={{ color: "#222222", fontWeight: "bold" }}>{valBoardName((boardData as BoardData).name)}</div>
                        <div style={{ display: "flex" }}>
                            <div className={styles.bottomPanelButton} style={{ marginRight: "15px" }} onClick={() => setBoardModal({id: boardModals.settingsModal, modal: <SettingModal />})}>
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