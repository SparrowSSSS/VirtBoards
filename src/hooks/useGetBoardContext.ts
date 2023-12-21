import { ReactNode, useState } from "react";
import { TBoardContext } from "../config/types";

const useGetBoardContext = () => {
    const [boardWindow, setBoardWindow] = useState<HTMLDivElement | null>(null);
    const [boardPopout, setBoardPopout] = useState<ReactNode | null>(null);

    const initialV: TBoardContext = {
        popout: {
            boardPopout,
            setBoardPopout
        },

        window: {
            boardWindow,
            setBoardWindow
        }
    };

    return initialV;
};

export default useGetBoardContext;