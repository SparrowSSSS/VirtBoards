import { Avatar, Button, Cell, Group, Header, Link, List, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, SetStateAction, useState, MouseEvent, ReactNode } from "react";
import {BoardNameAndId, onClickRemoveBoard} from "../types";
import { Icon24Cancel, Icon24Add } from "@vkontakte/icons";
import panels from "../panels";
import { modals } from "../modals/Modals";
import localStorages from "../localStorages";
import DeleteBoardPopout from "../popouts/DeleteBoardPopout";

interface Props {
  setActivePanel: (value: SetStateAction<string>) => void,
  id: string,
  setActiveModal: (value: SetStateAction<string | null>) => void,
  setPopout: (value: SetStateAction<ReactNode | null>) => void
};

const Home: FC<Props> = ({ setActivePanel, id, setActiveModal, setPopout }) => {

  const [boardsList, setBoardsList] = useState<BoardNameAndId[]>([{ name: "Моя доска1", id: "1" }, { name: "Моя доска2", id: "2" }]);

  const removeBoard: onClickRemoveBoard = (i, e) => {
    e.stopPropagation();
    const list = [...boardsList];
    list.splice(i, 1);
    setBoardsList(list);
  };

  const handleRemoveBoard = (i: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, boardName: string) => {
    e.stopPropagation();
    setPopout(<DeleteBoardPopout boardName={boardName} setPopout={setPopout} i={i} e={e} callback={removeBoard} />);
  };

  const boardClick = (board: BoardNameAndId) => {
    localStorage.setItem(localStorages.activeBoard, board.id);
    localStorage.setItem(localStorages.activePanel, panels.board)
    setActivePanel(panels.board);
  };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group>
        <Placeholder
          icon={<Avatar size={56} />}
          header="Добро пожаловать, Новосельцев Владислав"
        >
          Мы рады видеть вас! Если вы впервые запустили приложение, то для вас не бесполезным будет ознакомление с <Link>документацией</Link>
        </Placeholder>
        <Separator />
        <Group header={<Header mode="primary">Доски</Header>}>
          {boardsList.length > 0
            ? (
              <List>
                {boardsList.map((board, i) => (
                  <Cell
                    key={board.id}
                    onClick={() => boardClick(board)}
                    after={<Icon24Cancel onClick={(e) => handleRemoveBoard(i, e, board.name)} color="#E64646" />}
                    
                  >
                    {board.name}
                  </Cell>
                ))}
              </List>
            )
            : <Placeholder>У вас нет ни одной доски</Placeholder>
          }
        </Group>
        <Button size="m" before={<Icon24Add />} onClick={() => setActiveModal(modals.addBoardModal)}>Добавить доску</Button>
      </Group>
    </Panel>
  )
};

export default Home;