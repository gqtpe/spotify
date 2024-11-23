import { forwardRef, memo, ReactNode, DetailsHTMLAttributes } from "react";
import './Badge.scss';

type Props = DetailsHTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    variant: 'filled' | 'icon';
};

const Badge = forwardRef<HTMLDivElement, Props>(({ variant, children, ...rest }, ref) => {
    const variantClassName = variant === 'filled' ? 'filled' : 'icon';
    return (
        <div ref={ref} className={`badge ${variantClassName}`} {...rest}>
            {children}
        </div>
    );
});

export default memo(Badge);
