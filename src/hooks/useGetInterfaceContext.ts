import { ReactNode, useState } from "react";
import { TInterfaceContext } from "../config/types";

const useGetInterfaceContext = () => {
    const [interfacePopout, setPopout] = useState<ReactNode | null>(null);
    const [interfaceSnackbar, setSnackbar] = useState<ReactNode | null>(null);

    const initialV: TInterfaceContext = {
        popout: {
            interfacePopout,
            setPopout
        },

        snackbar: {
            interfaceSnackbar,
            setSnackbar
        }
    };

    return initialV;
};

export default useGetInterfaceContext;