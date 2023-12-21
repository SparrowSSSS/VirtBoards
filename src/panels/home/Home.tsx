import { Avatar, Group, Link, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, useContext, useEffect } from "react";
import BoardsList from "../../components/board-list/BoardsList";
import panels from "../../config/panels";
import errorsPS from "../../config/errorsPS";
import BridgeStorage from "../../services/bridgeServices";
import { useQuery } from "@tanstack/react-query";
import queryTags from "../../config/queryTags";
import { useInterfaceActions } from "../../hooks/useActions";
import useCatchError from "../../hooks/useCatchError";
import { interfaceContext } from "../Panels";
import { TInterfaceContext } from "../../config/types";

interface Props {
  id: string
};

const Home: FC<Props> = ({ id }) => {

  const { setPanel, setUserName } = useInterfaceActions();

  const { popout: { setPopout } } = useContext(interfaceContext) as TInterfaceContext;

  const catchError = useCatchError(setPopout);

  const go = (nextPanel: string) => {
    setPanel(nextPanel);
  };

  const name = useQuery({ queryKey: [queryTags.userName], queryFn: () => BridgeStorage.getUserName() });
  if (name.error) catchError(name.error, errorsPS.getUserName);

  useEffect(() => {
    if (name.data) setUserName(name.data);
  }, [name.data]);

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group>
        <Placeholder
          icon={<Avatar size={56} />}
          header={`Добро пожаловать, ${name.data ? name.data : "..."}`}
        >
          Мы рады видеть вас! Если вы впервые запустили приложение, то для вас не бесполезным будет ознакомление с <Link onClick={() => go(panels.documentation)}>документацией</Link>
        </Placeholder>
        <Separator />
        <BoardsList />
      </Group>
    </Panel>
  )
};

export default Home;