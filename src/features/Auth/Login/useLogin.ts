import {appHooks} from "../../../app";
import {authActions} from "../index.ts";
import {useLocation} from "react-router-dom";

export const useLogin = () =>{
    const {useAppSelector, useActions} = appHooks
    const hash = useLocation().hash
    const loggedIn = useAppSelector(state=>state.auth.loggedIn)
    const accessToken = useAppSelector(state=>state.auth.authToken)
    const {setToken} = useActions(authActions)
    if(!accessToken){
        if(hash){
            const token = hash.substring(1).split('&')[0].split('=')[1]
            if(token){
                setToken(token)
            }
        }
    }
    const fromPage = useLocation().state?.from?.pathname || '/'

    return {loggedIn, fromPage}
}