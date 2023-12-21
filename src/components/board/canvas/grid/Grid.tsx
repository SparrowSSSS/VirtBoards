import { Graphics as TGraphics } from '@pixi/graphics';
import { Graphics } from '@pixi/react';
import { FC, useCallback } from 'react';
import canvasConfig from '../../../../config/canvas';
import { useCanvasSelector } from '../../../../hooks/useStoreSelector';

const Grid: FC = () => {

  const { scroll } = useCanvasSelector();

  const drawGrid = useCallback((g: TGraphics) => {
    g.clear();
    g.lineStyle(1, canvasConfig.gridColor, 1);

    const countLineY = Math.ceil(canvasConfig.width / canvasConfig.sizeRect);
    const countLineX = Math.ceil(canvasConfig.height / canvasConfig.sizeRect);

    const minX = 0 - scroll.x;
    const minY = 0 - scroll.y;

    const maxX = canvasConfig.width - scroll.x;
    const maxY = canvasConfig.height - scroll.y;

    for (let w = 1; w <= countLineX; w++) {
      const Y = minY + w * canvasConfig.sizeRect;

      g.moveTo(minX, Y);
      g.lineTo(maxX, Y);
    };

    for (let h = 1; h <= countLineY; h++) {
      const X = minX + h * canvasConfig.sizeRect;

      g.moveTo(X, minY);
      g.lineTo(X, maxY);
    };
  }, [scroll]);

  return (
    <Graphics draw={drawGrid} />
  )
};

export default Grid;