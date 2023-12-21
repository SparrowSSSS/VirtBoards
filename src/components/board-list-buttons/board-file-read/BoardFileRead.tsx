import { Icon24Document } from '@vkontakte/icons';
import { File, Platform, usePlatform } from '@vkontakte/vkui';
import { ChangeEvent, FC, useContext } from 'react';
import errorsPS from '../../../config/errorsPS';
import globalConfig from '../../../config/global';
import { TInterfaceContext } from '../../../config/types';
import { useInterfaceActions } from '../../../hooks/useActions';
import useBoardMutation from '../../../hooks/useBoardMutation';
import useCatchError from '../../../hooks/useCatchError';
import { useInterfaceSelector } from '../../../hooks/useStoreSelector';
import { interfaceContext } from '../../../panels/Panels';
import BoardLimitSnackbar from '../../../snackbars/BoardLimitSnackbar';
import readerLoad from './readerLoad';
import validJSON from './validJSON';

export const BoardFileRead: FC = () => {

    const platform = usePlatform();

    const { setBoardsList } = useInterfaceActions();
    const { boardsList } = useInterfaceSelector();

    const { snackbar: { setSnackbar } } = useContext(interfaceContext) as TInterfaceContext;

    const { popout: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

    const catchError = useCatchError(setPopout);

    const loadBoard = useBoardMutation().add(setBoardsList);

    const downloadBoard = async (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        <File before={<Icon24Document />} size="m" onChange={e => downloadBoard(e)} stretched={platform !== Platform.VKCOM} >
            Загрузить доску
        </File>
    )
};

export default BoardFileRead;