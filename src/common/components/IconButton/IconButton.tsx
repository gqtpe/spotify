import {ButtonHTMLAttributes, forwardRef, memo} from "react";
import styles from "./IconButton.module.scss";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'filled' | 'outlined' | 'icon';
    fz?: number|string;
};
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({variant = 'filled', children, className, disabled, fz, ...rest}, ref) => {
        return (
            <button
                ref={ref}
                className={[className, styles.button, styles[variant], (disabled && styles.disabled)].join(' ')}
                style={{fontSize: fz, ...rest.style}}
                {...rest}
            >
                {children}
            </button>
        );
    }
);

export default memo(IconButton);
