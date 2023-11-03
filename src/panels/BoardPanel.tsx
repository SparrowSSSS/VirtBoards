import { Div, Group, Panel, PanelHeader, PanelHeaderBack, Platform, Separator, Spinner, usePlatform } from "@vkontakte/vkui";
import { FC, useContext, useEffect, useState } from "react";
import panels from "../panels";
import localStorages from "../localStorages";
import { interfaceContext } from "./Panels";
import { BoardData, TInterfaceContext } from "../types";
import { dbContext } from "../App";
import { getBoardData } from "../services/indexedDBServices";
import Board from "../components/board/Board";
import getErrorMessage from "../utils/alertError";

interface Props {
  id: string
};

const BoardPanel: FC<Props> = ({ id }) => {

  const [boardData, setBoardData] = useState<BoardData>();

  const [fullScreenBoard, setFullScreenBoard] = useState(false);

  const { panels: { setActivePanel } } = useContext(interfaceContext) as TInterfaceContext;

  const db = useContext(dbContext);

  const boardId = Number(localStorage.getItem(localStorages.activeBoard));

  const goBack = (nextPanel: string) => {
    localStorage.setItem(localStorages.activePanel, nextPanel);
    setActivePanel(nextPanel);
  };

  const platform = usePlatform();

  useEffect(() => {
    if (db) {
      getBoardData(db, boardId).then(boardData => setBoardData(boardData), error => alert(getErrorMessage(error, "Не удалось получить данные доски")));
    };
  }, [boardId, db]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => goBack(panels.home)} label={platform === Platform.VKCOM ? 'Назад' : undefined} />}
      >
        {!boardData ? "Доска" : boardData.name}
      </PanelHeader>
      <Group>
        {!boardData ? (<Spinner size="large"></Spinner>) : (<Board setBoardData={setBoardData} setFullScreenBoard={setFullScreenBoard} boardData={boardData} fullScreenBoard={fullScreenBoard}/>)}
        <Separator />
        <Div style={{ textAlign: "center" }}>Чтобы воспользоваться полным функционалом виртуальной доски, разверните её на весь экран</Div>
      </Group>
    </Panel>
  )
};

export default BoardPanel;