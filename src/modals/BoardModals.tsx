import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import { FC } from 'react'
import { useBoardActions } from '../hooks/useActions';
import { useBoardSelector } from '../hooks/useStoreSelector';
import SettingModal from './SettingModal';

export const boardModals = {
    settingsModal: "settings-modal"
}

const BoardModal: FC = () => {

    const { setBoardModal } = useBoardActions();
    const { boardModal } = useBoardSelector();

    return (
        <ModalRoot activeModal={boardModal?.id}>
            <ModalPage
                id={boardModals.settingsModal}
                header={<ModalPageHeader>Настройки</ModalPageHeader>}
                onClose={() => setBoardModal(null)}
            >
                <SettingModal />
            </ModalPage>
        </ModalRoot>
    )
};

export default BoardModal;