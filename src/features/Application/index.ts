import {slice} from "./appSlice.ts";
import * as appSelectors from "./selectors.ts";
import asyncAction from "./appThunks.ts";

const appActions = {
    ...slice.actions,
    ...asyncAction
}
const appReducer = slice.reducer
export {
    appReducer,
    appActions,
    appSelectors
}