import { Icon24Add, Icon24Cancel } from '@vkontakte/icons';
import { Button, Cell, Group, Header, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { FC, MouseEvent, useContext } from 'react';
import { BoardNameAndId, TInterfaceContext, onClickRemoveBoard } from '../types';
import localStorages from '../localStorages';
import panels from '../panels';
import DeleteBoardPopout from '../popouts/DeleteBoardPopout';
import { interfaceContext } from '../panels/Panels';
import { modals } from '../modals/Modals';
import deleteBoard from '../services/deleteBoard';
import { dbContext } from '../App';

export const BoardsList: FC = () => {

    const { panels: { setActivePanel }, popouts: { setPopout }, modals: { setActiveModal }, boards: { boardsList, setBoardsList } } = useContext(interfaceContext) as TInterfaceContext;

    const db = useContext(dbContext);

    const removeBoard: onClickRemoveBoard = async (boardId) => {
        if (db) {
            try {
                await deleteBoard(db, boardId);
            } catch (e) {
                alert("Произошла ошибка: " + (e as Error).message);
                return;
            }

            const list = [...(boardsList as BoardNameAndId[])];
            
            list.find((board, i) => {
                if (board.id === boardId) {
                    list.splice(i, 1);
                    return true;
                };
            });

            setBoardsList(list);
        };
    };

    const boardClick = (board: BoardNameAndId) => {
        localStorage.setItem(localStorages.activeBoard, String(board.id));
        localStorage.setItem(localStorages.activePanel, panels.board)
        setActivePanel(panels.board);
    };

    const handleRemoveBoard = (boardId: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, boardName: string) => {
        e.stopPropagation();
        setPopout(<DeleteBoardPopout boardName={boardName} boardId={boardId} callback={removeBoard} />);
    };

    return (
        <>
            <Group header={<Header mode="primary">Доски</Header>}>
                {
                    boardsList === "loading" ? (<Spinner size="medium"></Spinner>)

                        : boardsList.length > 0
                            ? (
                                <List>
                                    {boardsList.map((board) => (
                                        <Cell
                                            key={board.id}
                                            onClick={() => boardClick(board)}
                                            after={<Icon24Cancel onClick={(e) => handleRemoveBoard(board.id, e, board.name)} color="#E64646" />}

                                        >
                                            {board.name}
                                        </Cell>
                                    ))}
                                </List>
                            )
                            : <Placeholder>У вас нет ни одной доски</Placeholder>

                }
            </Group>
            <Button size="m" before={<Icon24Add />} onClick={() => setActiveModal(modals.addBoardModal)}>Добавить доску</Button>
        </>
    )
};

export default BoardsList;