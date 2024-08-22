import './App.scss'
import {Outlet} from "react-router-dom";
import {spotifyAPI} from "../api/spotifyAPI.ts";
import Button from "../common/components/Button/Button.tsx";


function App() {
    const handleClick = () => {
        spotifyAPI.getMe().then(res => console.log('me:',res))
        spotifyAPI.getSavedTracks().then(res => console.log('saved tracks:',res))
        spotifyAPI.getSavedPlaylists().then(res => console.log('saved playlists:',res))
    }
    return (
        <div>
            <h1>Spotify Clone</h1>
            <Button variant="filled" onClick={handleClick}>get me</Button>
            <Outlet/>
        </div>
    )
}

export default App
