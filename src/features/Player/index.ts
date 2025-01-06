import { Footer } from "./Footer";
import slice from "./playerSlice";
import type {PlayerBackState} from "./types.ts";
import * as playerSelectors from "./selectors.ts";
import * as timeHelpers from "./utils/helpers.ts";
import useProgress from "./hooks/useProgress.ts";
import usePlayerActions from "./hooks/usePlayerActions.ts";
import usePlayAction from "./hooks/usePlayAction.ts";
import Repeat from "./Player/Repeat/Repeat.tsx";
import ProgressBar from "./Player/ProgressBar/ProgressBar.tsx";
import Player from "./Player/Player.tsx";
import Panel from "./Panel/Panel.tsx";
import CurrentlyPlaying from "./CurrentlyPlaying.tsx";
import {asyncAction} from "./playerThunks.ts";

const playerReducer = slice.reducer
const playerActions = {
    ...slice.actions,
    ...asyncAction,

}

export {
    playerReducer,
    playerActions,
    playerSelectors,
    PlayerBackState,
    timeHelpers,
    usePlayerActions,
    useProgress,
    usePlayAction,
    Footer,
    Repeat,
    ProgressBar,
    Player,
    Panel,
    CurrentlyPlaying
}