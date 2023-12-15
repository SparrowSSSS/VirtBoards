import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import { FC } from 'react';
import { useInterfaceActions } from '../hooks/useActions';
import { useInterfaceSelector } from '../hooks/useStoreSelector';

export const modals = {
    addBoardModal: "add-board-modal",
    renameBoardModal: "rename-board-modal"
}

const Modals: FC = () => {

    const { activeModal } = useInterfaceSelector();

    const { setModal } = useInterfaceActions();

    return (
        <ModalRoot activeModal={activeModal?.id}>
            <ModalPage
                id={modals.addBoardModal}
                header={<ModalPageHeader>Новая доска</ModalPageHeader>}
                onClose={() => setModal(null)}
            >
                {activeModal?.modal}
            </ModalPage>
            <ModalPage
                id={modals.renameBoardModal}
                header={<ModalPageHeader>Переименовать доску</ModalPageHeader>}
                onClose={() => setModal(null)}
            >
                {activeModal?.modal}
            </ModalPage>
        </ModalRoot>
    )
};

export default Modals;