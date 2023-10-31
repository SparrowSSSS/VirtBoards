import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Panels from './panels/Panels';
import useBD, { MyDB } from './hooks/useDB';
import { IDBPDatabase } from "idb";
import { createContext, useEffect, useState } from 'react';

const App = () => {

	const [db, setBD] = useState<IDBPDatabase<MyDB> | undefined>();

	const dbContext = createContext<IDBPDatabase<MyDB> | undefined>(undefined);

	useEffect(() => {
		useBD().then(bd => setBD(bd))
	}, [])

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<dbContext.Provider value={db}>
						<Panels />
					</dbContext.Provider>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
