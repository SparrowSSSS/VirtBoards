import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import { FC, useContext } from 'react'
import { TBoardContext } from '../../../config/types';
import { boardContext } from '../Board';

export const boardModals = {
    settingsModal: "settings-modal"
}

const BoardModal: FC = () => {

    const {modals: {boardModal, setBoardModal}} = useContext(boardContext) as TBoardContext;

    return (
        <ModalRoot activeModal={boardModal?.id}>
            <ModalPage
                id={boardModals.settingsModal}
                header={<ModalPageHeader>Настройки</ModalPageHeader>}
                onClose={() => setBoardModal(null)}
            >
                {boardModal?.modal}
            </ModalPage>
        </ModalRoot>
    )
};

export default BoardModal;