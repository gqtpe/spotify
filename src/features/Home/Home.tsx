import Button from "../../common/components/Button/Button.tsx";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {useAppSelector} from "../Application/hooks";
import {playerSelectors} from "../Player";

const handleClick = async () =>{
    const response = await spotifyAPI.getMe()
    console.log('me:',response.data)
}
const fetchAvailableDevices = async () =>{
    const response = await spotifyAPI.getAvailableDevices()
    console.log('devices:', response.data)
}

export const Home = () => {
    const playback = useAppSelector(playerSelectors.selectPlayback)
    const showPlayback = ()=>{
        console.log('playback:', playback)
    }

    return <div style={{padding: '16px'}}>
        <Button onClick={handleClick}>get me</Button>
        <Button onClick={fetchAvailableDevices}>get devices</Button>
        <Button onClick={showPlayback}>show Playback</Button>
    </div>
}