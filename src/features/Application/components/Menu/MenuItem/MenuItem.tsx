import {FC, ReactElement} from "react";
import styles from "../Menu.module.scss";
import {Typography} from "../../../../../common/components/Typography/Typography.tsx";


type Props = {
    title: string
    icon?: ReactElement,

}
const MenuItem: FC<Props> = ({title, icon}) => {
    return (
        <div className={[styles.option, styles.menu__item].join(' ')}>
            <Typography icon={icon?icon:undefined}>{title}</Typography>
        </div>
    );
};

export default MenuItem;