import {userLibraryActions} from "../";
import {useActions} from "../../Application/hooks";

type SaveTypes = 'playlist' | 'album' | 'track' | 'artist' | 'user';

type ReturnType<T extends SaveTypes> = T extends 'playlist'
    ? (playlist_id: string) => Promise<boolean>
    : (ids: string[]) => Promise<boolean>;
const useSave = <T extends SaveTypes>(type: T): ReturnType<T> => {
    const {toggleSavePlaylist, toggleItemSave, fetchUserLibrary} = useActions(userLibraryActions);
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

    return (async (ids: string[]) => {
        const action = await toggleItemSave({type, ids})
        if(userLibraryActions.toggleItemSave.fulfilled.match(action)){
            await fetchUserLibrary();
            return action.payload.saved
        }else{
            throw new Error('failed to toggle save item')
        }
    }) as ReturnType<T>;
};

export default useSave;
