import { Footer } from "./Footer";
import slice from "./playerSlice";


const playerReducer = slice.reducer
const playerActions = {
    ...slice.actions
}

export {
    Footer,
    playerReducer,
    playerActions
}