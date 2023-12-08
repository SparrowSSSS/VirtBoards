import { BoardData } from "../../../config/types";

const validJSON = (jsonText: string): boolean => {
    try {
        const r = JSON.parse(jsonText) as BoardData;

        if (r.components && r.settings && r.name) {
            return true;
        } else {
            return false;
        };
    } catch (e) {
        throw e;
    };
};

export default validJSON;