import { Avatar, Group, Link, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, useContext, useEffect, useState } from "react";
import { TInterfaceContext } from "../config/types";
import BoardsList from "../components/BoardsList";
import { dbContext } from "../App";
import { getBoardsList } from "../services/bridgeServices";
import { interfaceContext } from "./Panels";
import panels from "../config/panels";
import localStorages from "../config/localStorages";
import { getUserName } from "../services/bridgeServices";
import getErrorMessage from "../utils/alertError";

interface Props {
  id: string
};

const Home: FC<Props> = ({ id }) => {

  const { boards: { setBoardsList }, panels: { setActivePanel } } = useContext(interfaceContext) as TInterfaceContext;

  const [userName, setUserName] = useState("");

  const db = useContext(dbContext);

  const go = (nextPanel: string) => {
    localStorage.setItem(localStorages.activePanel, nextPanel);
    setActivePanel(nextPanel);
  };

  useEffect(() => {
    if (db) {
      getBoardsList().then(boardsList => setBoardsList(boardsList), error => alert(getErrorMessage(error, "Не удалось получить список досок")));
    };

    getUserName().then(name => setUserName(name), error => alert(getErrorMessage(error, "Не удалось получить имя пользователя")));
  }, [db]);

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