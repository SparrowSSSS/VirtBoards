import { Avatar, Group, Link, Panel, PanelHeader, Placeholder, Separator } from "@vkontakte/vkui";
import { FC, SetStateAction } from "react";

interface Props {
  setActivePanel: (value: SetStateAction<string>) => void,
  id: string
};

const Home: FC<Props> = ({ setActivePanel, id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group>
        <Placeholder
          icon={<Avatar size={56}/>}
          header="Добро пожаловать, Новосельцев Владислав"
        >
          Мы рады видеть вас! Если вы впервые запустили приложение, то для вас не бесполезным будет ознакомление с <Link>документацией</Link>
        </Placeholder>
        <Separator />
      </Group>
    </Panel>
  )
};

export default Home;