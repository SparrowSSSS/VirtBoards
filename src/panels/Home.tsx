import { Avatar, Group, Link, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, useContext, useEffect } from "react";
import { TInterfaceContext } from "../config/types";
import BoardsList from "../components/BoardsList";
import { interfaceContext } from "./Panels";
import panels from "../config/panels";
import localStorages from "../config/localStorages";
import getErrorMessage from "../utils/getErrorMessage";
import errorsPS from "../config/errorsPS";
import BridgeStorage from "../services/bridgeServices";
import ErrorPopout from "../popouts/ErrorPopout";

interface Props {
  id: string
};

const Home: FC<Props> = ({ id }) => {

  const { boards: { setBoardsList }, panels: { setActivePanel }, user: {setUserName, userName}, popouts: {setPopout} } = useContext(interfaceContext) as TInterfaceContext;

  const go = (nextPanel: string) => {
    localStorage.setItem(localStorages.activePanel, nextPanel);
    setActivePanel(nextPanel);
  };

  useEffect(() => {
    BridgeStorage.getBoardsList().then(boardsList => setBoardsList(boardsList), error => setPopout(<ErrorPopout message={getErrorMessage(error)} errorPS={errorsPS.getBoardsList} />));
    BridgeStorage.getUserName().then(name => setUserName(name), error => setPopout(<ErrorPopout message={getErrorMessage(error)} errorPS={errorsPS.getUserName} />));
  }, []);

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