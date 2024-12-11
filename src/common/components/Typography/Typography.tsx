import {CSSProperties, FC, memo, ReactNode} from 'react';
import styles from './Typography.module.scss';
import {Link} from "react-router-dom";

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'overline' | 'subtitle1' | 'subtitle2' | 'caption' | 'div';
    component?: keyof JSX.IntrinsicElements;
    children: ReactNode;
    className?: string;
    userSelect?: boolean
    sx?: CSSProperties;
    link?: string;
}

export const Typography: FC<TypographyProps> = ({
                                                    variant = 'div',
                                                    component,
                                                    children,
                                                    sx,
                                                    className = '',
                                                    link
                                                }) => {
    const Component = (component || variantMap[variant] || 'p');
    if(link){
        return <Link to={link} className={[styles[variant], className].join(' ')}>
            {children}
        </Link>
    }
    return (
        <Component className={[styles[variant], className,].join(' ')} style={sx}>
            {children}
        </Component>
    );
};

const variantMap: Record<string, keyof JSX.IntrinsicElements> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    overline: 'p',
    subtitle1: 'p',
    subtitle2: 'span',
    caption: 'p',
};

export default memo(Typography);