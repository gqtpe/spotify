import {Browse} from "./Browse.tsx";
import slice from "./browseSlice.ts";
import Search from "./Search/Search.tsx";
import {useSearch} from "./Search/useSearch/useSearch.ts";
import Tracks from "./SearchPages/Tracks/Tracks.tsx";
import * as browseSelectors from "./selectors.ts"
import AllPage from "./SearchPages/All/All.tsx";
import { BrowseStart } from "./SearchPages/StartPage/BrowseStart.tsx";
import {asyncActions} from "./browseThunks.ts";


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
    AllPage,
    BrowseStart
}