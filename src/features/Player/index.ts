import { Footer } from "./Footer";
import slice, {asyncAction} from "./playerSlice";
import type {PlayerBackState} from "./types.ts";


const playerReducer = slice.reducer
const playerActions = {
    ...slice.actions,
    ...asyncAction,

}

export {
    Footer,
    playerReducer,
    playerActions,
    PlayerBackState
}