import {useEffect} from "react";
import {useActions, useAppSelector} from "../features/Application/hooks";
import {appActions} from "../features/Application";


export const useInit = () => {

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