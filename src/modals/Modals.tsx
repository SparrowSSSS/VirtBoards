import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import {FC, SetStateAction} from 'react'
import AddBoardModal from './AddBoardModal';

interface Props {
    activeModal: string | null,
    setActiveModal: (value: SetStateAction<string | null>) => void
}

export const modals = {
    addBoardModal: "add-board-modal"
}


const Modals: FC<Props> = ({activeModal, setActiveModal}) => {
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