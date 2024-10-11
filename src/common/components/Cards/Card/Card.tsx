import {FC, memo, MouseEvent, useCallback} from "react";
import styles from './Card.module.scss'
import Typography from "../../Typography/Typography.tsx";
import {IoMdMusicalNote, IoMdPlay} from "react-icons/io";
import IconButton from "../../IconButton/IconButton.tsx";
import {MdExplicit} from "react-icons/md";
import {useNavigate} from "react-router-dom";

type PlaylistProps = {
    title: string
    image: string | null
    subtitle: string
    variant?: 'default' | 'small' | 'large'
    round?: boolean
    onClick?: () => void
    onPlay?: () => void
    explicit?: boolean
    link?: string
}
//todo: variants
const Card: FC<PlaylistProps> = ({
                                     title,
                                     subtitle,
                                     image,
                                     round,
                                     onPlay,
                                     onClick,
                                     variant = 'default',
                                     explicit = false,
                                     link
                                 }) => {
    const cutTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;
    const defaultImageStyles = [styles.image, round && styles.round].join(' ');
    const navigate = useNavigate()
    const iconButtonVariant = variant === 'small' ? 'icon' : 'filled';
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick()
        }
        if (link) {
            navigate(link)
        }
    }, [onClick,navigate])
    const handlePlayButtonClick = useCallback((event: MouseEvent) => {
        event.stopPropagation()
        if (onPlay) {
            onPlay()
        }
    }, [onPlay])

    const imageElement = image ?
        <img className={defaultImageStyles} src={image} alt={'image'}/>
        :
        <div className={defaultImageStyles}>
            <IoMdMusicalNote className={styles.emptyImageIcon}/>
        </div>

    const classNames = [styles.card, styles[variant], (onPlay && styles.hover)].join(' ')

    return (
        <div className={classNames} onClick={handleClick}>
            <div className={styles.card__image_wp}>
                {imageElement}
                {onPlay &&
                    <IconButton variant={iconButtonVariant} className={styles.popup} onClick={handlePlayButtonClick}>
                        <IoMdPlay style={{position: 'relative', left: '2px'}}/>
                    </IconButton>}
            </div>
            <div className={styles.card__details}>
                <Typography className={styles.title}>{cutTitle}</Typography>
                <Typography variant='caption' className={styles.subtitle}>
                    {explicit ? <MdExplicit className={styles.explicitIcon}/> : ''}
                    {subtitle}
                </Typography>
            </div>
        </div>
    )
}

export default memo(Card)