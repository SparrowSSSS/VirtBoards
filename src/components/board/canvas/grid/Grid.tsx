import { Graphics as TGraphics } from '@pixi/graphics';
import { Graphics } from '@pixi/react';
import { FC, useCallback, useContext } from 'react';
import canvasConfig from '../../../../config/canvas';
import { TCanvasContext } from '../../../../config/types';
import { canvasContext } from '../Canvas';

const Grid: FC = () => {

  const sizeRect = 20;
  const gridColor = 0xCCCCCC;

  const { data: { scroll, windowSize } } = useContext(canvasContext) as TCanvasContext;

  const drawGrid = useCallback((g: TGraphics) => {
    g.clear();
    g.lineStyle(1, gridColor, 1);

    const countLineY = Math.ceil(canvasConfig.width / sizeRect);
    const countLineX = Math.ceil(canvasConfig.height / sizeRect);

    const minX = 0 - scroll.x;
    const minY = 0 - scroll.y;

    const maxX = canvasConfig.width - scroll.x;
    const maxY = canvasConfig.height - scroll.y;

    for (let w = 1; w <= countLineX; w++) {
      const Y = minY + w * sizeRect;

      g.moveTo(minX, Y);
      g.lineTo(maxX, Y);
    };

    for (let h = 1; h <= countLineY; h++) {
      const X = minX + h * sizeRect;

      g.moveTo(X, minY);
      g.lineTo(X, maxY);
    };
  }, [scroll, windowSize]);

  return (
    <Graphics draw={drawGrid} />
  )
};

export default Grid;