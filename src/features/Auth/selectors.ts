import {AppRootStateType} from "../Application/types.ts";


export const selectIsLoggedIn = (state: AppRootStateType) =>state.auth.loggedIn