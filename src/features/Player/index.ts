import { Footer } from "./Footer";
import slice from "./state/playerSlice.ts";
import type {PlayerBackState} from "./types.ts";
import * as playerSelectors from "./state/selectors.ts";
import * as timeHelpers from "./utils/helpers.ts";
import usePlayerActions from "./hooks/usePlayerActions.ts";
import usePlayAction from "./hooks/usePlayAction.ts";
import Repeat from "./Player/Repeat/Repeat.tsx";
import ProgressBar from "./Player/ProgressBar/ProgressBar.tsx";
import Player from "./Player/Player.tsx";
import Panel from "./Panel/Panel.tsx";
import CurrentlyPlaying from "./CurrentlyPlaying.tsx";
import playerAsyncActions  from "./state/thunks/playerThunks.ts";
import playbackAsyncActions  from "./state/thunks/playbackThunks.ts";
import queueAsyncActions  from "./state/thunks/queueThunks.ts";

const playerReducer = slice.reducer
const playerActions = {
    ...slice.actions,
    ...playerAsyncActions,
    ...playbackAsyncActions,
    ...queueAsyncActions,

}

export {
    playerReducer,
    playerActions,
    playerSelectors,
    PlayerBackState,
    timeHelpers,
    usePlayerActions,
    usePlayAction,
    Footer,
    Repeat,
    ProgressBar,
    Player,
    Panel,
    CurrentlyPlaying
}