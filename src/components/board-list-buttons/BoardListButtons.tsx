import { Icon24Add } from '@vkontakte/icons';
import { Button, ButtonGroup, Platform, usePlatform } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import globalConfig from '../../config/global';
import { TInterfaceContext } from '../../config/types';
import AddBoardModal from '../../modals/AddBoardModal';
import { modals } from '../../modals/Modals';
import { interfaceContext } from '../../panels/Panels';
import BoardLimitSnackbar from '../../snackbars/BoardLimitSnackbar';
import BoardFileRead from './board-file-read/BoardFileRead';

const BoardListButtons: FC = () => {

    const { modals: { setActiveModal }, boards: { boardsList }, snackbars: { setSnackbar } } = useContext(interfaceContext) as TInterfaceContext;

    const platform = usePlatform();

    const handleAddBoardButtonClick = async () => {
        if (boardsList !== "loading") {
            if (boardsList.length < globalConfig.maxBoards) {
                setActiveModal({ id: modals.addBoardModal, modal: <AddBoardModal /> });
            } else {
                setSnackbar(<BoardLimitSnackbar subtitle={`Максимальное количество доступных досок - ${globalConfig.maxBoards}`} />);
            };
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