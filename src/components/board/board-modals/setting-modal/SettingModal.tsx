import { Button, ButtonGroup, Checkbox, Separator, Header } from '@vkontakte/vkui';
import { FC, useContext, useState } from 'react'
import { dbContext } from '../../../../App';
import { updateBoardData } from '../../../../services/indexedDBServices';
import { TBoardContext, TSettings } from '../../../../types';
import { boardContext } from '../../Board';
import { IDBPDatabase } from "idb";
import { MyDB } from '../../../../hooks/useDB';
import getErrorMessage from '../../../../utils/alertError';


export const SettingModal: FC = () => {

    const { boardData, setBoardData } = useContext(boardContext) as TBoardContext;

    const db = useContext(dbContext) as IDBPDatabase<MyDB>;

    const [firstOptions, setFirstOptions] = useState<TSettings>({ ...boardData?.settings });
    const [options, setOptions] = useState<TSettings>(firstOptions);

    const handleCheckGrid = () => {
        if (options.grid) setOptions({ ...options, grid: false });
        else setOptions({ ...options, grid: true });
    };

    const acceptSettings = () => {
        if (boardData) {
            const newBoardData = {...boardData, settings: options};
            setBoardData(newBoardData);
            setFirstOptions(options);
            updateBoardData(db, newBoardData).catch(error => alert(getErrorMessage(error, "Не удалось обновить данные доски")));
        };
    };

    return (
        <div>
            <Header><div style={{color: "black"}}>Настройки</div></Header>
            <Separator />
            <Checkbox checked={options.grid} onClick={() => handleCheckGrid()}><div style={{ color: "black" }}>Сетка</div></Checkbox>
            {options !== firstOptions
                ? (
                    <>
                        <Separator />
                        <ButtonGroup mode="horizontal" style={{marginTop: "15px"}} gap="m">
                            <Button onClick={() => setOptions(firstOptions)} size="m">
                                Отмена
                            </Button>
                            <Button onClick={() => acceptSettings()} size="m">
                                Принять
                            </Button>
                        </ButtonGroup>
                    </>
                )

                : null
            }
        </div>
    )
};

export default SettingModal;