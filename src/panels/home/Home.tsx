import { Avatar, Group, Link, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, useContext, useEffect } from "react";
import { TInterfaceContext } from "../../config/types";
import BoardsList from "../../components/board-list/BoardsList";
import { interfaceContext } from "../Panels";
import panels from "../../config/panels";
import errorsPS from "../../config/errorsPS";
import BridgeStorage from "../../services/bridgeServices";
import GeneralService from "../../services/generalServices";
import { useQuery } from "@tanstack/react-query";
import queryTags from "../../config/queryTags";

interface Props {
  id: string
};

const Home: FC<Props> = ({ id }) => {

  const { func: { catchError }, boards: { setBoardsList }, panels: { setActivePanel }, user: { userName, setUserName } } = useContext(interfaceContext) as TInterfaceContext;

  const go = (nextPanel: string) => {
    setActivePanel(nextPanel);
  };

  const name = useQuery({ queryKey: [queryTags.userName], queryFn: () => BridgeStorage.getUserName() });
  if (name.error) catchError(name.error, errorsPS.getUserName);

  const boardsList = useQuery({ queryKey: [queryTags.boardsList], queryFn: () => GeneralService.getBoardsList("init") });
  if (boardsList.error) catchError(boardsList.error, errorsPS.getBoardsList);

  useEffect(() => {
    if (name.data) setUserName(name.data);
    if (boardsList.data) setBoardsList(boardsList.data);
  }, [name.data, boardsList.data]);

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group>
        <Placeholder
          icon={<Avatar size={56} />}
          header={`Добро пожаловать, ${userName ? userName : "..."}`}
        >
          Мы рады видеть вас! Если вы впервые запустили приложение, то для вас не бесполезным будет ознакомление с <Link onClick={() => go(panels.documentation)}>документацией</Link>
        </Placeholder>
        <Separator />
        <BoardsList />
      </Group>
    </Panel>
  )
};

export default Home;