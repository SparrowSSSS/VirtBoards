import { Alert } from '@vkontakte/vkui';
import { FC, ReactNode } from 'react';
import { setStateF } from '../config/types';

interface Props {
    message: string,
    errorPS: string,
    setPopout: setStateF<ReactNode | null>
};

const ErrorPopout: FC<Props> = ({ message, errorPS, setPopout }) => {
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