import { Avatar, Group, Link, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { TInterfaceContext } from "../config/types";
import BoardsList from "../components/BoardsList";
import { dbContext } from "../App";
import { getBoardsList } from "../services/bridgeServices";
import { interfaceContext } from "./Panels";
import panels from "../config/panels";
import localStorages from "../config/localStorages";
import { getUserName } from "../services/bridgeServices";
import getErrorMessage from "../utils/alertError";
import errorsPS from "../config/errorsPS";

interface Props {
  id: string
};

const Home: FC<Props> = ({ id }) => {

  const { boards: { setBoardsList }, panels: { setActivePanel }, user: {setUserName, userName} } = useContext(interfaceContext) as TInterfaceContext;

  const db = useContext(dbContext);

  const go = (nextPanel: string) => {
    localStorage.setItem(localStorages.activePanel, nextPanel);
    setActivePanel(nextPanel);
  };

  useEffect(() => {
    if (db) {
      getBoardsList().then(boardsList => setBoardsList(boardsList), error => alert(getErrorMessage(error, errorsPS.getBoardsList)));
    };
  }, [db]);

  useEffect(() => {
    getUserName().then(name => setUserName(name), error => alert(getErrorMessage(error, errorsPS.getUserName)));
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