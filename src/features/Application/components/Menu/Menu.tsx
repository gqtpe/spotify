import {Children, CSSProperties, FC, forwardRef, isValidElement, ReactNode, RefObject} from "react";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem/MenuItem.tsx";

type Props = {
    children: ReactNode
    sx?: CSSProperties
    ref?: RefObject<HTMLDivElement>
}
//ref forwarding example
const Menu = forwardRef<HTMLDivElement, Props>(({sx,children},ref) => {
    return <div className={styles.menu} style={{...sx}} ref={ref}>
        {Children.map(children, (child) =>
            isValidElement(child) && child.type === MenuItem
                ? child
                : null
        )}
    </div>
})


export default Menu;