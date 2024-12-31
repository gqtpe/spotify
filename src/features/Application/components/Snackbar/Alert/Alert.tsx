import {FC, ReactNode} from "react";


type Props = {
    children: ReactNode
    onDismiss: () => void;
}

export const Alert: FC<Props> = ({children, onDismiss}) =>{
    return <div style={{background: 'tomato',color: 'white', padding: 10, borderRadius: '4px'}}>
        {children}
        {/*<button onClick={onDismiss}>X</button>*/}
    </div>
}