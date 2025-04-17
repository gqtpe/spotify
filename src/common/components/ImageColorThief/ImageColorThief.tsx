import {memo, useEffect, useRef} from "react";

const ImageColorThief = ({
                             imageUrl,
                             onColorDetected,
                         }: {
    imageUrl: string;
    onColorDetected: (color: string) => void;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imageUrl) return;

        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "Anonymous";

        image.src = imageUrl;

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

            const pixelData = ctx?.getImageData(0, 0, 1, 1).data;
            if (!pixelData) return;

            const [red, green, blue, alpha] = pixelData;

            if (alpha === 0 || (red > 250 && green > 250 && blue > 250)) {
                onColorDetected("#7c6f6f");
                return;
            }

            const hexCode = rgbToHex(red, green, blue);
            onColorDetected(hexCode);
        };

        image.onerror = () => {
            onColorDetected("#7c6f6f");
        };
    }, [imageUrl, onColorDetected]);

    const rgbToHex = (r: number, g: number, b: number) => {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    return <canvas ref={canvasRef} width={1} height={1} style={{display: "none"}}/>;
};
export default memo(ImageColorThief)