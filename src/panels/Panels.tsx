import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { useState } from "react";
import Home from "./Home";
import BoardPanel from "./BoardPanel";

const panels = ["home", "board"]

const Panels = () => {

  const [activePanel, setActivePanel] = useState(panels[0]);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
            <Home setActivePanel={setActivePanel} id={panels[0]}/>
            <BoardPanel setActivePanel={setActivePanel} id={panels[1]}/>
        </View>
      </SplitCol>
    </SplitLayout>
  )
};

export default Panels;