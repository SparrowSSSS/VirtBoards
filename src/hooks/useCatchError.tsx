import { setStateF, TCatchError } from "../config/types";
import ErrorPopout from "../popouts/ErrorPopout";
import getErrorMessage from "../utils/getErrorMessage";
import { ReactNode } from "react";

const useCatchError = (setPopout: setStateF<ReactNode | null>) => {

    const func: TCatchError = (error, ps) => {
        setPopout(<ErrorPopout message={getErrorMessage(error)} errorPS={ps} setPopout={setPopout} />)
    };

    return func;
};

export default useCatchError