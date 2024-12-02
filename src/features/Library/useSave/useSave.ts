import {userLibraryActions} from "../";
import {useActions} from "../../Application/hooks";

type SaveTypes = 'playlist' | 'album' | 'track' | 'artist';

type ReturnType<T extends SaveTypes> = T extends 'playlist'
    ? (playlist_id: string) => Promise<boolean>
    : (ids: string[]) => void;
//todo: album track artist saving logic
const useSave = <T extends SaveTypes>(type: T): ReturnType<T> => {
    const {saveItem, toggleSavePlaylist, fetchUserLibrary} = useActions(userLibraryActions);
    if (type === 'playlist') {
        return (async (playlist_id: string) => {
            const action = await toggleSavePlaylist({playlist_id})
            if (userLibraryActions.toggleSavePlaylist.fulfilled.match(action)) {
                await fetchUserLibrary();
                return action.payload.saved
            } else {
                throw new Error('failed to toggle save playlist')
            }
        }) as ReturnType<T>;
    }

    return ((ids: string[]) => {
        saveItem({type, ids});
    }) as ReturnType<T>;
};

export default useSave;
