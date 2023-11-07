import { Icon24Add } from '@vkontakte/icons';
import { Button, ButtonGroup, File, Group, Header, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { ChangeEvent, FC, useContext } from 'react';
import { BoardData, TInterfaceContext } from '../config/types';
import { interfaceContext } from '../panels/Panels';
import { modals } from '../modals/Modals';
import BoardsListComponent from './board-list-component/BoardsListComponent';
import AddBoardModal from '../modals/AddBoardModal';
import { Icon24Document } from '@vkontakte/icons';
import getErrorMessage from '../utils/getErrorMessage';
import errorsPS from '../config/errorsPS';
import checkOrigin from '../utils/checkOrigin';
import GeneralServices from '../services/generalServices';
import ErrorPopout from '../popouts/ErrorPopout';
import BoardLimitSnackbar from '../snackbars/BoardLimitSnackbar';
import BridgeStorage from '../services/bridgeServices';

export const BoardsList: FC = () => {

    const { modals: { setActiveModal }, boards: { boardsList, setBoardsList }, popouts: { setPopout }, snackbars: { setSnackbar }, loading: { setIsLoading } } = useContext(interfaceContext) as TInterfaceContext;

    const handleAddBoardButtonClick = async () => {
        if (boardsList !== "loading") {
            setIsLoading(true);

            try {

                const boards = await BridgeStorage.getBoardsList();

                if (boards.length < 3) {
                    setActiveModal({ id: modals.addBoardModal, modal: <AddBoardModal /> });
                } else {
                    setSnackbar(<BoardLimitSnackbar subtitle="Максимальное количество доступных досок - 3" />);
                };

                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                setPopout(<ErrorPopout message={getErrorMessage(e)} errorPS={errorsPS.addBoard} />);
            };
        };
    };

    const loadBoard = async (boardData: BoardData) => {
        try {
            await GeneralServices.addBoard(boardData);
        } catch (e) {
            throw e;
        };
    };

    const downloadBoard = async (e: ChangeEvent<HTMLInputElement>) => {
        if (boardsList !== "loading") {
            setIsLoading(true);

            try {
                const bl = await BridgeStorage.getBoardsList();

                if (bl.length < 3) {
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];

                        const reader = new FileReader();

                        reader.readAsText(file);

                        reader.onload = async () => {
                            if (reader.result) {
                                let board: BoardData;

                                try {
                                    board = { ...JSON.parse(reader.result as string), id: Date.now() } as BoardData;

                                    if (!checkOrigin(board.name, boardsList)) {
                                        board.name = board.name + "(1)";
                                        let n = 1;
                                        while (!checkOrigin(board.name, boardsList)) {
                                            board.name.replace(new RegExp(`(${n})`), `(${n + 1})`);
                                            n += 1;
                                        };
                                    };

                                    await loadBoard(board);

                                    setIsLoading(false);
                                    setBoardsList([...boardsList, board]);
                                } catch (e) {
                                    setIsLoading(false);
                                    setPopout(<ErrorPopout message={getErrorMessage(e)} errorPS={errorsPS.dBoard} />);
                                    return;
                                };
                            } else {
                                setIsLoading(false);
                                setPopout(<ErrorPopout message="" errorPS={errorsPS.dBoard} />);
                                return;
                            };
                        };

                        reader.onerror = () => {
                            setIsLoading(false);
                            setPopout(<ErrorPopout message={getErrorMessage(reader.error)} errorPS={errorsPS.dBoard} />);
                            return;
                        };
                    } else {
                        throw new Error();
                    };

                } else {
                    setIsLoading(false);
                    setSnackbar(<BoardLimitSnackbar subtitle="Максимальное количество доступных досок - 3" />);
                };
            } catch (e) {
                setIsLoading(false);
                setPopout(<ErrorPopout message={getErrorMessage(e)} errorPS={errorsPS.dBoard} />);
            };
        };
    };

    return (
        <>
            <Group header={<Header mode="primary">Доски</Header>}>
                {
                    boardsList === "loading" ? (<Spinner size="medium" style={{ paddingBottom: "20px" }}></Spinner>)

                        : boardsList.length > 0
                            ? (
                                <List>
                                    {boardsList.map((board, index) => (
                                        <BoardsListComponent board={board} key={board.id} index={index} />
                                    ))}
                                </List>
                            )
                            : <Placeholder>У вас нет ни одной доски</Placeholder>

                }
            </Group>
            <ButtonGroup mode="horizontal" gap="m" style={{ margin: "15px" }}>
                <Button size="m" before={<Icon24Add />} onClick={() => handleAddBoardButtonClick()}>Создать доску</Button>
                <File before={<Icon24Document />} size="m" onChange={e => downloadBoard(e)}>
                    Загрузить доску
                </File>
            </ButtonGroup>
        </>
    )
};

export default BoardsList;