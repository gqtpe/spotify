import {DetailedHTMLProps, FC, HTMLAttributes} from "react";
import styles from './SimpleCard.module.scss'
import Typography from "../Typography/Typography.tsx";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    img: string
    title: string
    subtitle: string
}


//todo: story, layout, playbutton
export const SimpleCard: FC<Props> = ({img, title, subtitle,className,  ...rest}) =>{
    return <div className={[styles.card, className].join(' ')} {...rest}>
        <div className={styles.card__img}><img src={img} alt="card-image"/></div>
        <div className={styles.card__info}>
            <Typography className={styles.card__title}>{title}</Typography>
            <Typography variant={'caption'} className={styles.card__subtitle}>{subtitle}</Typography>
        </div>
    </div>
}