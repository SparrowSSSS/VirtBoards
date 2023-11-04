import { FC, useContext } from 'react';
import { BoardData, TBoardContext } from '../../../config/types';
import { Icon24Fullscreen, Icon24FullscreenExit } from '@vkontakte/icons';
import styles from "./BoardBottomPanel.module.css"
import { Icon24Settings } from '@vkontakte/icons';
import { boardContext } from '../Board';
import SettingModal from '../board-modals/setting-modal/SettingModal';

const BoardBottomPanel: FC = () => {

    const { fullScreenBoard, setFullScreenBoard, boardData, setBoardModal } = useContext(boardContext) as TBoardContext;

    return (
        <>
            {!fullScreenBoard
                ? (
                    <div className={styles.boardBottomPanel}>
                        <div className={styles.bottomPanelButton}>
                            <Icon24Fullscreen className={styles.boardIcon} onClick={() => setFullScreenBoard(true)} />
                        </div>
                    </div>
                )
                : (
                    <div className={`${styles.boardBottomPanel} ${styles.boardBottomPanelFullScreen}`}>
                        <div style={{ color: "#222222", fontWeight: "bold" }}>{(boardData as BoardData).name}</div>
                        <div style={{ display: "flex" }}>
                            <div className={styles.bottomPanelButton} style={{marginRight: "15px"}} onClick={() => setBoardModal(<SettingModal />)}>
                                <Icon24Settings className={`${styles.boardIcon}`}></Icon24Settings>
                            </div>
                            <div onClick={() => setFullScreenBoard(false)} className={styles.bottomPanelButton} >
                                <Icon24FullscreenExit className={styles.boardIcon} />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default BoardBottomPanel;