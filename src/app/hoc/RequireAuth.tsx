import {ReactNode} from "react";
import {appHooks} from "../index.ts";
import {Navigate, useLocation} from "react-router-dom";

type Props = {
    children: ReactNode
}
export function RequireAuth({children}:Props){
    const {useAppSelector} = appHooks
    const location = useLocation()
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    if(!loggedIn){
        return <Navigate to="/login" state={{from: location}}/>
    }
    return <>{children}</>
}