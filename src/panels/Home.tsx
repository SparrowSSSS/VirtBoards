import { Avatar, Group, Link, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, useContext, useEffect, useState } from "react";
import { BoardNameAndId, TInterfaceContext } from "../types";
import BoardsList from "../components/BoardsList";
import { dbContext } from "../App";
import getBoardsList from "../services/getBoadrsList";
import { interfaceContext } from "./Panels";
import panels from "../panels";
import localStorages from "../localStorages";

interface Props {
  id: string
};

const Home: FC<Props> = ({ id }) => {

  const { boards: { setBoardsList }, panels: { setActivePanel } } = useContext(interfaceContext) as TInterfaceContext;

  const db = useContext(dbContext);

  const go = (nextPanel: string) => {
    localStorage.setItem(localStorages.activePanel, nextPanel);
    setActivePanel(nextPanel);
  };

  useEffect(() => {
    if (db) {
      getBoardsList(db).then(boardsList => setBoardsList(boardsList), error => alert("Произошла ошибка: " + (error as Error).message));
    };
  }, [db]);

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group>
        <Placeholder
          icon={<Avatar size={56} />}
          header="Добро пожаловать, Новосельцев Владислав"
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