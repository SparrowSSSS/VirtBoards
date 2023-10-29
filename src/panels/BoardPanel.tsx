import { Panel, PanelHeader } from "@vkontakte/vkui";
import {FC, SetStateAction} from "react";

interface Props {
    setActivePanel: (value: SetStateAction<string>) => void,
    id: string
};

const BoardPanel: FC<Props> = ({setActivePanel, id}) => {
  return (
    <Panel id={id}>
      <PanelHeader>Доска</PanelHeader>
    </Panel>
  )
};

export default BoardPanel;