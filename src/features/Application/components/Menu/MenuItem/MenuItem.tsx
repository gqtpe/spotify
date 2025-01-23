import {DetailedHTMLProps, FC, HTMLAttributes, ReactElement} from "react";
import {Typography} from "../../../../../common/components/Typography/Typography.tsx";


type Props = {
    title: string
    icon?: ReactElement,
    callback?: ()=>void
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const MenuItem: FC<Props> = ({title, icon, ...rest}) => {
    return (
        <div {...rest}>
            <Typography icon={icon ? icon : undefined}>{title}</Typography>
        </div>
    );
};

export default MenuItem;