import { Alert } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { useInterfaceActions } from '../hooks/useActions';

interface Props {
    message: string,
    errorPS: string
};

const ErrorPopout: FC<Props> = ({ message, errorPS }) => {

    const { setPopout } = useInterfaceActions();

    return (
        <Alert
            onClose={() => setPopout(null)}
            actions={[
                {
                    title: 'OK',
                    autoClose: true,
                    mode: 'cancel',
                }
            ]}
            actionsLayout="horizontal"
            header={errorPS}
            text={message}
        />
    )
}

export default ErrorPopout;