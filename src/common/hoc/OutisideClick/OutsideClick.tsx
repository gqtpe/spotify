import {FC, memo, ReactNode, useCallback, useRef} from "react";
import {useOnClickOutside} from "../../../features/Application/hooks";

type Props = {
    callback: () =>void
    children: ReactNode
}
const OutsideClick:FC<Props> = ({children,callback}) => {
    const anchorEl = useRef<HTMLDivElement>(null)
    const memoizedCallback = useCallback(callback, [callback]);
    useOnClickOutside(anchorEl, memoizedCallback)
    return <div ref={anchorEl} >{children}</div>
}

export default memo(OutsideClick)