import {Navigate, useLocation} from "react-router-dom";
import {ReactNode, useEffect} from "react";
import {authActions} from "../../features/Auth";
import {appHooks} from "../index.ts";

type Props = {
    children: ReactNode
}
export const RequireAuth = ({ children }: Props) => {
    const { useAppSelector, useActions } = appHooks;
    const { setToken } = useActions(authActions);
    const location = useLocation();
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const localStorageToken = window.localStorage.getItem("spotify-access_token");

    useEffect(() => {
        if (localStorageToken) {
            setToken(localStorageToken);
        }
    }, [localStorageToken, setToken]);

    if (!loggedIn && !localStorageToken) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <>{children}</>;
};