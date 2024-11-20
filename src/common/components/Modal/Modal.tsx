import {CSSProperties, FC, memo, ReactNode} from "react";

const styles = (top?: number, left?: number, bottom?: number, right?: number, popupWidth?: number): CSSProperties => {
    if (!top && !left) {
        return {
            position: 'absolute',
            bottom: bottom,
            right: `calc(${right}px - ${popupWidth! /2}rem)`,
        }
    } else {
        return {
            position: 'absolute',
            top: top,
            left: left,
        }
    }
}
type ModalProps = {
    children: ReactNode
    top?: number
    left?: number
    right?: number
    bottom?: number
    popupWidth?: number

}
const Modal: FC<ModalProps> = ({children, top, left, bottom, right, popupWidth}) => {

    return <div style={styles(top, left, bottom, right, popupWidth)}>
        {children}
    </div>


}

export default memo(Modal)