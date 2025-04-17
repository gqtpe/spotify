import {DetailedHTMLProps, FC, ImgHTMLAttributes, memo, useState} from 'react';
import styles from './Image.module.scss';

type PropsType = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
const Image: FC<PropsType> = ({className, ...rest}) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <div className={styles.container}>
            <img {...rest}
                className={className}
                 onLoad={() => setTimeout(()=>setImageLoaded(true),300)}
                 style={{display: imageLoaded ? 'block' : 'none',}}

            />
            {!imageLoaded && <div
                className={styles.skeleton + ' ' + className}
            />}
        </div>

    );
}

export default memo(Image);