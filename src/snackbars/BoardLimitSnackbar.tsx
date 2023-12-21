import { Snackbar } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { Icon24ErrorCircleOutline } from '@vkontakte/icons';
import { interfaceContext } from '../panels/Panels';
import { TInterfaceContext } from '../config/types';

interface Props {
    subtitle: string
};

export const BoardLimitSnackbar: FC<Props> = ({ subtitle }) => {

    const { snackbar: { setSnackbar } } = useContext(interfaceContext) as TInterfaceContext;

    return (
        <Snackbar
            onClose={() => setSnackbar(null)}
            subtitle={subtitle}
            before={<Icon24ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
        >
            Ограничение
        </Snackbar>
    )
};

export default BoardLimitSnackbar;