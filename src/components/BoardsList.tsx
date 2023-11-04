import { Icon24Add } from '@vkontakte/icons';
import { Button, Group, Header, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { TInterfaceContext } from '../config/types';
import { interfaceContext } from '../panels/Panels';
import { modals } from '../modals/Modals';
import BoardsListComponent from './BoardsListComponent';

export const BoardsList: FC = () => {

    const { modals: { setActiveModal }, boards: { boardsList } } = useContext(interfaceContext) as TInterfaceContext;

    const handleAddBoardButtonClick = () => {
        if (boardsList.length < 3) {
            setActiveModal(modals.addBoardModal);
        } else {
            alert("Максимальное количество доступных досок - 3");
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
                                    {boardsList.map((board) => (
                                        <BoardsListComponent board={board} key={board.id}/>
                                    ))}
                                </List>
                            )
                            : <Placeholder>У вас нет ни одной доски</Placeholder>

                }
            </Group>
            <Button size="m" before={<Icon24Add />} onClick={() => handleAddBoardButtonClick()}>Добавить доску</Button>
        </>
    )
};

export default BoardsList;