import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Panels from './panels/Panels';

const App = () => {

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<Panels />
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;