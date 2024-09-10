import React from "react";
import styles from './Button.module.scss'
import {Link} from "react-router-dom";


type ButtonVariants = 'filled'|'outlined'|'text'|'icon'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:ButtonVariants
    link?:string
}
//todo: normal icon variant
const Button = ({children, variant = 'filled', className,link, ...rest}: Props) => {

    const resultClassName = `${styles.button} ${styles[variant]} ${className}`;

    if(link){
        return <Link className={resultClassName + ' ' + styles.buttonLink} to={link}>
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