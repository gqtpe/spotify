import {Navigate, useLocation} from "react-router-dom";
import {memo, ReactNode} from "react";
import {useAppSelector} from "../../features/Application/hooks";
import {authSelectors} from "../../features/Auth";


type Props = {
    children: ReactNode
}
export const RequireAuth = memo(({children}: Props) => {
    const location = useLocation();
    const loggedIn = useAppSelector(authSelectors.selectIsLoggedIn);
    if (!loggedIn) {
        return <Navigate to="/login" state={{from: location}}/>
    }
    return <>{children}</>;
})