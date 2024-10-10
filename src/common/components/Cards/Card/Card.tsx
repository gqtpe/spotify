import {FC, memo, useCallback} from "react";
import styles from './Card.module.scss'
import Typography from "../../Typography/Typography.tsx";
import {IoMdMusicalNote, IoMdPlay} from "react-icons/io";
import IconButton from "../../IconButton/IconButton.tsx";
import {useNavigate} from "react-router-dom";

type PlaylistProps = {
    title: string
    type: string
    cardID: string
    subtitle: string
    image: string | null
    subtitle: string
    variant?: 'default' | 'small'
    round?: boolean
    onClick?: () => void
    onPlay?: () => void
    explicit?: boolean
    link?: string
}
//todo: variants
const Card: FC<PlaylistProps> = ({
                                     title,
                                     type,
                                     cardID,
                                     subtitle,
                                     image,
                                     round,
                                     variant,
                                 }) => {
    const navigate = useNavigate()

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
                {onPlay && <IconButton variant={iconButtonVariant} className={styles.popup} onClick={onPlay}>
                    <IoMdPlay  style={{position: 'relative', left: '2px'}}/>
                </IconButton>}
}

export default memo(Card)