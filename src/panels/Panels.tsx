import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { useState, ReactNode } from "react";
import Home from "./Home";
import BoardPanel from "./BoardPanel";
import panels from "../panels";
import Modals from "../modals/Modals";
import localStorages from "../localStorages";

const Panels = () => {

  const [activePanel, setActivePanel] = useState(localStorage.getItem(localStorages.activePanel) || panels.home);
  const [activeModal, setActiveModal] = useState<string| null>(null);
  const [popout, setPopout] = useState<ReactNode | null>(null)

  return (
    <SplitLayout popout={popout} modal={<Modals setActiveModal={setActiveModal} activeModal={activeModal} />}>
      <SplitCol>
        <View activePanel={activePanel}>
            <Home setPopout={setPopout} setActivePanel={setActivePanel} setActiveModal={setActiveModal} id={panels.home}/>
            <BoardPanel setActivePanel={setActivePanel} id={panels.board}/>
        </View>
      </SplitCol>
    </SplitLayout>
  )
};

export default Panels;