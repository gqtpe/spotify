import {CSSProperties, FC, memo, ReactNode, useCallback} from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'overline' | 'subtitle1' | 'subtitle2' | 'caption' | 'div';
    component?: keyof JSX.IntrinsicElements;
    children: ReactNode;
    className?: string;
    userSelect?: boolean
    sx?: CSSProperties
    onClick?: (e: any) => void;
}

export const Typography: FC<TypographyProps> = ({
                                                    variant = 'div',
                                                    component,
                                                    children,
                                                    sx,
                                                    className = '',
                                                    onClick

                                                }) => {
    const Component = component || variantMap[variant] || 'p';
    const handleClick = useCallback((e:any) => {
        if (onClick) {
            onClick(e)
        }
    }, [onClick])
    return (
        <Component className={[styles[variant], className, onClick && styles.underline].join(' ')} onClick={handleClick}
                   style={sx}>
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