import { Div, Link, usePlatform } from '@vkontakte/vkui';
import { FC, MouseEvent, useContext } from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { BoardNameAndId, TInterfaceContext } from '../../config/types';
import { interfaceContext } from '../../panels/Panels';
import DeleteBoardPopout from '../../popouts/DeleteBoardPopout';
import { Icon24DownloadOutline } from '@vkontakte/icons';
import styles from "./BoardComponentAfter.module.css";
import getErrorMessage from '../../utils/getErrorMessage';
import errorsPS from '../../config/errorsPS';
import ErrorPopout from '../../popouts/ErrorPopout';
import IndexedDB from '../../services/indexedService';
import loadFromUrl from "./loadFromURL";

interface Props {
  board: BoardNameAndId
};

export const BoardComponentActions: FC<Props> = ({ board }) => {

  const platform = usePlatform();

  const { popouts: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

  const handleRemoveBoard = (boardId: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, boardName: string) => {
    e.stopPropagation();
    setPopout(<DeleteBoardPopout boardName={boardName} boardId={boardId} />);
  };

  const downloadBoard = async (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, boardId: number) => {
    e.stopPropagation();

    try {
      const boardData = await IndexedDB.getBoardData(boardId);
      loadFromUrl(boardData, platform);
    } catch (error) {
      setPopout(<ErrorPopout message={getErrorMessage(error)} errorPS={errorsPS.getBoardData} />);
    };
  };

  return (
    <Div className={styles.divFlex}>
      <Link onClick={e => downloadBoard(e, board.id)}>
        <Icon24DownloadOutline />
      </Link>
      <Icon24Cancel onClick={(e) => handleRemoveBoard(board.id, e, board.name)} color="#E64646" />
    </Div>
  )
};

export default BoardComponentActions;