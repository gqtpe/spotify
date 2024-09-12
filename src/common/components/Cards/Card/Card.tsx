import {DetailsHTMLAttributes, FC, memo} from "react";
import styles from './Card.module.scss'
import Typography from "../../Typography/Typography.tsx";
import Button from "../../Button/Button.tsx";
import {IoMdPlay} from "react-icons/io";

type PlaylistProps = DetailsHTMLAttributes<HTMLDivElement> & {
    title: string
    subtitle: string
    image: string
    round?: boolean
}

const Card: FC<PlaylistProps> = ({title, subtitle, image, round, ...rest}) => {

    const cutTitle = title.length > 30 ? title.slice(0, 30) + '...' : title

    return <div className={styles.card} {...rest}>
        <div className={styles.card__image_wp}>
            <img className={[styles.image, round && styles.round].join(' ')} src={image} alt={'image'}/>
            <Button variant={"icon"} className={styles.popup}><IoMdPlay/></Button>
        </div>
        <div className={styles.card__details}>
            <Typography className={styles.title}>{cutTitle}</Typography>
            <Typography variant='caption' className={styles.subtitle}>{subtitle}</Typography>
        </div>
    </div>
}

export default memo(Card)