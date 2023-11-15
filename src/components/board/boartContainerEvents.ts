import { SetStateAction } from "react";
import cursors from "../../config/cursors";

class BoardEvents {

    boardWindow: HTMLDivElement;
    boardContainer: HTMLDivElement;
    setActiveCursor: (value: SetStateAction<string>) => void;

    wheelK = 150;
    mouseMoveK = 5;

    constructor(boardWindow: HTMLDivElement, boardContainer: HTMLDivElement, setActiveCursor: (value: SetStateAction<string>) => void) {
        this.boardWindow = boardWindow;
        this.boardContainer = boardContainer;
        this.setActiveCursor = setActiveCursor;
    }

    boardWindowWhell(deltaY: number) {
        if (this.boardWindow) {
            let by;

            if (deltaY > 0) by = this.wheelK;
            else by = -this.wheelK;

            this.boardWindow.scrollBy(0, by);
        };
    }

    boardMouseMove(newX: number, newY: number, x: number, y: number) {
        let byX = 0;
        let byY = 0;

        if (newX < x) byX = this.mouseMoveK;
        else if (newX > x) byX = -this.mouseMoveK;

        if (newY < y) byY = this.mouseMoveK;
        else if (newY > y) byY = -this.mouseMoveK;

        this.boardWindow.scrollBy(byX, byY);
    };

    addEvents() {
        this.boardContainer.addEventListener("wheel", e => {
            e.preventDefault();
            this.boardWindowWhell(e.deltaY);
        }, { passive: false });

        this.boardContainer.addEventListener("mousedown", e => {
            e.preventDefault();

            if (e.button === 1) {
                this.setActiveCursor(cursors.grabbing);

                let x = e.clientX;
                let y = e.clientY;

                const mouseMove = (e: MouseEvent) => {
                    this.boardMouseMove(e.clientX, e.clientY, x, y);
                    x = e.clientX;
                    y = e.clientY;
                };

                this.boardContainer.addEventListener("mousemove", mouseMove);

                this.boardContainer.addEventListener("mouseup", () => {
                    this.boardContainer.removeEventListener("mousemove", mouseMove);
                    this.setActiveCursor(cursors.cursor);
                }, { once: true });
            };
        });
    }
};

export default BoardEvents;