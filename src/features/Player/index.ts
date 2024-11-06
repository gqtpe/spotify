import { Footer } from "./Footer";
import slice, {asyncAction} from "./playerSlice";
import type {PlayerBackState} from "./types.ts";
import * as playerSelectors from "./selectors.ts";
import * as timeHelpers from "./utils/helpers.ts";
import useProgress from "./hooks/useProgress.ts";
import usePlayerActions from "./hooks/usePlayerActions.ts";

import Repeat from "./Repeat/Repeat.tsx";
import ProgressBar from "./ProgressBar/ProgressBar.tsx";
import Player from "./Player/Player.tsx";
import Panel from "./Panel/Panel.tsx";

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
    Footer,
    Repeat,
    ProgressBar,
    Player,
    Panel
}