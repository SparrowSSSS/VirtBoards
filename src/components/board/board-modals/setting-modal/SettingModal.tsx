import { Button, ButtonGroup, Checkbox, Separator, Header, FormLayout, FormItem, Spacing } from '@vkontakte/vkui';
import { FC, useContext, useState } from 'react'
import { TBoardContext, TSettings } from '../../../../config/types';
import { boardContext } from '../../Board';
import getErrorMessage from '../../../../utils/getErrorMessage';
import IndexedDB from '../../../../services/indexedService';


export const SettingModal: FC = () => {

    const { boardData, setBoardData } = useContext(boardContext) as TBoardContext;

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
        <div>
            <FormLayout>
                <Header><div style={{ color: "black", fontWeight: "bold" }}>Настройки</div></Header>
                <Spacing size={15}>
                    <Separator />
                </Spacing>
                <Checkbox checked={options.grid} onClick={() => handleCheckGrid()}><div style={{ color: "black" }}>Сетка</div></Checkbox>
                {options !== firstOptions
                    ? (
                        <>
                            <ButtonGroup mode="horizontal" style={{ marginTop: "15px" }}>
                                <FormItem>
                                    <Button onClick={() => setOptions(firstOptions)} size="m" stretched>
                                        Отмена
                                    </Button>
                                </FormItem>
                                <FormItem>
                                    <Button onClick={() => acceptSettings()} size="m" stretched>
                                        Принять
                                    </Button>
                                </FormItem>
                            </ButtonGroup>
                        </>
                    )

                    : null
                }
            </FormLayout>
        </div>
    )
};

export default SettingModal;