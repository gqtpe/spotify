import slice, {asyncActions} from "./browseSlice.ts";
import Search from "./Search/Search.tsx";
import {useSearch} from "./Search/useSearch/useSearch.ts";

const browseReducer = slice.reducer
const browseActions = {
    ...slice.actions,
    ...asyncActions
}


export {
    browseReducer,
    Search,
    browseActions,
    useSearch
}