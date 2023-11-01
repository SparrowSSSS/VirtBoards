import { FC, useEffect, useRef } from 'react';
import styles from "./Grid.module.css"

interface Props {
  boardCanvasSize: {
    width: number,
    height: number
  };
};

const Grid: FC<Props> = ({boardCanvasSize}) => {

  const ref = useRef<HTMLCanvasElement>(null);

  const sizeRect = 20;

  const drawGrid = (canvas: HTMLCanvasElement) => {
    const countWidthRect = Math.ceil(boardCanvasSize.width / sizeRect);
    const countHeightRect = Math.ceil(boardCanvasSize.height / sizeRect);

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.strokeStyle = "#CCCCCC";

    for (let c = 0; c < countWidthRect; c++) {
      for (let r = 0; r < countHeightRect; r++) {
        ctx.strokeRect(c * sizeRect, r * sizeRect, sizeRect, sizeRect);
      };
    };

  };

  useEffect(() => {
    if (ref.current) {
      drawGrid(ref.current);
    };
  }, [boardCanvasSize]);

  return (
    <canvas width={boardCanvasSize.width} height={boardCanvasSize.height} className={styles.boardGrid} ref={ref}></canvas>
  )
};

export default Grid;