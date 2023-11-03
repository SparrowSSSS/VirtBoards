import { Button, FormItem, FormLayout, Group, Input } from "@vkontakte/vkui";
import { FC, useContext, useState } from "react";
import { addBoard } from "../services/indexedDBServices";
import { dbContext } from "../App";
import { interfaceContext } from "../panels/Panels";
import { BoardNameAndId, TInterfaceContext } from "../types";
import getErrorMessage from "../utils/alertError";

const AddBoardModal: FC = () => {

    const [boardName, setBoardName] = useState("");
    const [validBoardName, setValidBoardName] = useState(true)

    const { modals: { setActiveModal }, boards: { boardsList, setBoardsList } } = useContext(interfaceContext) as TInterfaceContext;

    const db = useContext(dbContext);

    const handleAddBoard = async () => {
        if (!boardName) {
            setValidBoardName(false);
        } else if (db && boardsList !== "loading") {
            const board = { name: boardName, id: Date.now() };

            try {
                await addBoard(db, board);
            } catch (e) {
                alert(getErrorMessage(e, "Не удалось добавить доску"));
                return;
            };

            setBoardsList([...(boardsList as BoardNameAndId[]), board]);
            setActiveModal(null);
        };
    };

    return (
        <Group>
            <FormLayout>
                <FormItem htmlFor="board-name" top="Название доски" status={validBoardName || boardName ? "default" : "error"} bottom={!validBoardName && !boardName ? "Это обязательноe поле" : ""}>
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
                    <Button size="m" onClick={() => handleAddBoard()}>Добавить</Button>
                </FormItem>
            </FormLayout>
        </Group>
    )
};

export default AddBoardModal;