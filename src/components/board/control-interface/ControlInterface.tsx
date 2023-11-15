import BoardBottomPanel from './bottom-panel/BoardBottomPanel';
import { FC, useContext } from 'react';
import { boardContext } from '../Board';
import { TBoardContext } from '../../../config/types';
import ToolsPanel from './tools-panel/ToolsPanel';
import { Platform, usePlatform } from '@vkontakte/vkui';

const ControlInterface: FC = () => {

    const { fullscreen: { fullScreenBoard } } = useContext(boardContext) as TBoardContext;

    const platform = usePlatform();

    return (
        <>
            <BoardBottomPanel />
            {fullScreenBoard && platform === Platform.VKCOM
                ? <ToolsPanel />
                : null
            }
        </>
    )
};

export default ControlInterface;