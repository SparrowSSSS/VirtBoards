import { Div, Group, Panel, PanelHeader, PanelHeaderBack, Platform, Separator, Spinner, usePlatform } from "@vkontakte/vkui";
import { FC, useContext, useState } from "react";
import panels from "../../config/panels";
import localStorages from "../../config/localStorages";
import { interfaceContext } from "../Panels";
import { TInterfaceContext } from "../../config/types";
import Board from "../../components/board/Board";
import getErrorMessage from "../../utils/getErrorMessage";
import errorsPS from "../../config/errorsPS";
import ErrorPopout from "../../popouts/ErrorPopout";
import useBoardData from "../../hooks/useBoardData";

interface Props {
  id: string
};

const BoardPanel: FC<Props> = ({ id }) => {

  const [fullScreenBoard, setFullScreenBoard] = useState(false);

  const { func: {catchError}, panels: { setActivePanel } } = useContext(interfaceContext) as TInterfaceContext;

  const boardId = Number(localStorage.getItem(localStorages.activeBoard));

  const goBack = (nextPanel: string) => {
    setActivePanel(nextPanel);
  };

  const platform = usePlatform();

  const {error, data} = useBoardData().query(boardId);

  if (error) catchError(error, errorsPS.getBoardData);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => goBack(panels.home)} label={platform === Platform.VKCOM ? 'Назад' : undefined} />}
      >
        {!data ? "Доска" : data.name}
      </PanelHeader>
      <Group>
        {!data ? (<Spinner size="large" style={{ paddingBottom: "20px" }}></Spinner>) : (<Board setFullScreenBoard={setFullScreenBoard} data={data} fullScreenBoard={fullScreenBoard} />)}
        <Separator />
        <Div style={{ textAlign: "center" }}>Чтобы воспользоваться полным функционалом виртуальной доски, разверните её на весь экран</Div>
      </Group>
    </Panel>
  )
};

export default BoardPanel;