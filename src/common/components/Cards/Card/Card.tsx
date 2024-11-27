import {FC, memo, MouseEvent, useCallback} from "react";
import {IoMdMusicalNote, IoMdPlay} from "react-icons/io";
import IconButton from "../../IconButton/IconButton.tsx";
import "./Card.scss";
import Typography from "../../Typography/Typography.tsx";
import {MdExplicit} from "react-icons/md";

type PlaylistProps = {
    title: string;
    image?: string;
    subtitle: string;
    variant?: "default" | "small" | "large" | "small-";
    round?: boolean;
    onClick?: () => void;
    onPlay?: () => void;
    explicit?: boolean;
    link?: string;
    navigate?: (link: string) => void
};

const cutFrom30 = (text: string) => {
    return text.length > 30 ? `${text.slice(0, 30)}...` : text;
};

const Card: FC<PlaylistProps> = ({
                                     title,
                                     subtitle,
                                     image,
                                     round,
                                     onPlay,
                                     onClick,
                                     variant = "default",
                                     explicit = false,
                                     link,
                                     navigate
                                 }) => {
    const iconButtonVariant = variant === "small" ? "icon" : "filled";

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
        if (link && navigate) {
            navigate(link)
        }
    }, [onClick, link, navigate]);

    const handlePlayButtonClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            if (onPlay) {
                onPlay();
            }
        },
        [onPlay]
    );

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
                <Typography variant="subtitle1" className="card__title">
                    {cutFrom30(title)}
                </Typography>
                <Typography variant="subtitle2" className="card__subtitle">
                    {explicit && <MdExplicit className="card__explicit"/>}
                    {subtitle}
                </Typography>
            </div>
        </div>
    );
};

export default memo(Card);
