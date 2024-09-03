import {Children, cloneElement, isValidElement, memo, ReactNode} from "react";
import styles from './TabGroup.module.scss'
import TabItem from "./TabItem/TabItem.tsx";
import {Tabs} from "../../../features/Browse/browseSlice.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    children: ReactNode[]
    value: string
    onChange: (value: Tabs) => void
}

const TabGroup = ({onChange, value, children}: Props) => {
    const navigate = useNavigate()

    return <div className={styles.tabs}>
        <div className={styles.container}>
            {Children.map(children, (child) =>
                isValidElement(child) && child.type === TabItem
                    ? cloneElement(child, {
                        ...child.props,
                        active: child.props.value === value,
                        onClick: () => {
                            onChange(child.props.value)
                            if(child.props.value === 'all'){
                                navigate('/search/')
                            }else{
                                navigate('/search/' + child.props.value)
                            }

                        }
                    })
                    : null
            )}
        </div>
    </div>
}

export default memo(TabGroup)