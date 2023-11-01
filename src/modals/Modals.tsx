import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import {FC, useContext} from 'react'
import AddBoardModal from './AddBoardModal';
import { interfaceContext } from '../panels/Panels';
import { TInterfaceContext } from '../types';

export const modals = {
    addBoardModal: "add-board-modal"
}

const Modals: FC = () => {

    const {modals: {activeModal, setActiveModal}} = useContext(interfaceContext) as TInterfaceContext;

    return (
        <ModalRoot activeModal={activeModal}>
            <ModalPage 
                id={modals.addBoardModal} 
                header={<ModalPageHeader>Новая доска</ModalPageHeader>} 
                onClose={() => setActiveModal(null)}
            >
                <AddBoardModal />
            </ModalPage>
        </ModalRoot>
    )
};

export default Modals;