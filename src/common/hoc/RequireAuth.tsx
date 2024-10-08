import {Navigate, useLocation} from "react-router-dom";
import {memo, ReactNode} from "react";
import {useAppSelector} from "../../features/Application/hooks";


type Props = {
    children: ReactNode
}
export const RequireAuth = memo(({children}: Props) => {
    const location = useLocation();
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    if (!loggedIn) {
        return <Navigate to="/login" state={{from: location}}/>
    }
    return <>{children}</>;
})