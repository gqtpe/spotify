import { forwardRef, memo, ReactNode, DetailsHTMLAttributes } from "react";
import './Badge.scss';

type Props = DetailsHTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    variant: 'filled' | 'icon';
};

const Badge = forwardRef<HTMLDivElement, Props>(({ variant, children,className, ...rest }, ref) => {
    const variantClassName = variant === 'filled' ? 'badge-filled' : 'badge-icon';
    return (
        <div ref={ref} className={`badge ${variantClassName} ${className}`} {...rest}>
            {children}
        </div>
    );
});

export default memo(Badge);
