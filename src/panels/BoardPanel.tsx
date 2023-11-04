import { Div, Group, Panel, PanelHeader, PanelHeaderBack, Platform, Separator, Spinner, usePlatform } from "@vkontakte/vkui";
import { FC, useContext, useEffect, useState } from "react";
import panels from "../config/panels";
import localStorages from "../config/localStorages";
import { interfaceContext } from "./Panels";
import { BoardData, TInterfaceContext } from "../config/types";
import { dbContext } from "../App";
import { getBoardData } from "../services/generalServices";
import Board from "../components/board/Board";
import getErrorMessage from "../utils/alertError";
import errorsPS from "../config/errorsPS";
import { updateBoardData as bridgeUpdateBoardData } from "../services/bridgeServices";

interface Props {
  id: string
};

const BoardPanel: FC<Props> = ({ id }) => {

  const [boardData, setBoardData] = useState<BoardData>();
  const [updateDataInterval, setUpdateDataInterval] = useState<NodeJS.Timer | null>();

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
      getBoardData(boardId, db).then(boardData => setBoardData(boardData), error => alert(getErrorMessage(error, errorsPS.getBoardData)));
    };
  }, [boardId, db]);

  useEffect(() => {
    if (boardData) {
      const interval = setInterval(() => {
        bridgeUpdateBoardData((boardData as BoardData).id, boardData as BoardData).catch(e => alert(e));
      }, 10000);

      if (updateDataInterval) clearInterval(updateDataInterval)

      setUpdateDataInterval(interval);
    };
  }, [boardData]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => goBack(panels.home)} label={platform === Platform.VKCOM ? 'Назад' : undefined} />}
      >
        {!boardData ? "Доска" : boardData.name}
      </PanelHeader>
      <Group>
        {!boardData ? (<Spinner size="large"></Spinner>) : (<Board setBoardData={setBoardData} setFullScreenBoard={setFullScreenBoard} boardData={boardData} fullScreenBoard={fullScreenBoard} />)}
        <Separator />
        <Div style={{ textAlign: "center" }}>Чтобы воспользоваться полным функционалом виртуальной доски, разверните её на весь экран</Div>
      </Group>
    </Panel>
  )
};

export default BoardPanel;