import {DetailedHTMLProps, HTMLAttributes, memo, ReactNode} from "react";
import styles from '../TabGroup.module.scss'

export type TabItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    value: string
    label: ReactNode
    active?: boolean
    disabled?: boolean
}
const TabItem = ({label, active, disabled,onClick, ...rest}: TabItemProps) => {
    const disabledClassName = disabled? styles.tabItem__disabled : styles.tabItem__item
    const activeClassName = active ? styles.tabItem__active : ''
    return <div className={[styles.tabItem, rest.className, activeClassName, disabledClassName].join(' ')} onClick={disabled?undefined:onClick} {...rest}>
        {label}
    </div>
}


export default memo(TabItem)