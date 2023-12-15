import { Snackbar } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { Icon24ErrorCircleOutline } from '@vkontakte/icons';
import { useInterfaceActions } from '../hooks/useActions';

interface Props {
    subtitle: string
};

export const BoardLimitSnackbar: FC<Props> = ({ subtitle }) => {

    const { setSnackbar } = useInterfaceActions();

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