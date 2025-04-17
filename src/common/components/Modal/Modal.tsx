import {CSSProperties, FC, memo, ReactNode, useEffect, useRef, useState} from "react";
import {calculatePosition} from "@common/utils";
import type {PlacementType} from "./types.ts";


type ModalProps = {
    children: ReactNode;
    anchorEl: HTMLElement | null;
    margin?: number;
    placement: PlacementType;
};
//todo: fix modal content increase direction
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

export default memo(Modal);
