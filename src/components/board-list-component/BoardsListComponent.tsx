import { Cell } from '@vkontakte/vkui';
import { FC, MouseEvent } from 'react';
import localStorages from '../../config/localStorages';
import panels from '../../config/panels';
import { BoardNameAndId } from '../../config/types';
import BoardComponentActions from '../board-component-after/BoardComponentAfter';
import { Icon28EditOutline } from '@vkontakte/icons';
import styles from "./BoardsListComponent.module.css"
import { modals } from '../../modals/Modals';
import RenameBoardModal from '../../modals/RenameBoardModal';
import { useInterfaceActions } from '../../hooks/useActions';

interface Props {
    board: BoardNameAndId,
    index: number
}

const BoardsListComponent: FC<Props> = ({ board, index }) => {

    const { setPanel, setModal } = useInterfaceActions();

    const boardClick = (board: BoardNameAndId) => {
        localStorage.setItem(localStorages.activeBoard, String(board.id));
        setPanel(panels.board);
    };

    const handleRenameBoard = (boardId: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, boardName: string) => {
        e.stopPropagation();
        setModal({ id: modals.renameBoardModal, modal: <RenameBoardModal boardId={boardId} boardName={boardName} index={index} /> });
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