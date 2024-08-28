import Login from "./Login/Login";
import {asyncActions, slice} from "./authSlice.ts";

const authActions = {
    ...slice.actions,
    ...asyncActions
}
const authReducer = slice.reducer

export {
    Login,
    authActions,
    authReducer
}