import { Button, FormItem, FormLayout, Group, Input } from "@vkontakte/vkui";
import { FC, useContext, useState } from "react";
import { addBoard } from "../services/generalServices";
import { dbContext } from "../App";
import { interfaceContext } from "../panels/Panels";
import { BoardNameAndId, TInterfaceContext } from "../config/types";
import getErrorMessage from "../utils/alertError";
import errorsPS from "../config/errorsPS";

const AddBoardModal: FC = () => {

    const [boardName, setBoardName] = useState("");
    const [validBoardName, setValidBoardName] = useState("")

    const { modals: { setActiveModal }, boards: { boardsList, setBoardsList } } = useContext(interfaceContext) as TInterfaceContext;

    const db = useContext(dbContext);

    const checkBoardNameOrigin = (): boolean => {
        let checkBoardName: boolean = true;

        for (let board of boardsList) {
            if ((board as BoardNameAndId).name === boardName) {
                checkBoardName = false;
                break;
            };
        };

        return checkBoardName;
    };

    const handleAddBoard = async () => {
        if (boardsList !== "loading") {
            if (!boardName) {
                setValidBoardName("Это обязательноe поле");
            } else if (!checkBoardNameOrigin()) {
                setValidBoardName("У вас уже есть доска с таким названием");
            } else if (db) {
                const board = { name: boardName, id: Date.now() };

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
    };

    return (
        <Group>
            <FormLayout>
                <FormItem htmlFor="board-name" top="Название доски" status={!validBoardName || boardName ? "default" : "error"} bottom={validBoardName && !boardName ? validBoardName : ""}>
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