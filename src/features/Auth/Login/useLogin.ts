import {appHooks} from "../../../app";
import {authActions} from "../index.ts";
import {useLocation} from "react-router-dom";
import {scopes} from "../scopes.ts";

const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
export const useLogin = () => {


    const {useAppSelector, useActions} = appHooks
    const hash = useLocation().hash
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const accessToken = useAppSelector(state => state.auth.authToken)
    const {setToken} = useActions(authActions)
    if (!accessToken) {
        if (hash) {
            const token = hash.substring(1).split('&')[0].split('=')[1]
            if (token) {
                setToken(token)
                window.localStorage.setItem('spotify-access_token', token)
            }
        }
    }
    const fromPage = useLocation().state?.from?.pathname || '/'

    const authURL = `${authEndpoint}/?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=${scopes}`

    return {loggedIn, fromPage, authURL}
}