import { Button, FormItem, FormLayout, Input } from "@vkontakte/vkui";
import { FC, useContext, useState } from "react";
import { interfaceContext } from "../../panels/Panels";
import { BoardNameAndId, TInterfaceContext } from "../../config/types";
import checkOrigin from "../../utils/checkOrigin";
import validateBoardName from "../../utils/validateBoardName";
import useBoardMutation from "../../hooks/useBoardMutation";
import getId from "../../utils/getId";

interface Props {
    type: "rename" | "add",
    boardId?: number,
    name?: string,
    index?: number
};

const AddAndRenameBoardForm: FC<Props> = ({ boardId, name, type }) => {

    const [boardName, setBoardName] = useState(name ? name : "");

    const [error, setError] = useState<{ isError: boolean, message: string }>({ isError: false, message: "" });

    const { modals: { setActiveModal }, boards: { boardsList, setBoardsList }, loading: { setIsLoading }, func: { catchError } } = useContext(interfaceContext) as TInterfaceContext;

    const addBoard = useBoardMutation(setIsLoading, catchError).add(setBoardsList);

    const renameBoard = useBoardMutation(setIsLoading, catchError).rename(setBoardsList);

    const handleButton = async (successAction: (vBoardName: string) => Promise<void>) => {
        const vBoardName = validateBoardName(boardName);

        if (!vBoardName) {
            setError({ isError: true, message: "Это обязательное поле" });
            return;
        };

        if (!checkOrigin(vBoardName, boardsList as BoardNameAndId[])) setError({ isError: true, message: "Доска с подобным именем уже существует" });
        else if (!error.isError) {
            await successAction(vBoardName);
        };
    };

    const addBoardSuccessAction = async (vBoardName: string) => {
        setActiveModal(null);

        const board = { name: vBoardName, id: getId(), settings: { grid: true }, components: [] };
        addBoard.mutate({ board: board });
    };

    const renameBoardSuccessAction = async (vBoardName: string) => {
        setActiveModal(null);

        renameBoard.mutate({boardId: boardId as number, name: vBoardName});
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