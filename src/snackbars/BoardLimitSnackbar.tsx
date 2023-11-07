import { Snackbar } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { TInterfaceContext } from '../config/types';
import { interfaceContext } from '../panels/Panels';
import { Icon24ErrorCircleOutline } from '@vkontakte/icons';

interface Props {
    subtitle: string
};

export const BoardLimitSnackbar: FC<Props> = ({subtitle}) => {

    const {snackbars: {setSnackbar}} = useContext(interfaceContext) as TInterfaceContext;

    return (
        <Snackbar
            onClose={() => setSnackbar(null)}
            subtitle={subtitle}
            before={<Icon24ErrorCircleOutline fill="var(--vkui--color_icon_negative)"/>}
        >
            Ограничение
        </Snackbar>
  )
};

export default BoardLimitSnackbar;