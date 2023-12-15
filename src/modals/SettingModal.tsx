import { Button, ButtonGroup, Checkbox, FormLayout, FormItem } from '@vkontakte/vkui';
import { FC, useState } from 'react'
import { TSettings } from '../config/types';
import { useBoardSelector } from '../hooks/useStoreSelector';
import { useBoardActions } from '../hooks/useActions';
import useBoardData from '../hooks/useBoardData';


export const SettingModal: FC = () => {

    const { boardData } = useBoardSelector();
    const { setBoardData } = useBoardActions();

    const updateBoardData = useBoardData().updateIndex;

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
            updateBoardData.mutate(newBoardData);
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