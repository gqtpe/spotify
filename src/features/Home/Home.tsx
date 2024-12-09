import Button from "../../common/components/Button/Button.tsx";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {getItem} from "../../common/utils/localStorage.ts";
import axios from "axios";
import {useActions} from "../Application/hooks";
import {playerActions} from "../Player";

const handleClick = async () => {
    const response = await spotifyAPI.getMe()
    console.log('me:', response.data)
}
const fetchAvailableDevices = async () => {
    const response = await spotifyAPI.getAvailableDevices()
    console.log('devices:', response.data)
}
const refreshToken = async () => {
    const refreshToken = getItem('refresh_token')
    console.log(refreshToken)
    const response = await axios.post('https://spotify-back-lovat.vercel.app/refresh', {refresh_token: refreshToken});
    console.log('refresh Response:', response.data)
}
const fetchBrowseCategories = async () => {
    const response = await spotifyAPI.getBrowseCategories()
    console.log('categories:', response.data)
}
const fetchIsSaved = async () => {
    const response = await spotifyAPI.checkIsItemSaved('album', ['3iPSVi54hsacKKl1xIR2eH'])
    console.log('fetchIsSaved:', response.data)
}
const save = async () =>{
    const response = await spotifyAPI.saveItem('album', ['3iPSVi54hsacKKl1xIR2eH'])
    console.log('save:', response.data)
}
const remove = async () =>{
    const response = await spotifyAPI.removeItem('album', ['3iPSVi54hsacKKl1xIR2eH'])
    console.log('remove:', response.data)
}

export const Home = () => {
    const {fetchPlaybackState} = useActions(playerActions)
    const fetch = async () => {
        fetchPlaybackState()
    }
    return <div style={{padding: '16px'}}>
        <Button onClick={handleClick}>get me</Button>
        <Button onClick={fetchAvailableDevices}>get devices</Button>
        <Button onClick={refreshToken}>refreshToken</Button>
        <Button onClick={fetch}>playbackState</Button>
        <Button onClick={fetchBrowseCategories}>fetch categories</Button>
        {/*<Button onClick={fetchBrowseCategoryPlaylist}>fetch category playlists</Button>*/}
        <Button onClick={fetchIsSaved}> fetch is 3iPSVi54hsacKKl1xIR2eH saved</Button>
        <Button onClick={save}>saveItem</Button>
        <Button onClick={remove}>removeItem</Button>
    </div>
}