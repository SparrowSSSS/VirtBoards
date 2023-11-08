import { Button, FormItem, FormLayout, Group, Input } from '@vkontakte/vkui';
import { FC, useContext, useState } from 'react';
import errorsPS from '../config/errorsPS';
import { BoardNameAndId, TInterfaceContext } from '../config/types';
import { interfaceContext } from '../panels/Panels';
import GeneralServices from '../services/generalServices';
import getErrorMessage from '../utils/getErrorMessage';
import checkOrigin from '../utils/checkOrigin';
import validateBoardName from '../utils/validateBoardName';
import ErrorPopout from '../popouts/ErrorPopout';
import BridgeStorage from '../services/bridgeServices';

interface Props {
  boardId: number,
  boardName: string,
  index: number
};

const RenameBoardModal: FC<Props> = ({ boardId, boardName, index }) => {

  const [newBoardName, setNewBoardName] = useState(boardName);

  const [error, setError] = useState<{ isError: boolean, message: string }>({ isError: false, message: "" });

  const { modals: { setActiveModal }, boards: { boardsList, setBoardsList }, popouts: { setPopout }, loading: { setIsLoading } } = useContext(interfaceContext) as TInterfaceContext;

  const handleRenameBoard = async () => {
    setIsLoading(true);

    try {
      const vBoardName = validateBoardName(newBoardName);

      const bridgeBoardsList = await BridgeStorage.getBoardsList();

      if (!vBoardName) setError({ isError: true, message: "Это обязательное поле" });
      else if (!checkOrigin(vBoardName, bridgeBoardsList)) setError({ isError: true, message: "Доска с подобным именем уже существует" });
      else if (boardsList !== "loading" && !error.isError) {
        await GeneralServices.renameBoard(boardId, vBoardName);

        const newBoardsList = [...boardsList];

        newBoardsList.splice(index, 1);

        newBoardsList.push({ id: boardId, name: vBoardName });

        setBoardsList(newBoardsList);
        setActiveModal(null);
      };

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setPopout(<ErrorPopout message={getErrorMessage(e)} errorPS={errorsPS.renameBoard} />);
      return;
    };
  };

  const changeNewBoardName = (newBoardName: string) => {
    if (error.isError) setError({ isError: false, message: "" });
    setNewBoardName(newBoardName);
  };


  return (
    <Group>
      <FormLayout>
        <FormItem htmlFor="board-rename-name" top="Новое название доски" status={error.isError ? "error" : "default"} bottom={error.message}>
          <Input
            id="board-name-new"
            type="text"
            name="board-name-new"
            value={newBoardName}
            onChange={(e) => changeNewBoardName(e.target.value)}
            placeholder="Введите новое название для доски"
            maxLength={30}
          />
        </FormItem>
        <FormItem>
          <Button size="m" onClick={() => handleRenameBoard()}>Переименовать</Button>
        </FormItem>
      </FormLayout>
    </Group>
  )
};

export default RenameBoardModal;