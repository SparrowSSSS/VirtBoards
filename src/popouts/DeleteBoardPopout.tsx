import { Alert } from '@vkontakte/vkui';
import { FC, MouseEvent, useContext } from 'react'
import { TInterfaceContext, onClickRemoveBoard } from '../types';
import { interfaceContext } from '../panels/Panels';

interface Props {
  callback: onClickRemoveBoard,
  boardId: number,
  boardName: string
};

const DeleteBoardPopout: FC<Props> = ({ callback, boardId, boardName }) => {

  const {popouts: {setPopout}} = useContext(interfaceContext) as TInterfaceContext;

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
          action: () => callback(boardId)
        }
      ]}
      actionsLayout="horizontal"
      header="Подтвердите удаление"
      text={`Вы уверены, что хотите удалить "${boardName}" ?`}
    />
  )
};

export default DeleteBoardPopout;