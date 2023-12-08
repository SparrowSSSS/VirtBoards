import { Alert } from '@vkontakte/vkui';
import { FC, useContext } from 'react'
import { TInterfaceContext, onClickRemoveBoard, BoardNameAndId } from '../config/types';
import useBoardMutation from '../hooks/useBoardMutation';
import { interfaceContext } from '../panels/Panels';

interface Props {
  boardId: number,
  boardName: string
};

const DeleteBoardPopout: FC<Props> = ({ boardId, boardName }) => {

  const { popouts: { setPopout }, boards: { setBoardsList }, loading: { setIsLoading }, func: { catchError } } = useContext(interfaceContext) as TInterfaceContext;

  const deleteBoard = useBoardMutation(setIsLoading, catchError).delete(setBoardsList);

  const removeBoard: onClickRemoveBoard = async (boardId) => {
    deleteBoard.mutate({ boardId: boardId });
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