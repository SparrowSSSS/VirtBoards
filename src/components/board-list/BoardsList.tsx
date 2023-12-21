import { Group, Header, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { FC, useContext, useEffect } from 'react';
import BoardsListComponent from '../board-list-component/BoardsListComponent';
import BoardListButtons from '../board-list-buttons/BoardListButtons';
import { useQuery } from '@tanstack/react-query';
import GeneralService from '../../services/generalServices';
import useCatchError from '../../hooks/useCatchError';
import queryTags from '../../config/queryTags';
import errorsPS from '../../config/errorsPS';
import { useInterfaceActions } from '../../hooks/useActions';
import { useInterfaceSelector } from '../../hooks/useStoreSelector';
import { interfaceContext } from '../../panels/Panels';
import { TInterfaceContext } from '../../config/types';

export const BoardsList: FC = () => {

    const { popout: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

    const catchError = useCatchError(setPopout);

    const { setBoardsList } = useInterfaceActions();

    const { boardsList } = useInterfaceSelector();

    const bl = useQuery({ queryKey: [queryTags.boardsList], queryFn: () => GeneralService.getBoardsList("init") });
    if (bl.error) catchError(bl.error, errorsPS.getBoardsList);

    useEffect(() => {
        if (bl.data) setBoardsList(bl.data);
    }, [bl.data]);

    return (
        <>
            <Group header={<Header mode="primary">Доски</Header>}>
                {
                    !bl.data ? (<Spinner size="medium" style={{ paddingBottom: "20px" }}></Spinner>)

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