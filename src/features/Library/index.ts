import { Library } from "./Library";
import slice from './userLibrarySlice'
import * as userLibrarySelectors from "./selector.ts";
import {asyncActions} from "./libraryThunks.ts";


const userLibraryReducer = slice.reducer

const userLibraryActions = {
    ...slice.actions,
    ...asyncActions
}

export {
    Library,
    userLibraryReducer,
    userLibraryActions,
    userLibrarySelectors

}