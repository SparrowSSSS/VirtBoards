import { Icon24Add } from '@vkontakte/icons';
import { Button, ButtonGroup, File, Group, Header, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { ChangeEvent, FC, useContext } from 'react';
import { BoardData, TInterfaceContext } from '../config/types';
import { interfaceContext } from '../panels/Panels';
import { modals } from '../modals/Modals';
import BoardsListComponent from './board-list-component/BoardsListComponent';
import AddBoardModal from '../modals/AddBoardModal';
import { Icon24Download } from '@vkontakte/icons';
import getErrorMessage from '../utils/alertError';
import errorsPS from '../config/errorsPS';
import { addBoard } from '../services/generalServices';
import { dbContext } from '../App';
import { MyDB } from '../hooks/useDB';
import { IDBPDatabase } from "idb";
import checkOrigin from '../utils/checkOrigin';

export const BoardsList: FC = () => {

    const { modals: { setActiveModal }, boards: { boardsList, setBoardsList } } = useContext(interfaceContext) as TInterfaceContext;

    const db = useContext(dbContext);

    const handleAddBoardButtonClick = () => {
        if (boardsList !== "loading") {
            if (boardsList.length < 3) {
                setActiveModal({ id: modals.addBoardModal, modal: <AddBoardModal /> });
            } else {
                alert("Максимальное количество доступных досок - 3");
            };
        };
    };

    const loadBoard = async (boardData: BoardData) => {
        try {
            await addBoard(boardData, db as IDBPDatabase<MyDB>);
        } catch (e) {
            throw e;
        };
    };

    const downloadBoard = (e: ChangeEvent<HTMLInputElement>) => {
        if (db && boardsList !== "loading") {
            if (boardsList.length < 3) {
                try {
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];

                        const reader = new FileReader();

                        reader.readAsText(file);

                        reader.onload = async () => {
                            if (reader.result) {

                                const board = { ...JSON.parse(reader.result as string), id: Date.now() } as BoardData;

                                if (!checkOrigin(board.name, boardsList)) {
                                    board.name = board.name + "(1)";
                                    let n = 1;
                                    while (!checkOrigin(board.name, boardsList)) {
                                        board.name.replace(new RegExp(`(${n})`), `(${n + 1})`);
                                        n += 1;
                                    };
                                };

                                try {
                                    await loadBoard(board);
                                } catch (e) {
                                    throw e;
                                };

                                setBoardsList([...boardsList, board]);
                            } else {
                                throw new Error();
                            };
                        };

                        reader.onerror = () => {
                            throw reader.error;
                        };
                    } else {
                        throw new Error();
                    };
                } catch (e) {
                    alert(getErrorMessage(e, errorsPS.dBoard));
                };
            } else {
                alert("Максимальное количество доступных досок - 3");
            };
        };
    };

    return (
        <>
            <Group header={<Header mode="primary">Доски</Header>}>
                {
                    boardsList === "loading" ? (<Spinner size="medium"></Spinner>)

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
            <ButtonGroup mode="horizontal" gap="m">
                <Button size="m" before={<Icon24Add />} onClick={() => handleAddBoardButtonClick()}>Создать доску</Button>
                <File before={<Icon24Download />} size="m" onChange={e => downloadBoard(e)}>
                    Загрузить доску
                </File>
            </ButtonGroup>
        </>
    )
};

export default BoardsList;