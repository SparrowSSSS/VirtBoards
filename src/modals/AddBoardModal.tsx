import { Button, FormItem, FormLayout, Group, Input } from "@vkontakte/vkui";
import { FC, useContext, useState } from "react";
import { addBoard } from "../services/generalServices";
import { dbContext } from "../App";
import { interfaceContext } from "../panels/Panels";
import { BoardNameAndId, TInterfaceContext } from "../config/types";
import getErrorMessage from "../utils/alertError";
import errorsPS from "../config/errorsPS";
import checkOrigin from "../utils/checkOrigin";
import validateBoardName from "../utils/validateBoardName";

const AddBoardModal: FC = () => {

    const [boardName, setBoardName] = useState("");

    const [error, setError] = useState<{ isError: boolean, message: string }>({isError: false, message: ""});

    const { modals: { setActiveModal }, boards: { boardsList, setBoardsList } } = useContext(interfaceContext) as TInterfaceContext;

    const db = useContext(dbContext);

    const handleAddBoard = async () => {
        const vBoardName = validateBoardName(boardName);

        if (!vBoardName) setError({isError: true, message: "Это обязательное поле"});
        else if (!checkOrigin(vBoardName, boardsList as BoardNameAndId[])) setError({isError: true, message: "Доска с подобным именем уже существует"});
        else if (boardsList !== "loading" && db && !error.isError) {
            const board = { name: vBoardName, id: Date.now(), settings: { grid: true }, components: [] };

            try {
                await addBoard(board, db);
            } catch (e) {
                alert(getErrorMessage(e, errorsPS.addBoard));
                return;
            };

            setBoardsList([...(boardsList as BoardNameAndId[]), board]);
            setActiveModal(null);
        };
    };

    const changeBoardName = (newBoardName: string) => {
        if (error.isError) setError({isError: false, message: ""});
        setBoardName(newBoardName);
    };

    return (
        <Group>
            <FormLayout>
                <FormItem htmlFor="board-name" top="Название доски" status={error.isError ? "error" : "default"} bottom={error.message}>
                    <Input
                        id="board-name"
                        type="text"
                        name="board-name"
                        value={boardName}
                        onChange={(e) => changeBoardName(e.target.value)}
                        placeholder="Введите название для новой доски"
                        maxLength={30}
                    />
                </FormItem>
                <FormItem>
                    <Button size="m" onClick={() => handleAddBoard()}>Добавить</Button>
                </FormItem>
            </FormLayout>
        </Group>
    )
};

export default AddBoardModal;