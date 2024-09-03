import {DetailedHTMLProps, HTMLAttributes, memo} from "react";
import styles from '../TabGroup.module.scss'

export type TabItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    value: string
    label: string
    active?: boolean
}
const TabItem = ({label, active, ...rest}: TabItemProps) => {


    return <div className={[styles.tabItem, rest.className, active ? styles.tabItem__active : ''].join(' ')} {...rest}>
        {label}
    </div>
}


export default memo(TabItem)