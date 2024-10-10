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
const Card: FC<PlaylistProps> = ({title, subtitle, image, round, onPlay,onClick, variant = 'default', explicit=false}) => {
    const cutTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;
    const defaultImageStyles = [styles.image, round && styles.round].join(' ');

    const imageElement = image ?
        <img className={defaultImageStyles} src={image} alt={'image'}/>
        :
        <div className={defaultImageStyles}>
            <IoMdMusicalNote className={styles.emptyImageIcon}/>
        </div>
    const iconButtonVariant = variant === 'small' ? 'icon' : 'filled';
    const handleClick = useCallback(()=>{
        if(onClick){
            onClick()
        }
    },[onClick])

    return (
        <div className={[styles.card, styles[variant], (onPlay && styles.hover)].join(' ')} onClick={handleClick}>
            <div className={styles.card__image_wp}>
                {imageElement}
                {onPlay && <IconButton variant={iconButtonVariant} className={styles.popup} onClick={onPlay}>
                    <IoMdPlay  style={{position: 'relative', left: '2px'}}/>
                </IconButton>}
            </div>
            <div className={styles.card__details}>
                <Typography className={styles.title}>{cutTitle}</Typography>
                <Typography variant='caption' className={styles.subtitle}>{explicit ? <MdExplicit className={styles.explicitIcon} /> : ''}{subtitle}</Typography>
            </div>
        </div>
    )
}

export default memo(Card)