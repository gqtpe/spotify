import Login from "./Login/Login";
import {slice} from "./authSlice.ts";
import { asyncActions } from "./authThunks.ts";
import * as authSelectors from "./selectors.ts";

const authActions = {
    ...slice.actions,
    ...asyncActions
}
const authReducer = slice.reducer

export {
    Login,
    authActions,
    authReducer,
    authSelectors
}