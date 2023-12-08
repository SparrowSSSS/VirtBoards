import { TStateDataCanvas } from "../../../config/types";

const checkChanges = (boardWindow: HTMLDivElement, stateData: TStateDataCanvas) => {
    const bwScroll = boardWindow.scrollTop + boardWindow.scrollLeft;
    const sdScroll = stateData.scroll.x + stateData.scroll.y;

    const bwSize = boardWindow.clientWidth + boardWindow.clientHeight;
    const sdSize = stateData.windowSize.x + stateData.windowSize.y

    if (bwScroll !== sdScroll || bwSize !== sdSize) return true;

    return false;
};

export { checkChanges };