import { useMutation } from "@tanstack/react-query";
import GeneralService from "../services/generalServices";
import { BoardData, BoardNameAndId, setStateF, TCatchError } from "../config/types";
import errorsPS from "../config/errorsPS";

type TCallback = (list: BoardNameAndId[]) => void;

type TRenameOptions = { boardId: number, name: string };

type TDeleteOptions = { boardId: number };

type TAddOptions = { board: BoardData };

const useBoardMutation = (setLoading: setStateF<boolean>, catchError: TCatchError) => {

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
                onError: (error) => catchError(error, errorsPS.deleteBoard),
                onSuccess: (data) => {
                    if (callback) callback(data);
                }
            });
        },

        rename: (callback?: TCallback) => {
            return useMutation({
                mutationFn: (options: TRenameOptions) => renameBoard(options),
                onSettled: () => setLoading(false),
                onError: (error) => catchError(error, errorsPS.deleteBoard),
                onSuccess: (data) => {
                    if (callback) callback(data);
                }
            });
        }
    };
};

export default useBoardMutation;