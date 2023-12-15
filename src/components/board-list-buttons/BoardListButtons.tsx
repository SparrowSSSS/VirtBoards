import { Icon24Add } from '@vkontakte/icons';
import { Button, ButtonGroup, Platform, usePlatform } from '@vkontakte/vkui';
import { FC } from 'react';
import globalConfig from '../../config/global';
import { useInterfaceActions } from '../../hooks/useActions';
import { useInterfaceSelector } from '../../hooks/useStoreSelector';
import AddBoardModal from '../../modals/AddBoardModal';
import { modals } from '../../modals/Modals';
import BoardLimitSnackbar from '../../snackbars/BoardLimitSnackbar';
import BoardFileRead from './board-file-read/BoardFileRead';

const BoardListButtons: FC = () => {

    const platform = usePlatform();

    const { boardsList } = useInterfaceSelector();
    const { setModal, setSnackbar } = useInterfaceActions();

    const handleAddBoardButtonClick = async () => {
        if (boardsList.length < globalConfig.maxBoards) {
            setModal({ id: modals.addBoardModal, modal: <AddBoardModal /> });
        } else {
            setSnackbar(<BoardLimitSnackbar subtitle={`Максимальное количество доступных досок - ${globalConfig.maxBoards}`} />);
        };
    };

    return (
        <ButtonGroup mode={platform === Platform.VKCOM ? "horizontal" : "vertical"} gap="m" style={{ margin: "15px" }}>
            <Button size="m" before={<Icon24Add />} onClick={() => handleAddBoardButtonClick()} stretched={platform !== Platform.VKCOM}>Создать доску</Button>
            <BoardFileRead />
        </ButtonGroup>
    )
};

export default BoardListButtons;