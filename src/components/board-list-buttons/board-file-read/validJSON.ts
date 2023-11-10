import { BoardData } from "../../../config/types";

const validJSON = (jsonText: string): boolean => {
    const r = JSON.parse(jsonText) as BoardData;

    if (r.components && r.id && r.settings && r.name) {
        return true;
    } else {
        return false;
    };
};

export default validJSON;