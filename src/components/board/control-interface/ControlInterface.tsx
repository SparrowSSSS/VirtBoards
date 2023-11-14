import BoardBottomPanel from './bottom-panel/BoardBottomPanel';
import { FC, useContext } from 'react';
import { boardContext } from '../Board';
import { TBoardContext } from '../../../config/types';
import ToolsPanel from './tools-panel/ToolsPanel';

const ControlInterface: FC = () => {

    const { fullscreen: { fullScreenBoard } } = useContext(boardContext) as TBoardContext;

    return (
        <>
            <BoardBottomPanel />
            {fullScreenBoard
                ? <ToolsPanel />
                : null
            }
        </>
    )
};

export default ControlInterface;