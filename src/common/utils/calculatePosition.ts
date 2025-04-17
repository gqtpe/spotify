import {CSSProperties} from "react";
import {PlacementType} from "@common/components/Modal/types.ts";

export const calculatePosition = (
    placement: PlacementType,
    anchorEl: HTMLElement,
    margin: number,
    popupWidth: number,
    popupHeight: number
): CSSProperties => {
    const baseStyle: CSSProperties = {
        position: "absolute",
    };

    const offsetLeft = anchorEl.offsetLeft;
    const offsetTop = anchorEl.offsetTop;
    const clientHeight = anchorEl.offsetHeight;
    const clientWidth = anchorEl.offsetWidth;


    const top = offsetTop;
    const left = offsetLeft;
    const bottom =window.innerHeight - offsetTop;
    const right = window.innerWidth - offsetLeft;

    switch (placement) {
        case "bottom":
            return {
                ...baseStyle,
                top: top + clientHeight + margin,
                left: left + clientWidth / 2 - popupWidth / 2,
            };
        case "bottom-start":
            return {
                ...baseStyle,
                top: top + clientHeight + margin,
                left,
            };
        case "bottom-end":
            return {
                ...baseStyle,
                top: top + clientHeight + margin,
                left: left + clientWidth - popupWidth,
            };
        case "top":
            return {
                ...baseStyle,
                bottom: bottom + margin,
                left: left + clientWidth / 2 - popupWidth / 2,
            };
        case "top-start":
            return {
                ...baseStyle,
                top: top - popupHeight - margin,
                left,
            };
        case "top-end":
            return {
                ...baseStyle,
                top: top - popupHeight - margin,
                left: left + clientWidth - popupWidth,
            };
        case "left":
            return {
                ...baseStyle,
                top: top + clientHeight / 2 - popupHeight / 2,
                right: right+ margin,
            };
        case "left-start":
            return {
                ...baseStyle,
                top,
                right: right+ margin,
            };
        case "left-end":
            return {
                ...baseStyle,
                top: top + clientHeight - popupHeight,
                right: right+ margin,
            };
        case "right":
            return {
                ...baseStyle,
                top: top + clientHeight / 2 - popupHeight / 2,
                left: left + clientWidth + margin,
            };
        case "right-start":
            return {
                ...baseStyle,
                top,
                left: left + clientWidth + margin,
            };
        case "right-end":
            return {
                ...baseStyle,
                top: top + clientHeight - popupHeight,
                left: left + clientWidth + margin,
            };
        default:
            return baseStyle;
    }
};
