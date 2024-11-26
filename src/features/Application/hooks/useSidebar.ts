import {useAppSelector} from "./useAppSelector.ts";
import {useActions} from "./useActions.ts";
import {appActions, appSelectors} from "../index.ts";


export const useSidebar = () => {
    const {closeSidebar, openSidebar} = useActions(appActions)
    const open = useAppSelector(appSelectors.selectSidebarIsOpen)
    const content = useAppSelector(appSelectors.selectSidebarContent)
    const sidebarState = useAppSelector(appSelectors.selectAppSidebarState)
    const sidebarContentType = useAppSelector(appSelectors.selectSidebarContent)
    return {open, sidebarState, content, openSidebar, closeSidebar, sidebarContentType}

}
