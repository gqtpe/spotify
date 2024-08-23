import {DetailsHTMLAttributes, memo, ReactNode} from "react";
import './Badge.scss'

type Props = DetailsHTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    variant: 'filled' | 'icon'
}
const Badge = ({variant, children, ...rest}:Props) =>{
    const variantClassName = variant === 'filled' ? 'filled' : 'icon'
    return <div className={`badge ${variantClassName}`} {...rest}>
        {children}
    </div>
}

export default memo(Badge);