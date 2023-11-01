import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Panels from './panels/Panels';
import useBD, { MyDB } from './hooks/useDB';
import { IDBPDatabase } from "idb";
import { createContext, useEffect, useState } from 'react';

export const dbContext = createContext<IDBPDatabase<MyDB> | undefined>(undefined);

const App = () => {

	const [db, setBD] = useState<IDBPDatabase<MyDB> | undefined>();

	useEffect(() => {
		useBD().then(bd => setBD(bd), error => alert("Произошла ошибка: " + (error as Error).message))
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
