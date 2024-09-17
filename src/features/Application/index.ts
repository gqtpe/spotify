import {asyncActions, slice} from "./appSlice.ts";

const appActions = {
    ...slice.actions,
    ...asyncActions
}
const appReducer = slice.reducer
export {
    appReducer,
    appActions
}