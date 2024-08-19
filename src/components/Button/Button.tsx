import React from "react";
import styles from './Button.module.scss'
import {Link} from "react-router-dom";


type ButtonVariants = 'filled'|'outlined'|'text'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant:ButtonVariants
    link?:string
}
const Button = ({children, variant, className,link, ...rest}: Props) => {
    const variantStyles = variant === 'filled'? styles.filled : variant === 'outlined'? styles.outlined : styles.text;

    const resultClassName = `${styles.button} ${variantStyles} ${className}`;

    if(link){
        console.log('link is here')
        return <Link className={resultClassName} target="_blank" to={link}>
            {children}
        </Link>
    }


    return (
        <button className={resultClassName} {...rest}>
            {children}
        </button>
    );
};

export default Button;