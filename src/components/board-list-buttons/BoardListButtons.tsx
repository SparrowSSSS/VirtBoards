import { Icon24Add } from '@vkontakte/icons';
import { Button, ButtonGroup, Platform, usePlatform } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import globalConfig from '../../config/global';
import { TInterfaceContext } from '../../config/types';
import { useInterfaceActions } from '../../hooks/useActions';
import { useInterfaceSelector } from '../../hooks/useStoreSelector';
import { modals } from '../../modals/Modals';
import { interfaceContext } from '../../panels/Panels';
import BoardLimitSnackbar from '../../snackbars/BoardLimitSnackbar';
import BoardFileRead from './board-file-read/BoardFileRead';

const BoardListButtons: FC = () => {

    const platform = usePlatform();

    const { boardsList } = useInterfaceSelector();
    const { setModal } = useInterfaceActions();

    const { snackbar: { setSnackbar } } = useContext(interfaceContext) as TInterfaceContext;

    const handleAddBoardButtonClick = async () => {
        if (boardsList.length < globalConfig.maxBoards) {
            setModal({ id: modals.addBoardModal });
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