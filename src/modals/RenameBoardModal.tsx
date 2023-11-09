import { FC } from 'react';
import AddAndRenameBoardForm from '../components/add-and-rename-board-form/AddAndRenameBoardForm';

interface Props {
  boardId: number,
  boardName: string,
  index: number
};

const RenameBoardModal: FC<Props> = ({ boardId, boardName, index }) => {
  return (
    <AddAndRenameBoardForm type="rename" name={boardName} boardId={boardId} index={index} />
  )
};

export default RenameBoardModal;