import { Cell } from '@vkontakte/vkui';
import { FC, MouseEvent, useContext } from 'react';
import localStorages from '../../config/localStorages';
import panels from '../../config/panels';
import { interfaceContext } from '../../panels/Panels';
import { BoardNameAndId, TInterfaceContext } from '../../config/types';
import BoardComponentActions from '../board-component-after/BoardComponentAfter';
import { Icon28EditOutline } from '@vkontakte/icons';
import styles from "./BoardsListComponent.module.css"
import { modals } from '../../modals/Modals';
import RenameBoardModal from '../../modals/RenameBoardModal';

interface Props {
    board: BoardNameAndId,
    index: number
}

const BoardsListComponent: FC<Props> = ({ board, index }) => {

    const { panels: { setActivePanel }, modals: {setActiveModal} } = useContext(interfaceContext) as TInterfaceContext;

    const boardClick = (board: BoardNameAndId) => {
        localStorage.setItem(localStorages.activeBoard, String(board.id));
        localStorage.setItem(localStorages.activePanel, panels.board)
        setActivePanel(panels.board);
    };

    const handleRenameBoard = (boardId: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, boardName: string) => {
        e.stopPropagation();
        setActiveModal({id: modals.renameBoardModal, modal: <RenameBoardModal boardId={boardId} boardName={boardName} index={index}/>});
      };

    return (
        <Cell
            onClick={() => boardClick(board)}
            after={<BoardComponentActions board={board} />}
            before={<Icon28EditOutline className={styles.icon} onClick={e => handleRenameBoard(board.id, e, board.name)} />}
        >
            {board.name} 
        </Cell>
    )
};

export default BoardsListComponent;