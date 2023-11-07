import { Div, Group, Panel, PanelHeader, PanelHeaderBack, Platform, Separator, Spinner, usePlatform } from "@vkontakte/vkui";
import { FC, useContext, useEffect, useState } from "react";
import panels from "../config/panels";
import localStorages from "../config/localStorages";
import { interfaceContext } from "./Panels";
import { BoardData, TInterfaceContext } from "../config/types";
import Board from "../components/board/Board";
import getErrorMessage from "../utils/getErrorMessage";
import errorsPS from "../config/errorsPS";
import GeneralServices from "../services/generalServices";
import BridgeStorage from "../services/bridgeServices";
import ErrorPopout from "../popouts/ErrorPopout";

interface Props {
  id: string
};

const BoardPanel: FC<Props> = ({ id }) => {

  const [boardData, setBoardData] = useState<BoardData>();
  const [updateDataInterval, setUpdateDataInterval] = useState<NodeJS.Timer | null>();

  const [fullScreenBoard, setFullScreenBoard] = useState(false);

  const { panels: { setActivePanel }, popouts: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

  const boardId = Number(localStorage.getItem(localStorages.activeBoard));

  const goBack = (nextPanel: string) => {
    localStorage.setItem(localStorages.activePanel, nextPanel);
    setActivePanel(nextPanel);
  };

  const platform = usePlatform();

  useEffect(() => {
    GeneralServices.getBoardData(boardId).then(boardData => setBoardData(boardData), error => setPopout(<ErrorPopout message={getErrorMessage(error)} errorPS={errorsPS.getBoardData} />));
  }, [boardId]);

  useEffect(() => {
    if (boardData) {
      const interval = setInterval(() => {
        BridgeStorage.updateBoardData((boardData as BoardData).id, boardData as BoardData).catch(e => alert(e));
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
        {!boardData ? (<Spinner size="large" style={{ paddingBottom: "20px" }}></Spinner>) : (<Board setBoardData={setBoardData} setFullScreenBoard={setFullScreenBoard} boardData={boardData} fullScreenBoard={fullScreenBoard} />)}
        <Separator />
        <Div style={{ textAlign: "center" }}>Чтобы воспользоваться полным функционалом виртуальной доски, разверните её на весь экран</Div>
      </Group>
    </Panel>
  )
};

export default BoardPanel;