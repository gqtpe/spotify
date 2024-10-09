import {FC, memo, useCallback} from "react";
import styles from './Card.module.scss'
import Typography from "../../Typography/Typography.tsx";
import {IoMdMusicalNote, IoMdPlay} from "react-icons/io";
import IconButton from "../../IconButton/IconButton.tsx";

type PlaylistProps = DetailsHTMLAttributes<HTMLDivElement> & {
    title: string
    subtitle: string
    image: string
    round?: boolean
    variant?: 'large'| 'default'| 'small'
}
//todo: variants
const Card: FC<PlaylistProps> = ({title, subtitle, image, round,variant='default', ...rest}) => {

    const cutTitle = title.length > 30 ? title.slice(0, 30) + '...' : title
    const handleClick = useCallback(() => {
        navigate(`/${type}/${cardID}`)
    }, [cardID, type])
    return <div className={styles.card} onClick={handleClick}>
        <div className={styles.card__image_wp}>
            {image ? <img className={[styles.image, round && styles.round].join(' ')} src={image} alt={'image'}/> :
                <div className={[styles.image, round && styles.round, styles.icon].join(' ')}><IoMdMusicalNote/></div>}
            <IconButton className={styles.popup} fz={24}><IoMdPlay
                style={{position: 'relative', left: '2px'}}/></IconButton>
        </div>
        <div className={styles.card__details}>
            <Typography className={styles.title}>{cutTitle}</Typography>
            <Typography variant='caption' className={styles.subtitle}>{subtitle}</Typography>
        </div>
    </div>
}

export default memo(Card)