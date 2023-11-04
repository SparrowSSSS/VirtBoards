import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { useState, ReactNode, createContext } from "react";
import Home from "./Home";
import BoardPanel from "./BoardPanel";
import panels from "../config/panels";
import Modals from "../modals/Modals";
import localStorages from "../config/localStorages";
import { BoardNameAndId, TInterfaceContext } from "../config/types";
import Documentation from "./Documentation";

export const interfaceContext = createContext<TInterfaceContext | undefined>(undefined);

const Panels = () => {

  const [activePanel, setActivePanel] = useState(localStorage.getItem(localStorages.activePanel) || panels.home);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [popout, setPopout] = useState<ReactNode | null>(null);
  const [boardsList, setBoardsList] = useState<BoardNameAndId[] | "loading">("loading");

  const valueInterfaceContext: TInterfaceContext = {
    panels: {
      activePanel,
      setActivePanel
    },

    modals: {
      activeModal,
      setActiveModal
    },

    popouts: {
      popout,
      setPopout
    },

    boards: {
      boardsList,
      setBoardsList
    }
  };

  return (
    <interfaceContext.Provider value={valueInterfaceContext}>
      <SplitLayout modal={<Modals />} popout={popout}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id={panels.home} />
            <BoardPanel id={panels.board} />
            <Documentation id={panels.documentation} />
          </View>
        </SplitCol>
      </SplitLayout>
    </interfaceContext.Provider>
  )
};

export default Panels;