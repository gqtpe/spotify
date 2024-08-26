import App from "../../app/App.tsx";
import { store } from "../../app/store.ts";
import * as appHooks from "./hooks"
import {slice, asyncActions} from "./appSlice.ts";

const appActions = {
    ...slice.actions,
    ...asyncActions
}

const appReducer = slice.reducer
export {
    App,
    store,
    appHooks,
    appReducer,
    appActions
}