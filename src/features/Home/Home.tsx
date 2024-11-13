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
    </div>
}