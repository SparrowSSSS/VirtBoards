import { Panel, PanelHeader, PanelHeaderBack, Platform, usePlatform } from '@vkontakte/vkui';
import { FC, useContext } from 'react'
import panels from '../../config/panels';
import { useInterfaceActions } from '../../hooks/useActions';

interface Props {
    id: string
};

export const Documentation: FC<Props> = ({ id }) => {

    const platform = usePlatform();

    const {setPanel} = useInterfaceActions();

    const goBack = (nextPanel: string) => {
        setPanel(nextPanel);
    };

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => goBack(panels.home)} label={platform === Platform.VKCOM ? 'Назад' : undefined} />}
            >
                Документация
            </PanelHeader>
        </Panel>
    )
};

export default Documentation;