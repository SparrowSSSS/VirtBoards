import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import { FC, useContext } from 'react'
import AddBoardModal from './AddBoardModal';
import { interfaceContext } from '../panels/Panels';
import { TInterfaceContext } from '../config/types';
import RenameBoardModal from './RenameBoardModal';

export const modals = {
    addBoardModal: "add-board-modal",
    renameBoardModal: "rename-board-modal"
}

const Modals: FC = () => {

    const { modals: { activeModal, setActiveModal } } = useContext(interfaceContext) as TInterfaceContext;

    return (
        <ModalRoot activeModal={activeModal?.id}>
            <ModalPage
                id={modals.addBoardModal}
                header={<ModalPageHeader>Новая доска</ModalPageHeader>}
                onClose={() => setActiveModal(null)}
            >
                {activeModal?.modal}
            </ModalPage>
            <ModalPage
                id={modals.renameBoardModal}
                header={<ModalPageHeader>Переименовать доску</ModalPageHeader>}
                onClose={() => setActiveModal(null)}
            >
                {activeModal?.modal}
            </ModalPage>
        </ModalRoot>
    )
};

export default Modals;