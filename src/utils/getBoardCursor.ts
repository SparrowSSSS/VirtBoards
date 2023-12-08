import cursors from "../config/cursors";

const getCursor = (fullScreenBoard: boolean, activeCursor: string) => {
    if (fullScreenBoard) {
        return activeCursor;
    } else {
        if (activeCursor !== cursors.pencil && activeCursor !== cursors.eraser) return activeCursor;
        else return cursors.cursor;
    };
};

export default getCursor;