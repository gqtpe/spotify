import { Browse } from "./Browse.tsx";
import slice, {asyncActions} from "./browseSlice.ts";
import Search from "./Search/Search.tsx";
import {useSearch} from "./Search/useSearch/useSearch.ts";
import Playlists from "./SearchPages/Playlists/Playlists.tsx";
import Tracks from "./SearchPages/Tracks/Tracks.tsx";

const browseReducer = slice.reducer
const browseActions = {
    ...slice.actions,
    ...asyncActions
}


export {
    browseReducer,
    Search,
    browseActions,
    useSearch,
    Tracks,
    Browse,
    Playlists
}