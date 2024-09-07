import {appActions, appHooks} from "../features/Application";
import {useEffect} from "react";


export const useInit = () => {
    const {useAppSelector, useActions} = appHooks

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const user = useAppSelector(state => state.auth.user)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        document.title = 'Spotify'
        setTimeout(() => {
            initializeApp();
        }, 500)

    }, [initializeApp])


    return {isInitialized, user}
}