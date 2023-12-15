import { FC } from 'react';
import { Icon24PenOutline } from '@vkontakte/icons';
import { Icon28EraserOutline } from '@vkontakte/icons';
import styles from "./ToolsPanel.module.css";
import Icon25ArrowCursor from './Icon25ArrowCursor';
import { TTool } from '../../../../config/types';
import cursors from '../../../../config/cursors';
import { useBoardSelector } from '../../../../hooks/useStoreSelector';
import { useBoardActions } from '../../../../hooks/useActions';

const ToolsPanel: FC = () => {

  const { activeTool } = useBoardSelector();
  const { setActiveCursor, setActiveTool } = useBoardActions();

  const handleButton = (tool: TTool) => {
    if (tool !== activeTool) {
      setActiveTool(tool);
      setActiveCursor(cursors[tool]);
    };
  };

  return (
    <div className={styles.toolsPanel}>
      <div className={styles.toolButton} onClick={e => handleButton("cursor")}>
        <Icon25ArrowCursor fill={activeTool === "cursor" ? "#5181B8" : ""} />
      </div>
      <div className={styles.toolButton} onClick={e => handleButton("pencil")}>
        <Icon24PenOutline className={styles.toolsPanelIcon} fill={activeTool === "pencil" ? "#5181B8" : ""} />
      </div>
      <div className={styles.toolButton} onClick={e => handleButton("eraser")}>
        <Icon28EraserOutline className={styles.toolsPanelIcon} fill={activeTool === "eraser" ? "#5181B8" : ""} />
      </div>
    </div>
  )
};

export default ToolsPanel;