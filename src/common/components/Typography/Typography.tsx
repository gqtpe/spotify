import {CSSProperties, FC, ReactNode} from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
    component?: keyof JSX.IntrinsicElements;
    children: ReactNode;
    className?: string;
    sx?: CSSProperties
}

export const Typography: FC<TypographyProps> = ({
                                                    variant = 'body1',
                                                    component,
                                                    children,
                                                    sx,
                                                    className = '',
                                                }) => {
    const Component = component || variantMap[variant] || 'p';

    return (
        <Component className={[styles[variant], className].join(' ')} style={sx}>
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
    body1: 'p',
    body2: 'p',
    caption: 'span',
};

export default Typography;