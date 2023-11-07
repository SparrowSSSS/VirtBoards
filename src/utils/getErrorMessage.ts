const getErrorMessage = (error: any): string => {
    if (error instanceof Error && error.message) {
        return error.message
    } else {
        return "";
    };
};

export default getErrorMessage;