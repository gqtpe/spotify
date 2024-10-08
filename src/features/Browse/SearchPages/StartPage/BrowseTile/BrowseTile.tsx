import {
    DetailedHTMLProps,
    DetailsHTMLAttributes,
    FC,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import { CategoryObject } from "../../../../../api/types/browseCategories.ts";
import styles from "../BrowseStart.module.scss";
import Typography from "../../../../../common/components/Typography/Typography.tsx";
import { useNavigate } from "react-router-dom";

type Props = DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    item: CategoryObject;
};

export const BrowseTile: FC<Props> = memo(({ item }) => {
    console.log("browse tile render");
    const navigate = useNavigate();
    const [color, setColor] = useState<string>("#ffffff");
    const { icons, name, id } = item;

    const handleClick = () => {
        navigate(`/genre/${id}`);
    };

    return (
        <div
            className={styles.tile}
            onClick={handleClick}
            style={{ background: color }}
        >
            <Typography variant="h5">{name}</Typography>
            <img
                className={styles.tile__img}
                src={icons[0].url}
                alt={name}
            />
            {/* Pass the image URL instead of class name */}
            <ImageBackgroundDetector
                imageUrl={icons[0].url}
                onColorDetected={setColor}
            />
        </div>
    );
});
//todo: move to separate
const ImageBackgroundDetector = ({
                                     imageUrl,
                                     onColorDetected,
                                 }: {
    imageUrl: string;
    onColorDetected: (color: string) => void;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "Anonymous"; // Allow CORS for the image
        console.log("Loading image from URL:", imageUrl);
        image.src = imageUrl;

        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const pixelData = ctx.getImageData(0, 0, 1, 1).data; // Change (0, 0) to any other coordinates if needed

            const [red, green, blue] = pixelData;

            if(red>250 && green>250 || blue>250) return
            const hexCode = rgbToHex(red, green, blue);
            onColorDetected(hexCode);
            console.log("Background color:", hexCode);
        };


        image.onerror = () => {
            console.error("Failed to load image:", imageUrl);
            onColorDetected("#ffffff"); // Set a default color if the image fails to load
        };
    }, [imageUrl, onColorDetected]);

    // Helper function to convert RGB values to hex code
    const rgbToHex = (r: number, g: number, b: number) =>
        `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;

    return <canvas ref={canvasRef} width={1} height={1} style={{ display: "none" }} />;
};
