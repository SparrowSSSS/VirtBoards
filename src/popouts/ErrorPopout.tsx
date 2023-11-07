import { Alert } from '@vkontakte/vkui';
import { FC, useContext } from 'react';
import { TInterfaceContext } from '../config/types';
import { interfaceContext } from '../panels/Panels';

interface Props {
    message: string,
    errorPS: string
};

const ErrorPopout: FC<Props> = ({ message, errorPS }) => {

    const {popouts: {setPopout}} = useContext(interfaceContext) as TInterfaceContext;

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