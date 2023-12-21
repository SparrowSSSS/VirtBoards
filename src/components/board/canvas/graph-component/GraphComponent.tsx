
import { Sprite } from '@pixi/react';
import { FC } from 'react';
import { BoardComponent } from '../../../../config/types';
import { useCanvasSelector } from '../../../../hooks/useStoreSelector';
import LZString from "lz-string";

type Props = {
    component: BoardComponent
};

const GraphComponent: FC<Props> = ({ component }) => {

    const { scroll } = useCanvasSelector();

    const x = component.options.position.x - scroll.x;
    const y = component.options.position.y - scroll.y;

    const decompressUrl = LZString.decompress(component.options.compressUrl);

    return (
        <>
            <Sprite image={decompressUrl} x={x} y={y} />
        </>
    )
};

export default GraphComponent;