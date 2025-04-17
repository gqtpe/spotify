import {DetailedHTMLProps, DetailsHTMLAttributes, FC, memo, useState,} from "react";
import {CategoryObject} from "@/api/types/browseCategories.ts";
import styles from "../../SearchPages/StartPage/BrowseStart.module.scss";
import Typography from "@common/components/Typography/Typography.tsx";
import {useNavigate} from "react-router-dom";
import ImageColorThief from "@common/components/ImageColorThief/ImageColorThief.tsx";

type Props = DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    item: CategoryObject;
};

export const GenreTile: FC<Props> = memo(({ item }) => {
    console.log("browse tile render");
    const navigate = useNavigate();
    const [color, setColor] = useState<string>("#ffffff");
    const { icons, name, id } = item;
    //todo: fix rerender on color change(remove imageColorThief bc bad practice)
    const handleClick = () => {
        navigate(`/genre/${id}`);
    };

    return (
        <div
            className={styles.tile}
            onClick={handleClick}
            style={{ background: color }}
        >
            <Typography variant="h4" sx={{fontWeight: 'bolder'}}>{name}</Typography>
            <img
                className={styles.tile__img}
                src={icons[0].url}
                alt={name}
            />
            <ImageColorThief
                imageUrl={icons[0].url}
                onColorDetected={setColor}
            />
        </div>
    );
});

