import Button from "../../common/components/Button/Button.tsx";
import {spotifyAPI} from "../../api/spotifyAPI.ts";

export const Home = () => {

    const handleClick = () =>{
        const data = spotifyAPI.getMe().then(res=>res.data)
        console.log(data)
    }
    return <div style={{padding: '16px'}}>
        <h1>Home</h1>
        <Button onClick={handleClick}>get me</Button>
    </div>
}