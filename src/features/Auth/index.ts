import Login from "./Login/Login";
import {slice} from "./authSlice.ts";


const authActions = {
    ...slice.actions,
}

export {
    Login,
    authActions
}