import './App.scss'
import {Outlet} from "react-router-dom";


function App() {

    return (
        <div>
            <h1>Spotify Clone</h1>
            <Outlet/>
        </div>
    )
}

export default App
