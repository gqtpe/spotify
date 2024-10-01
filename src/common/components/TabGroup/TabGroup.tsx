import {Children, cloneElement, DetailedHTMLProps, isValidElement, memo, ReactNode} from "react";
import styles from './TabGroup.module.scss'
import TabItem from "./TabItem/TabItem.tsx";

type Props = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children: ReactNode[]
    value: string | null
    handleChange: (value: any) => void
}

const TabGroup = ({handleChange, value, children,className, ...rest}: Props) => {
    return <div className={[styles.tabs, className].join(' ')} {...rest}>
        <div className={styles.container}>
            {Children.map(children, (child) =>
                isValidElement(child) && child.type === TabItem
                    ? cloneElement(child, {
                        ...child.props,
                        active: child.props.value === value,
                        onClick: () => {
                            handleChange(child.props.value)
                        }
                    })
                    : null
            )}
        </div>
    </div>
}

export default memo(TabGroup)