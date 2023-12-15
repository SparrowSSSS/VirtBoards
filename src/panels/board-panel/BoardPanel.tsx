import { Div, Group, Panel, PanelHeader, PanelHeaderBack, Platform, Separator, Spinner, usePlatform } from "@vkontakte/vkui";
import { FC } from "react";
import panels from "../../config/panels";
import localStorages from "../../config/localStorages";
import Board from "../../components/board/Board";
import errorsPS from "../../config/errorsPS";
import useBoardData from "../../hooks/useBoardData";
import { useBoardActions, useInterfaceActions } from "../../hooks/useActions";
import { useCatchInterfaceError } from "../../hooks/useCatchError";

interface Props {
  id: string
};

const BoardPanel: FC<Props> = ({ id }) => {

  const { setPanel } = useInterfaceActions();

  const { setBoardData } = useBoardActions();

  const catchError = useCatchInterfaceError();

  const boardId = Number(localStorage.getItem(localStorages.activeBoard));

  const goBack = (nextPanel: string) => {
    setPanel(nextPanel);
  };

  const platform = usePlatform();

  const { error, data } = useBoardData().query(boardId);

  if (data) setBoardData(data);
  else if (error) catchError(error, errorsPS.getBoardData);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => goBack(panels.home)} label={platform === Platform.VKCOM ? 'Назад' : undefined} />}
      >
        {!data ? "Доска" : data.name}
      </PanelHeader>
      <Group>
        {!data ? (<Spinner size="large" style={{ paddingBottom: "20px" }}></Spinner>) : (<Board />)}
        <Separator />
        <Div style={{ textAlign: "center" }}>Чтобы воспользоваться полным функционалом виртуальной доски, разверните её на весь экран</Div>
      </Group>
    </Panel>
  )
};

export default BoardPanel;