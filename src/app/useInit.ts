import {useEffect} from "react";
import {useActions, useAppSelector} from "../features/Application/hooks";
import {appActions} from "../features/Application";
import {Tabs} from "../features/Browse/browseSlice.ts";
import {useLocation} from "react-router-dom";
import {browseActions} from "../features/Browse";


export const useInit = () => {
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const user = useAppSelector(state => state.auth.user)
    const {initializeApp} = useActions(appActions)
    //browse
    const location = useLocation()
    const {setActiveTab, setQuery} = useActions(browseActions)


    useEffect(() => {
        document.title = 'Spotify'
        setTimeout(() => {
            initializeApp();
        }, 500)

    }, [initializeApp])
    useEffect(() => {
        if (location.pathname.includes('/search')) {
            if (location.pathname.split('/')[2]) {
                setQuery(location.pathname.split('/')[2])
                if (location.pathname.split('/')[3]) {
                    setActiveTab(location.pathname.split('/')[3] as Tabs)
                } else {
                    setActiveTab('all')
                }
            }
        }
    }, [])

    return {isInitialized, user}
}