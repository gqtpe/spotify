import {CSSProperties, HTMLAttributes, memo, ReactNode} from "react";


type Animations = 'pulsate' | 'wave'
type Props =  HTMLAttributes<HTMLDivElement> &{
    width?: number
    height?: number
    round?: boolean
    animation?: Animations
    children?: ReactNode
}
const Skeleton = ({children, width,height,round, animation = 'pulsate',style, ...rest}:Props) =>{
    const styles: CSSProperties = {
        display: 'block',
        width: width?width:'100%',
        height: height?height:'100%',
        borderRadius: round?'50%':'4px',
        color: "transparent",
        background:  animation === 'wave'?'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)':'#baaeae',
        backgroundSize:  animation === 'wave'? '200% 100%' : '100% 100%',
        animation: animation === 'wave'?'wave 2.5s infinite linear': 'pulsate 2.5s ease-in-out infinite',
        ...style
    }
    return <span style={styles} {...rest}>
        {children?children:'blank blank blank'}
    </span>
}
export default memo(Skeleton)