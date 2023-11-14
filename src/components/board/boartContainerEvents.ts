import { SetStateAction, WheelEvent } from "react";
import cursors from "../../config/cursors";

class BoardEvents {

    boardWindow: HTMLDivElement;
    boardContainer: HTMLDivElement;
    setActiveCursor: (value: SetStateAction<string>) => void;

    constructor(boardWindow: HTMLDivElement, boardContainer: HTMLDivElement, setActiveCursor: (value: SetStateAction<string>) => void) {
        this.boardWindow = boardWindow;
        this.boardContainer = boardContainer;
        this.setActiveCursor = setActiveCursor;
    }

    boardWindowWhell(e: WheelEvent<HTMLDivElement>) {
        e.preventDefault();

        if (this.boardWindow) {
            this.boardWindow.scrollBy(0, e.deltaY);
        };
    }

    boardMouseMove(startX: number, startY: number, newX: number, newY: number) {
        this.boardWindow.scrollBy(newX - startX, newY - startY);
    };

    addEvents() {
        this.boardContainer.addEventListener("wheel", e => {
            this.boardWindowWhell((e as unknown) as WheelEvent<HTMLDivElement>);
        }, { passive: false });

        this.boardContainer.addEventListener("mousedown", e => {
            if (e.button === 1) {
                this.setActiveCursor(cursors.grabbing);

                const startX = e.clientX;
                const startY = e.clientY;

                const mouseMove = (e: MouseEvent) => {
                    this.boardMouseMove(startX, startY, e.clientX, e.clientY);
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