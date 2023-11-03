import { FC, ReactNode, useContext, useEffect } from 'react';
import styles from "./BoardModal.module.css";
import { Icon24CancelOutline } from '@vkontakte/icons';
import { boardContext } from '../Board';
import { TBoardContext } from '../../../types';

export const BoardModal: FC = ({ children }: { children?: ReactNode }) => {

    const { setBoardModal } = useContext(boardContext) as TBoardContext;

    return (
        <>
            <div className={styles.boardModalOverlay} />
            <div className={styles.boardModalConteiner}>
                <div className={styles.boardModal}>
                    {children}
                </div>
                <div className={styles.boardModalCancel} onClick={() => setBoardModal(null)}>
                    <Icon24CancelOutline className={styles.boardModalCancelIcon} />
                </div>
            </div>
        </>
    )
};

export default BoardModal;