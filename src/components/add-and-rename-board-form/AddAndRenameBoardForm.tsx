import { Button, FormItem, FormLayout, Input } from "@vkontakte/vkui";
import { FC, useContext, useState } from "react";
import { interfaceContext } from "../../panels/Panels";
import { BoardNameAndId, TInterfaceContext } from "../../config/types";
import getErrorMessage from "../../utils/getErrorMessage";
import errorsPS from "../../config/errorsPS";
import checkOrigin from "../../utils/checkOrigin";
import validateBoardName from "../../utils/validateBoardName";
import IndexedDB from "../../services/indexedService";

interface Props {
    type: "rename" | "add",
    boardId?: number,
    name?: string,
    index?: number
};

const AddAndRenameBoardForm: FC<Props> = ({ boardId, name, index,  type}) => {

    const [boardName, setBoardName] = useState(name ? name : "");

    const [error, setError] = useState<{ isError: boolean, message: string }>({ isError: false, message: "" });

    const { modals: { setActiveModal }, boards: { boardsList, setBoardsList }, loading: { setIsLoading }, func: { catchError } } = useContext(interfaceContext) as TInterfaceContext;

    const handleButton = async (successAction: (vBoardName: string) => Promise<void>) => {
        setIsLoading(true);

        const vBoardName = validateBoardName(boardName);

        if (!vBoardName) {
            setError({ isError: true, message: "Это обязательное поле" });
            return;
        };

        try {
            const bridgeBoardsList = await IndexedDB.getBoardsList();

            if (!checkOrigin(vBoardName, bridgeBoardsList)) setError({ isError: true, message: "Доска с подобным именем уже существует" });
            else if (boardsList !== "loading" && !error.isError) {
                await successAction(vBoardName);
            };

            setIsLoading(false);
        } catch (e) {
            catchError(getErrorMessage(e), errorsPS.addBoard);
        };
    };

    const addBoardSuccessAction = async (vBoardName: string) => {
        try {
            setActiveModal(null);

            const board = { name: vBoardName, id: Date.now(), settings: { grid: true }, components: [] };
            await IndexedDB.addBoard(board);

            setBoardsList([...(boardsList as BoardNameAndId[]), board]);
        } catch (e) {
            throw e;
        };
    };

    const renameBoardSuccessAction = async (vBoardName: string) => {
        try {
            setActiveModal(null);

            await IndexedDB.renameBoard(boardId as number, vBoardName);

            const newBoardsList = [...(boardsList as BoardNameAndId[])];

            newBoardsList.splice(index as number, 1);

            newBoardsList.push({ id: boardId as number, name: vBoardName });

            setBoardsList(newBoardsList);
        } catch (e) {
            throw e;
        };
    };

    const changeBoardName = (newBoardName: string) => {
        if (error.isError) setError({ isError: false, message: "" });
        setBoardName(newBoardName);
    };

    return (
        <FormLayout>
            <FormItem htmlFor={"board-name"} top="Название доски" status={error.isError ? "error" : "default"} bottom={error.message}>
                <Input
                    id="board-name"
                    type="text"
                    name="board-name"
                    value={boardName}
                    onChange={(e) => changeBoardName(e.target.value)}
                    placeholder="Введите название для доски"
                    maxLength={30}
                />
            </FormItem>
            <FormItem>
                <Button size="m" onClick={() => handleButton(type === "add" ? addBoardSuccessAction : renameBoardSuccessAction)}>{type === "add" ? "Создать" : "Переименовать"}</Button>
            </FormItem>
        </FormLayout>
    )
};

export default AddAndRenameBoardForm;