import './App.scss'
import Button from "../components/Button/Button.tsx";
import {Outlet} from "react-router-dom";

const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT

function App() {
    console.log(authEndpoint)

    return (
        <div>
            <h1>Spotify Clone</h1>
            <Button variant="filled" link={`${authEndpoint}/?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`}>Log In</Button>
            <Outlet/>
        </div>
    )
}

export default App
