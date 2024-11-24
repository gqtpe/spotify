import {ButtonHTMLAttributes, forwardRef} from "react";
import styles from "./IconButton.module.scss";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'filled' | 'outlined' | 'icon';
    fz?: number;
};
//todo:add disabled property
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({variant = 'filled', children, className, fz, ...rest}, ref) => {
        return (
            <button
                ref={ref}
                className={[className, styles.button, styles[variant]].join(' ')}
                style={{fontSize: fz, ...rest.style}}
                {...rest}
            >
                {children}
            </button>
        );
    }
);

export default IconButton;
