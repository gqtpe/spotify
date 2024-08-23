import './App.scss'
import {Outlet, useNavigate} from "react-router-dom";
import Search from "../features/Browse/Search/Search.tsx";
import Badge from "../common/components/Badge/Badge.tsx";
import {AiFillHome} from "react-icons/ai";

function App() {
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate('/home')
    }
    return (
        <div className="app">
            <header className="header">
                <Badge variant="filled" onClick={handleClick}><AiFillHome /></Badge>
                <Search width={25}/>
            </header>
            <nav>
                nav
            </nav>
            {/*<Button variant="filled" onClick={handleClick}>get me</Button>*/}
            <main>
                <Outlet/>
            </main>
            <footer>
                <p>© 2022. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default App
