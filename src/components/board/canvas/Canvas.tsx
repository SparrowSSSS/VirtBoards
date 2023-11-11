import { Stage } from '@pixi/react';
import { FC } from 'react';
import canvasConfig from '../../../config/canvas';

const Canvas: FC = () => {
    return (
        <Stage width={canvasConfig.width} height={canvasConfig.height} options={{backgroundColor: "#EBEDF0"}}>

        </Stage>
    )
};

export default Canvas;