import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {authActions} from "../Auth";
import {appHooks} from "../Application";

const Callback = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/home'
    const {loggedIn} = appHooks.useAppSelector(state => state.auth)
    const {useActions} = appHooks
    const {fetchSpotifyToken} = useActions(authActions)
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');
        console.log(code);
        if (code) {
            fetchSpotifyToken(code);
        }
    }, [fetchSpotifyToken]);
    useEffect(()=>{
        if(loggedIn){
            navigate(fromPage)
        }
    },[loggedIn, navigate, fromPage])

    return <div>Loading...</div>;
};

export default Callback;
