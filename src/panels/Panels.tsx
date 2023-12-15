import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import panels from "../config/panels";
import Modals from "../modals/Modals";
import styles from "./Panels.module.css"
import Home from "./home/Home";
import Documentation from "./documentation/Documentation";
import BoardPanel from "./board-panel/BoardPanel";
import { useInterfaceSelector } from "../hooks/useStoreSelector";


const Panels = () => {

  const { isLoading, popout, activePanel, snackbar } = useInterfaceSelector();

  return (
    <>
      {isLoading ? <div className={styles.loadingOverlay} /> : null}
      <SplitLayout modal={<Modals />} popout={popout}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id={panels.home} />
            <BoardPanel id={panels.board} />
            <Documentation id={panels.documentation} />
          </View>
        </SplitCol>
        {snackbar}
      </SplitLayout>
    </>
  )
};

export default Panels;