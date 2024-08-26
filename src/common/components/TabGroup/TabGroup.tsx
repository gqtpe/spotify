import {Children, cloneElement, isValidElement, memo, ReactNode} from "react";
import styles from './TabGroup.module.scss'
import TabItem from "./TabItem/TabItem.tsx";

type Props = {
    children: ReactNode[]
    value: string
    onChange: (value: string) => void
}

const TabGroup = ({onChange, value, children}: Props) => {

    return <div className={styles.tabs}>
        <div className={styles.container}>
            {Children.map(children, (child) =>
                isValidElement(child) && child.type === TabItem
                    ? cloneElement(child, {
                        ...child.props,
                        active: child.props.value === value,
                        onClick: () => onChange(child.props.value),
                    })
                    : null
            )}
        </div>
    </div>
}

export default memo(TabGroup)