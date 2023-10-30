import { MouseEvent } from "react";

export type BoardNameAndId = {
    name: string,
    id: string
};

export type onClickRemoveBoard = (i: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => void;