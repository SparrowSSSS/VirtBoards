import { Icon24Add } from '@vkontakte/icons';
import { Button, Group, Header, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { TInterfaceContext } from '../types';
import { interfaceContext } from '../panels/Panels';
import { modals } from '../modals/Modals';
import BoardsListComponent from './BoardsListComponent';

export const BoardsList: FC = () => {

    const { modals: { setActiveModal }, boards: { boardsList } } = useContext(interfaceContext) as TInterfaceContext;

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
            <Button size="m" before={<Icon24Add />} onClick={() => setActiveModal(modals.addBoardModal)}>Добавить доску</Button>
        </>
    )
};

export default BoardsList;