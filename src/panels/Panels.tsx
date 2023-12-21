import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import panels from "../config/panels";
import Modals from "../modals/Modals";
import styles from "./Panels.module.css"
import Home from "./home/Home";
import Documentation from "./documentation/Documentation";
import BoardPanel from "./board-panel/BoardPanel";
import { useInterfaceSelector } from "../hooks/useStoreSelector";
import { createContext } from "react";
import { TInterfaceContext } from "../config/types";
import useGetInterfaceContext from "../hooks/useGetInterfaceContext";

export const interfaceContext = createContext<TInterfaceContext | null>(null);


const Panels = () => {

  const { isLoading, activePanel } = useInterfaceSelector();

  const interfaceContextValue = useGetInterfaceContext();

  const { popout: { interfacePopout }, snackbar: { interfaceSnackbar } } = interfaceContextValue;

  return (
    <interfaceContext.Provider value={interfaceContextValue}>
      {isLoading ? <div className={styles.loadingOverlay} /> : null}
      <SplitLayout modal={<Modals />} popout={interfacePopout}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id={panels.home} />
            <BoardPanel id={panels.board} />
            <Documentation id={panels.documentation} />
          </View>
        </SplitCol>
        {interfaceSnackbar}
      </SplitLayout>
    </interfaceContext.Provider>
  )
};

export default Panels;