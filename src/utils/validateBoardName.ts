const validateBoardName = (boardName: string): string => {
    const bList = boardName.split(" ");

    const list = [];

    for (let i of bList) {
        if (i) {
            list.push(i);
        } else {
            break;
        };
    };

    return list.join(" ");
};

export default validateBoardName;