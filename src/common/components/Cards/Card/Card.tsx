import {FC, memo, MouseEvent, useCallback} from "react";
import {IoMdMusicalNote, IoMdPlay} from "react-icons/io";
import IconButton from "../../IconButton/IconButton.tsx";
import "./Card.scss";
import Typography from "../../Typography/Typography.tsx";
import {MdExplicit} from "react-icons/md";
import {cutFrom30} from "../../../../features/Browse/utils/cutFrom30.ts";
import {useNavigate} from "react-router-dom";

type PlaylistProps = {
    title: string;
    image?: string;
    subtitle: string;
    variant?: "default" | "small" | "large" | "small-";
    round?: boolean;
    onPlay?: () => void;
    explicit?: boolean;
    link?: string;
    titleLink?: string;
    subtitleLink?: string;
};

const Card: FC<PlaylistProps> = ({
                                     title,
                                     subtitle,
                                     image,
                                     round,
                                     onPlay,
                                     variant = "default",
                                     explicit = false,
                                     link,
                                     subtitleLink,
                                     titleLink,

                                 }) => {
    const iconButtonVariant = variant === "small" ? "icon" : "filled";
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        if (link) {
            navigate(link)
        }
    }, [link, navigate]);

    const handlePlayButtonClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            if (onPlay) {
                onPlay();
            }
        },
        [onPlay]
    );
    const handleSubtitleClick = useCallback((e:MouseEvent) => {
        if(subtitleLink){
            e.stopPropagation()
            navigate(subtitleLink)
        }
    }, [subtitleLink])
    const handleTitleClick = useCallback((e:MouseEvent) => {
        if(titleLink){
            e.stopPropagation()
            navigate(titleLink)
        }
    }, [titleLink])

    const imageClassName = `card__image ${round ? "card__image-round" : ""}`;

    return (
        <div className={`card card--${variant}`} onClick={handleClick}>
            <div className="card__image-container">
                {image ? (
                    <img className={imageClassName} src={image} alt="image"/>
                ) : (
                    <div className={imageClassName}>
                        <IoMdMusicalNote/>
                    </div>
                )}
                {onPlay && (
                    <IconButton
                        variant={iconButtonVariant}
                        className="card__button"
                        onClick={handlePlayButtonClick}
                    >
                        <IoMdPlay/>
                    </IconButton>
                )}
            </div>
            <div className="card__details">
                <Typography variant="subtitle1" className="card__title" onClick={handleTitleClick}>
                    {cutFrom30(title)}
                </Typography>
                <Typography variant="subtitle2" className="card__subtitle" onClick={handleSubtitleClick}>
                    {explicit && <MdExplicit className="card__explicit"/>}
                    {subtitle}
                </Typography>
            </div>
        </div>
    );
};

export default memo(Card);
