import { Icon24Document } from '@vkontakte/icons';
import { File, Platform, usePlatform } from '@vkontakte/vkui';
import { ChangeEvent, FC, useContext } from 'react';
import errorsPS from '../../../config/errorsPS';
import globalConfig from '../../../config/global';
import { TInterfaceContext } from '../../../config/types';
import useBoardMutation from '../../../hooks/useBoardMutation';
import { interfaceContext } from '../../../panels/Panels';
import BoardLimitSnackbar from '../../../snackbars/BoardLimitSnackbar';
import readerLoad from './readerLoad';
import validJSON from './validJSON';

export const BoardFileRead: FC = () => {

    const { boards: { boardsList, setBoardsList }, snackbars: { setSnackbar }, func: { catchError }, loading: { setIsLoading } } = useContext(interfaceContext) as TInterfaceContext;

    const platform = usePlatform();

    const loadBoard = useBoardMutation(setIsLoading, catchError).add(setBoardsList);

    const downloadBoard = async (e: ChangeEvent<HTMLInputElement>) => {
        if (boardsList !== "loading") {
            if (boardsList.length < globalConfig.maxBoards) {
                if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];

                    const reader = new FileReader();

                    reader.readAsText(file);

                    reader.onload = async () => {
                        try {
                            if (typeof (reader.result) === 'string' && validJSON(reader.result)) {
                                const board = readerLoad(reader, boardsList);

                                loadBoard.mutate({ board: board });
                            } else {
                                throw new Error("Невалидный JSON");
                            };
                        } catch (e) {
                            catchError(e, errorsPS.dBoard);
                        };
                    };

                    reader.onerror = () => {
                        catchError(reader.error, errorsPS.dBoard);
                    };
                };
            } else {
                setSnackbar(<BoardLimitSnackbar subtitle={`Максимальное количество доступных досок - ${globalConfig.maxBoards}`} />);
            };
        };
    };

    return (
        <File before={<Icon24Document />} size="m" onChange={e => downloadBoard(e)} stretched={platform !== Platform.VKCOM} >
            Загрузить доску
        </File>
    )
};

export default BoardFileRead;