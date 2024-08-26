import {Navigate} from "react-router-dom";
import {useLogin} from "./useLogin.ts";
import Button from "../../../common/components/Button/Button.tsx";



const Login = () => {
    console.log('Login')
    const {loggedIn, fromPage, authURL} = useLogin()
    if (loggedIn) {
        return <Navigate to={fromPage} replace/>
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px 0'}}>
            <Button variant="filled"
                    link={authURL}>Log
                In</Button>
        </div>
    );
};

export default Login;