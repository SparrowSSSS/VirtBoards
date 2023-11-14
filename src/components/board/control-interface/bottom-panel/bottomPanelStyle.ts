import { CSSProperties } from "react";

const boardBottomPanel: CSSProperties = {
    position: "absolute",
    backgroundColor: "white",
    height: "50px",
    width: "50px",
    right: "10%",
    bottom: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "#222222 1px solid",
    borderRadius: "6px",
    zIndex: 1
};

const boardBottomPanelFullScreen: CSSProperties = {
    minWidth: "300px",
    maxWidth: "400px",
    right: "3%",
    bottom: "5%",
    justifyContent: "space-between",
    boxSizing: "border-box",
    padding: "10px",
    position: "fixed",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    border: "#222222 1px solid",
    borderRadius: "6px",
    zIndex: 1
};

const boardBottomPanelFullScreenTl: CSSProperties = {
    backgroundColor: "white",
    height: "50px",
    width: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "#222222 1px solid",
    borderRadius: "6px",
    zIndex: 1,
    right: "3%",
    bottom: "5%",
    position: "fixed"
};

export {boardBottomPanel, boardBottomPanelFullScreen, boardBottomPanelFullScreenTl};