import { Alert } from '@vkontakte/vkui';
import { FC, useContext } from 'react'
import { TInterfaceContext, onClickRemoveBoard, BoardNameAndId } from '../config/types';
import { interfaceContext } from '../panels/Panels';
import { dbContext } from '../App';
import { deleteBoard } from '../services/generalServices';
import getErrorMessage from '../utils/alertError';

interface Props {
  boardId: number,
  boardName: string
};

const DeleteBoardPopout: FC<Props> = ({ boardId, boardName }) => {

  const { popouts: { setPopout }, boards: { boardsList, setBoardsList } } = useContext(interfaceContext) as TInterfaceContext;

  const db = useContext(dbContext);

  const removeBoard: onClickRemoveBoard = async (boardId) => {
    if (db) {
      try {
        await deleteBoard(boardId, db);
      } catch (e) {
        alert(getErrorMessage(e, "Не удалось удалить доску"));
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

  return (
    <Alert
      onClose={() => setPopout(null)}
      actions={[
        {
          title: 'Отмена',
          autoClose: true,
          mode: 'cancel',
        },

        {
          title: "Удалить доску",
          mode: "destructive",
          autoClose: true,
          action: () => removeBoard(boardId)
        }
      ]}
      actionsLayout="horizontal"
      header="Подтвердите удаление"
      text={`Вы уверены, что хотите удалить "${boardName}" ?`}
    />
  )
};

export default DeleteBoardPopout;