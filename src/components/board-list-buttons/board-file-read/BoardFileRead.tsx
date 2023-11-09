import { Icon24Document } from '@vkontakte/icons';
import { File, Platform, usePlatform } from '@vkontakte/vkui';
import { ChangeEvent, FC, useContext } from 'react';
import errorsPS from '../../../config/errorsPS';
import { TInterfaceContext } from '../../../config/types';
import { interfaceContext } from '../../../panels/Panels';
import IndexedDB from '../../../services/indexedService';
import BoardLimitSnackbar from '../../../snackbars/BoardLimitSnackbar';
import readerLoad from './readerLoad';

export const BoardFileRead: FC = () => {

    const { boards: { boardsList, setBoardsList }, snackbars: { setSnackbar }, loading: { setIsLoading }, func: {catchError} } = useContext(interfaceContext) as TInterfaceContext;

    const platform = usePlatform();

    const downloadBoard = async (e: ChangeEvent<HTMLInputElement>) => {
        if (boardsList !== "loading") {
            setIsLoading(true);

            try {
                const bl = await IndexedDB.getBoardsList();

                if (bl.length < 3 && boardsList.length < 3) {
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];

                        const reader = new FileReader();

                        reader.readAsText(file);

                        reader.onload = async () => {
                            if (reader.result) {
                                try {
                                    const board = await readerLoad(reader, boardsList);

                                    setIsLoading(false);
                                    setBoardsList([...boardsList, board]);
                                } catch (e) {
                                    catchError(e, errorsPS.dBoard);
                                };
                            } else {
                                catchError(new Error("Отсутствуют данные"), errorsPS.dBoard);
                            };
                        };

                        reader.onerror = () => {
                            catchError(reader.error, errorsPS.dBoard);
                        };
                    } else {
                        throw new Error();
                    };

                } else {
                    setIsLoading(false);
                    setSnackbar(<BoardLimitSnackbar subtitle="Максимальное количество доступных досок - 3" />);
                };
            } catch (e) {
                catchError(e, errorsPS.dBoard);
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