import { useMutation } from "@tanstack/react-query";
import GeneralService from "../services/generalServices";
import { BoardData, BoardNameAndId, TInterfaceContext } from "../config/types";
import errorsPS from "../config/errorsPS";
import { useInterfaceActions } from "./useActions";
import useCatchError from "./useCatchError";
import { useContext } from "react";
import { interfaceContext } from "../panels/Panels";

type TCallback = (list: BoardNameAndId[]) => void;

type TRenameOptions = { boardId: number, name: string };

type TDeleteOptions = { boardId: number };

type TAddOptions = { board: BoardData };

const useBoardMutation = () => {

    const setLoading = useInterfaceActions().setLoading;

    const { popout: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

    const catchError = useCatchError(setPopout);

    const deleteBoard = (options: TDeleteOptions) => {
        setLoading(true);
        return GeneralService.deleteBoard(options.boardId);
    };

    const addBoard = (options: TAddOptions) => {
        setLoading(true);
        return GeneralService.addBoard(options.board);
    };

    const renameBoard = (options: TRenameOptions) => {
        setLoading(true);
        return GeneralService.renameBoard(options.boardId, options.name);
    };

    return {
        delete: (callback?: TCallback) => {
            return useMutation({
                mutationFn: (options: TDeleteOptions) => deleteBoard(options),
                onSettled: () => setLoading(false),
                onError: (error) => catchError(error, errorsPS.deleteBoard),
                onSuccess: (data) => {
                    if (callback) callback(data);
                }
            });
        },

        add: (callback?: TCallback) => {
            return useMutation({
                mutationFn: (options: TAddOptions) => addBoard(options),
                onSettled: () => setLoading(false),
                onError: (error) => catchError(error, errorsPS.addBoard),
                onSuccess: (data) => {
                    if (callback) callback(data);
                }
            });
        },

        rename: (callback?: TCallback) => {
            return useMutation({
                mutationFn: (options: TRenameOptions) => renameBoard(options),
                onSettled: () => setLoading(false),
                onError: (error) => catchError(error, errorsPS.renameBoard),
                onSuccess: (data) => {
                    if (callback) callback(data);
                }
            });
        }
    };
};

export default useBoardMutation;