import BoardBottomPanel from './bottom-panel/BoardBottomPanel';
import { FC } from 'react';
import ToolsPanel from './tools-panel/ToolsPanel';
import { Platform, usePlatform } from '@vkontakte/vkui';
import { useBoardSelector } from '../../../hooks/useStoreSelector';

const ControlInterface: FC = () => {

    const platform = usePlatform();

    const { fullscreen } = useBoardSelector();

    return (
        <>
            <BoardBottomPanel />
            {fullscreen && platform === Platform.VKCOM
                ? <ToolsPanel />
                : null
            }
        </>
    )
};

export default ControlInterface;