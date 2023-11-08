import { FC, useContext, useEffect } from 'react';
import { BoardData, TBoardContext } from '../../../config/types';
import { Icon24Fullscreen, Icon24FullscreenExit } from '@vkontakte/icons';
import styles from "./BoardBottomPanel.module.css"
import { Icon24Settings } from '@vkontakte/icons';
import { boardContext } from '../Board';
import SettingModal from '../board-modals/setting-modal/SettingModal';
import boardStyles from '../Board.module.css';
import { Platform, usePlatform } from '@vkontakte/vkui';

const BoardBottomPanel: FC = () => {

    const { fullScreenBoard, setFullScreenBoard, boardData, setBoardModal } = useContext(boardContext) as TBoardContext;

    const platform = usePlatform();

    const boardWindow = document.querySelector(`.${boardStyles.boardWindow}`) as HTMLElement;

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) setFullScreenBoard(false);
        else setFullScreenBoard(true);
    });

    const onFullScreenButton = () => {
        boardWindow.requestFullscreen();
    };

    const offFullScreenButton = () => {
        document.exitFullscreen();
    };

    return (
        <>
            {platform !== Platform.VKCOM
                ? (
                    <div className={`${styles.boardBottomPanel} ${fullScreenBoard ? styles.boardBottomPanelFullScreenTl : ""}`}>
                        <div className={styles.bottomPanelButton} onClick={() => !fullScreenBoard ? onFullScreenButton() : offFullScreenButton()}>
                            {!fullScreenBoard
                                ? <Icon24Fullscreen className={styles.boardIcon} />
                                : <Icon24FullscreenExit className={styles.boardIcon} />
                            }
                        </div>
                    </div>
                )

                : !fullScreenBoard
                    ? (
                        <div className={styles.boardBottomPanel}>
                            <div className={styles.bottomPanelButton} onClick={() => onFullScreenButton()}>
                                <Icon24Fullscreen className={styles.boardIcon} />
                            </div>
                        </div>
                    )
                    : (
                        <div className={`${styles.boardBottomPanel} ${styles.boardBottomPanelFullScreen}`}>
                            <div style={{ color: "#222222", fontWeight: "bold" }}>{(boardData as BoardData).name.length <= 11 ? (boardData as BoardData).name : (boardData as BoardData).name.slice(0, 11) + "..."}</div>
                            <div style={{ display: "flex" }}>
                                <div className={styles.bottomPanelButton} style={{ marginRight: "15px" }} onClick={() => setBoardModal(<SettingModal />)}>
                                    <Icon24Settings className={`${styles.boardIcon}`}></Icon24Settings>
                                </div>
                                <div onClick={() => offFullScreenButton()} className={styles.bottomPanelButton} >
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