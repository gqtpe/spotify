import {FC, memo, MouseEvent, useCallback} from "react";
import {IoMdMusicalNote, IoMdPlay} from "react-icons/io";
import IconButton from "../../IconButton/IconButton.tsx";
import "./Card.scss";
import Typography from "../../Typography/Typography.tsx";
import {MdExplicit} from "react-icons/md";
import {cutFrom30} from "../../../../features/Browse/utils/cutFrom30.ts";
import {useNavigate} from "react-router-dom";
import Image from "@common/components/Image/Image.tsx";

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
    dense?: 'dense' | 'none';
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
                                     titleLink = link,
                                     subtitleLink,
                                     dense = 'dense'
                                 }) => {
    const iconButtonVariant = variant === "small" ? "icon" : "filled";
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
    const navigate = useNavigate()
    return (
        <div
            onClick={() => {navigate(link || '')}}
            className={`card card--${variant}`}
            style={dense === 'none' ? {padding: '0px'} : {}}
        >
            <div className="card__image-container">
                {image ? <Image className={imageClassName} src={image} alt="image"/>: ((variant !== 'small-') || (variant !== 'small-')) ? <div className={imageClassName}>
                        <IoMdMusicalNote/>
                    </div> : null}
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
                <Typography variant="subtitle1" className="card__title" link={titleLink}>
                    {cutFrom30(title)}
                </Typography>
                <Typography variant="subtitle2" className="card__subtitle" link={subtitleLink}>
                    {explicit && <MdExplicit className="card__explicit"/>}
                    {subtitle}
                </Typography>
            </div>
        </div>
    );
};

export default memo(Card);
