import {AppRootStateType} from "./types.ts";


export const selectAppError = (state: AppRootStateType) => state.app.error

export const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized

export const selectAppSidebarState = (state: AppRootStateType) => state.app.sidebar

export const selectSidebarIsOpen = (state: AppRootStateType) => state.app.sidebar.isOpen

export const selectSidebarContent = (state: AppRootStateType) => state.app.sidebar.content
