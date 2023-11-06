import { Div, Link } from '@vkontakte/vkui';
import { FC, MouseEvent, useContext, useEffect, useState } from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { BoardNameAndId, TInterfaceContext } from '../../config/types';
import { interfaceContext } from '../../panels/Panels';
import DeleteBoardPopout from '../../popouts/DeleteBoardPopout';
import { Icon24DownloadOutline } from '@vkontakte/icons';
import styles from "./BoardComponentAfter.module.css";
import { getBoardData } from '../../services/generalServices';
import { dbContext } from '../../App';
import getErrorMessage from '../../utils/alertError';
import errorsPS from '../../config/errorsPS';

interface Props {
  board: BoardNameAndId
};

export const BoardComponentActions: FC<Props> = ({ board }) => {

  const { popouts: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

  const db = useContext(dbContext);

  const handleRemoveBoard = (boardId: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, boardName: string) => {
    e.stopPropagation();
    setPopout(<DeleteBoardPopout boardName={boardName} boardId={boardId} />);
  };

  const downloadBoard = async (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, boardId: number) => {
    e.stopPropagation();

    if (db) {
      let boardData;

      try {
        boardData = await getBoardData(boardId, db);
      } catch (error) {
        alert(getErrorMessage(error, errorsPS.getUserName))
      };

      const data = {name: boardData?.name, settings: boardData?.settings, components: boardData?.components};

      const blob = new Blob([JSON.stringify(data)], {type: "application/json"});

      const link = document.createElement('a');
      link.download = `${board.name}.json`;
      link.href = URL.createObjectURL(blob);

      link.click();

      URL.revokeObjectURL(link.href);
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