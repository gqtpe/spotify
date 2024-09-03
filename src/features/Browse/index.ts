import slice, {asyncActions} from "./browseSlice.ts";
import Search from "./Search/Search.tsx";


const browseReducer = slice.reducer
const browseActions = {
    ...slice.actions,
    ...asyncActions
}


export {
    browseReducer,
    Search,
    browseActions
}