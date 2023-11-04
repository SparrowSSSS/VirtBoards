import { Icon24Cancel } from '@vkontakte/icons';
import { Cell } from '@vkontakte/vkui';
import { FC, useContext, MouseEvent } from 'react';
import localStorages from '../config/localStorages';
import panels from '../config/panels';
import { interfaceContext } from '../panels/Panels';
import DeleteBoardPopout from '../popouts/DeleteBoardPopout';
import { BoardNameAndId, TInterfaceContext } from '../config/types';

interface Props {
    board: BoardNameAndId
}

const BoardsListComponent: FC<Props> = ({ board }) => {

    const { panels: { setActivePanel }, popouts: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

    const boardClick = (board: BoardNameAndId) => {
        localStorage.setItem(localStorages.activeBoard, String(board.id));
        localStorage.setItem(localStorages.activePanel, panels.board)
        setActivePanel(panels.board);
    };

    const handleRemoveBoard = (boardId: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, boardName: string) => {
        e.stopPropagation();
        setPopout(<DeleteBoardPopout boardName={boardName} boardId={boardId} />);
    };

    return (
        <Cell
            onClick={() => boardClick(board)}
            after={<Icon24Cancel onClick={(e) => handleRemoveBoard(board.id, e, board.name)} color="#E64646" />}

        >
            {board.name}
        </Cell>
    )
};

export default BoardsListComponent;