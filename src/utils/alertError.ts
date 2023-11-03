const getErrorMessage = (error: any, ps: string): string => {
    if (error instanceof Error && error.message) {
        if (ps) {
            return `${ps} : ${error.message}`;
        } else {
            return error.message;
        };
    } else {
        return ps;
    };
};

export default getErrorMessage;