import { Panel, PanelHeader, PanelHeaderBack, Platform, usePlatform } from '@vkontakte/vkui';
import { FC, useContext } from 'react'
import panels from '../panels';
import localStorages from '../localStorages';
import { interfaceContext } from './Panels';
import { TInterfaceContext } from '../types';

interface Props {
    id: string
};

export const Documentation: FC<Props> = ({ id }) => {

    const platform = usePlatform();

    const {panels: {setActivePanel}} = useContext(interfaceContext) as TInterfaceContext;

    const goBack = (nextPanel: string) => {
        localStorage.setItem(localStorages.activePanel, nextPanel);
        setActivePanel(nextPanel);
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