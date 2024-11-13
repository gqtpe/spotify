import {DetailsHTMLAttributes, FC, memo} from "react"
import styles from "./IconButton.module.scss";


type IconButtonProps = DetailsHTMLAttributes<HTMLButtonElement> & {
    variant?: 'filled' | 'outlined' | 'icon',
    fz?: number
}
//todo:add disabled property
const IconButton: FC<IconButtonProps> = ({variant = 'filled', children, className, fz, ...rest}) => {
    return <button className={[className, styles.button, styles[variant]].join(' ')} style={{fontSize: fz, ...rest.style}} {...rest}>
        {children}
    </button>
}


export default memo(IconButton)