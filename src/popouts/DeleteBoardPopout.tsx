import { Alert } from '@vkontakte/vkui';
import { FC, useContext } from 'react'
import errorsPS from '../config/errorsPS';
import { TInterfaceContext, onClickRemoveBoard, BoardNameAndId } from '../config/types';
import { interfaceContext } from '../panels/Panels';
import GeneralServices from '../services/generalServices';
import getErrorMessage from '../utils/getErrorMessage';
import ErrorPopout from './ErrorPopout';

interface Props {
  boardId: number,
  boardName: string
};

const DeleteBoardPopout: FC<Props> = ({ boardId, boardName }) => {

  const { popouts: { setPopout }, boards: { boardsList, setBoardsList }, loading: { setIsLoading } } = useContext(interfaceContext) as TInterfaceContext;

  const removeBoard: onClickRemoveBoard = async (boardId) => {
    setIsLoading(true);

    try {
      await GeneralServices.deleteBoard(boardId);

      const list = [...(boardsList as BoardNameAndId[])];

      list.find((board, i) => {
        if (board.id === boardId) {
          list.splice(i, 1);
          return true;
        };
      });

      setIsLoading(false);
      setBoardsList(list);
    } catch (e) {
      setIsLoading(false);
      setPopout(<ErrorPopout message={getErrorMessage(e)} errorPS={errorsPS.deleteBoard} />)
      return;
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