import {CSSProperties, memo} from "react";
import styles from './Button.module.scss'
import {Link} from "react-router-dom";


type ButtonVariants = 'filled'|'outlined'|'text'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:ButtonVariants
    link?:string
    density?: 'none'|'normal'|'compact'
}
const densityStyles = (density: 'none'|'normal'|'compact'):CSSProperties => {
    return {
        margin: density === 'none' ? 0 : density === 'normal' ? '8px 0' : '4px 0',
    }
}
const Button = ({children, variant = 'filled', className,link, density = 'normal', ...rest}: Props) => {

    const resultClassName = `${styles.button} ${styles[variant]} ${className}`;

    if(link){
        return <Link className={resultClassName + ' ' + styles.buttonLink} to={link}>
            {children}
        </Link>
    }


    return (
        <button className={resultClassName} style={{...densityStyles(density)}} {...rest}>
            {children}
        </button>
    );
};

export default memo(Button);