import { TScroll, TWindowSize } from "../../../config/types";

type TStateDataCanvas = { scroll: TScroll, windowSize: TWindowSize };

const checkChanges = (boardWindow: HTMLDivElement, stateData: TStateDataCanvas) => {
    const bwScroll = boardWindow.scrollTop + boardWindow.scrollLeft;
    const sdScroll = stateData.scroll.x + stateData.scroll.y;

    const bwSize = boardWindow.clientWidth + boardWindow.clientHeight;
    const sdSize = stateData.windowSize.w + stateData.windowSize.h

    if (bwScroll !== sdScroll || bwSize !== sdSize) return true;

    return false;
};

export { checkChanges };