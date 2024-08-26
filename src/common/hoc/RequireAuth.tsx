import {Navigate, useLocation} from "react-router-dom";
import {memo, ReactNode} from "react";
import {authActions} from "../../features/Auth";
import {appHooks} from "../../features/Application";

type Props = {
    children: ReactNode
}
export const RequireAuth = memo(({children}: Props) => {
    console.log('REQUIRE AUTH ')
    const {useAppSelector, useActions} = appHooks;
    const {setToken} = useActions(authActions);
    const location = useLocation();
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const localStorageToken = window.localStorage.getItem("spotify-access_token");
    if (!loggedIn && !localStorageToken) {
        return <Navigate to="/login" state={{from: location}}/>;
    }
    if (!loggedIn) {
        setToken(localStorageToken!)
    }
    return <>{children}</>;
})