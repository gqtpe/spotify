import {DetailedHTMLProps, FC, ImgHTMLAttributes, memo, useState} from 'react';
import styles from './Image.module.scss';
import Skeleton from "../Skeleton/Skeleton.tsx";

interface PropsType extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    variant?: number
}

const Image: FC<PropsType> = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <div className={styles.container}>
            <img {...props}
                 onLoad={() => setImageLoaded(true)}
                 style={{display: imageLoaded ? 'block' : 'none',}}

            />
            <Skeleton
                animation="pulsate"
            />
        </div>

    );
}

export default memo(Image);