import { Group, Header, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { TInterfaceContext } from '../../config/types';
import { interfaceContext } from '../../panels/Panels';
import BoardsListComponent from '../board-list-component/BoardsListComponent';
import BoardListButtons from '../board-list-buttons/BoardListButtons';

export const BoardsList: FC = () => {

    const { boards: { boardsList } } = useContext(interfaceContext) as TInterfaceContext;

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
            <BoardListButtons />
        </>
    )
};

export default BoardsList;