import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from "react";

const calculatePosition = (
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

export type PlacementType =
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";

type ModalProps = {
    children: ReactNode;
    anchorEl: HTMLElement | null;
    margin?: number;
    placement: PlacementType;
};

const Modal: FC<ModalProps> = ({ children, placement, anchorEl, margin = 0 }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [styles, setStyles] = useState<CSSProperties | null>(null);
    useEffect(() => {
        if (anchorEl && wrapperRef.current) {
            const popupWidth = wrapperRef.current.offsetWidth;
            const popupHeight = wrapperRef.current.offsetHeight;
            setStyles(calculatePosition(placement, anchorEl, margin, popupWidth, popupHeight));
        }
    }, [anchorEl, placement, margin]);

    return (
        <div
            style={styles || {position: "absolute", top: 0, left: 0, visibility: "hidden"}}
            ref={wrapperRef}
        >
            {children}
        </div>
    );
};

export default Modal;
