import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import { FC } from 'react'
import { useBoardActions } from '../hooks/useActions';
import { useBoardSelector } from '../hooks/useStoreSelector';

export const boardModals = {
    settingsModal: "settings-modal"
}

const BoardModal: FC = () => {

    const { setModal } = useBoardActions();
    const { boardModal } = useBoardSelector();

    return (
        <ModalRoot activeModal={boardModal?.id}>
            <ModalPage
                id={boardModals.settingsModal}
                header={<ModalPageHeader>Настройки</ModalPageHeader>}
                onClose={() => setModal(null)}
            >
                {boardModal?.modal}
            </ModalPage>
        </ModalRoot>
    )
};

export default BoardModal;