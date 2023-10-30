import { Alert } from '@vkontakte/vkui';
import { FC, SetStateAction, ReactNode, MouseEvent } from 'react'
import { onClickRemoveBoard } from '../types';

interface Props {
  callback: onClickRemoveBoard,
  setPopout: (value: SetStateAction<ReactNode | null>) => void,
  i: number,
  e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
  boardName: string
};

const DeleteBoardPopout: FC<Props> = ({ callback, setPopout, i, e, boardName }) => {
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
          action: () => callback(i, e)
        }
      ]}
      actionsLayout="horizontal"
      header="Подтвердите удаление"
      text={`Вы уверены, что хотите удалить "${boardName}" ?`}
    />
  )
};

export default DeleteBoardPopout;