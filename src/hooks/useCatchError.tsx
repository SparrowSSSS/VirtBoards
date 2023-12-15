import { TCatchError } from "../config/types";
import { useInterfaceActions, useBoardActions } from "./useActions";
import ErrorPopout from "../popouts/ErrorPopout";
import getErrorMessage from "../utils/getErrorMessage";

export const useCatchInterfaceError = () => {
    const setP = useInterfaceActions().setPopout;

    const func: TCatchError = (error, ps) => {
        setP(<ErrorPopout message={getErrorMessage(error)} errorPS={ps} />)
    };

    return func;
};

export const useCatchVirtBoardError = () => {
    const setP = useBoardActions().setPopout;

    const func: TCatchError = (error, ps) => {
        setP(<ErrorPopout message={getErrorMessage(error)} errorPS={ps} />)
    };

    return func;
};