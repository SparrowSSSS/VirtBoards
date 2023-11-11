import { Button, ButtonGroup, Checkbox, FormLayout, FormItem } from '@vkontakte/vkui';
import { FC, useContext, useState } from 'react'
import { TBoardContext, TSettings } from '../../../../config/types';
import { boardContext } from '../../Board';
import getErrorMessage from '../../../../utils/getErrorMessage';
import IndexedDB from '../../../../services/indexedService';


export const SettingModal: FC = () => {

    const { data: { boardData, setBoardData } } = useContext(boardContext) as TBoardContext;

    const [firstOptions, setFirstOptions] = useState<TSettings>({ ...boardData?.settings });
    const [options, setOptions] = useState<TSettings>(firstOptions);

    const handleCheckGrid = () => {
        if (options.grid) setOptions({ ...options, grid: false });
        else setOptions({ ...options, grid: true });
    };

    const acceptSettings = () => {
        if (boardData) {
            const newBoardData = { ...boardData, settings: options };
            setBoardData(newBoardData);
            setFirstOptions(options);
            IndexedDB.updateBoardData(newBoardData).catch(error => alert(getErrorMessage(error)));
        };
    };

    return (
        <FormLayout>
            <Checkbox checked={options.grid} onClick={() => handleCheckGrid()}>Сетка</Checkbox>
            {options !== firstOptions
                ? (
                    <FormItem>
                        <ButtonGroup mode="horizontal" stretched>
                            <Button onClick={() => setOptions(firstOptions)} size="m" stretched>
                                Отмена
                            </Button>
                            <Button onClick={() => acceptSettings()} size="m" stretched>
                                Принять
                            </Button>
                        </ButtonGroup>
                    </FormItem>
                )

                : null
            }
        </FormLayout>
    )
};

export default SettingModal;