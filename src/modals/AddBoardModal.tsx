import { Button, FormItem, FormLayout, Group, Input } from "@vkontakte/vkui";
import { FC, useState } from "react";

const AddBoardModal: FC = () => {

    const [boardName, setBoardName] = useState("");

    return (
        <Group>
            <FormLayout>
                <FormItem htmlFor="board-name" top="Название доски" status={boardName ? "default" : "error"} bottom={!boardName ? "Это обязательно поле" : ""}>
                    <Input
                        id="board-name"
                        type="text"
                        name="board-name"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                        placeholder="Введите название для новой доски"
                        maxLength={30}
                    />
                </FormItem>
                <FormItem>
                    <Button size="m">Добавить</Button>
                </FormItem>
            </FormLayout>
        </Group>
    )
};

export default AddBoardModal;