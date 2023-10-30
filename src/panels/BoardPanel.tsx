import { Panel, PanelHeader, PanelHeaderBack, Platform, usePlatform } from "@vkontakte/vkui";
import {FC, SetStateAction} from "react";
import panels from "../panels";
import localStorages from "../localStorages";

interface Props {
    setActivePanel: (value: SetStateAction<string>) => void,
    id: string
};

const BoardPanel: FC<Props> = ({setActivePanel, id}) => {

  const goBack = (nextPanel: string) => {
    localStorage.setItem(localStorages.activePanel, nextPanel);
    setActivePanel(nextPanel);
  };

  const platform = usePlatform();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => goBack(panels.home)} label={platform === Platform.VKCOM ? 'Назад' : undefined} />}
      >
        Доска
      </PanelHeader>
    </Panel>
  )
};

export default BoardPanel;