import {RefObject, useEffect} from "react";
const useOnClickOutside = (anchor: RefObject<HTMLElement>, callback: (e: Event) => void) => {
    useEffect(() => {
        //listener function checks if it clicked inside anchor it return, else call callback function
        const listener = (e: Event) => {
            const el = anchor.current
            if (!el || el.contains((e?.target as Node) || null)) {
                return
            }
            callback(e)
        }
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        }
    }, [anchor, callback])
}
export default useOnClickOutside