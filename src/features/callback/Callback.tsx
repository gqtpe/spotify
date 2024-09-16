import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {authActions} from "../Auth";
import {useActions, useAppSelector} from "../Application/hooks";

const Callback = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/home'
    const {loggedIn} = useAppSelector(state => state.auth)
    const {fetchSpotifyToken} = useActions(authActions)
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');
        console.log(code);
        if (code) {
            fetchSpotifyToken(code);
        }
    }, [fetchSpotifyToken, location.search]);
    useEffect(()=>{
        if(loggedIn){
            navigate(fromPage)
        }
    },[loggedIn, navigate, fromPage])

    return <div>Loading...</div>;
};

export default Callback;
