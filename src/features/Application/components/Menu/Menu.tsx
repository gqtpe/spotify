import {Children, cloneElement, CSSProperties, forwardRef, isValidElement, memo, ReactNode, RefObject} from "react";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem/MenuItem.tsx";
import {createPortal} from "react-dom";

type Props = {
    children: ReactNode
    open: boolean
    sx?: CSSProperties
    ref?: RefObject<HTMLDivElement>
    portalID: string
}
//ref forwarding example
const Menu = forwardRef<HTMLDivElement, Props>(({sx, children, portalID, open}, ref) => {
    if (!open) {
        return null
    }
    return <div>
        {createPortal(<div className={styles.menu} style={{...sx}} ref={ref}>
            <div className={styles.menu__items}>
                {Children.map(children, (child) =>
                    isValidElement(child) && child.type === MenuItem
                        ? cloneElement(child, {
                            ...child.props,
                            className: `${styles.menu__item}`
                        })
                        : null
                )}
            </div>
        </div>, document.getElementById(portalID)!)}
    </div>
})


export default memo(Menu);