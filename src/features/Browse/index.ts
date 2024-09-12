import {Browse} from "./Browse.tsx";
import slice, {asyncActions} from "./browseSlice.ts";
import Search from "./Search/Search.tsx";
import {useSearch} from "./Search/useSearch/useSearch.ts";
import Tracks from "./SearchPages/Tracks/Tracks.tsx";
import * as browseSelectors from "./selectors.ts"
import AllPage from "./SearchPages/All/All.tsx";


const browseReducer = slice.reducer
const browseActions = {
    ...slice.actions,
    ...asyncActions
}


export {
    browseReducer,
    Search,
    browseActions,
    browseSelectors,
    useSearch,
    Tracks,
    Browse,
    AllPage
}