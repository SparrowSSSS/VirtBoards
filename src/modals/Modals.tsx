import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import { FC } from 'react';
import { useInterfaceActions } from '../hooks/useActions';
import { useInterfaceSelector } from '../hooks/useStoreSelector';
import AddBoardModal from './AddBoardModal';
import RenameBoardModal from './RenameBoardModal';
import { TRenameModalProps } from '../config/types';

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
                <AddBoardModal />
            </ModalPage>

            <ModalPage
                id={modals.renameBoardModal}
                header={<ModalPageHeader>Переименовать доску</ModalPageHeader>}
                onClose={() => setModal(null)}
            >
                {activeModal?.renameModalProps
                    ? <RenameBoardModal
                        boardId={activeModal.renameModalProps.id}
                        boardName={activeModal.renameModalProps.name}
                        index={activeModal.renameModalProps.index}
                    />

                    : null
                }
            </ModalPage>
        </ModalRoot>
    )
};

export default Modals;