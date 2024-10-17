import Button from "../../../common/components/Button/Button.tsx";

const authEndpoint = import.meta.env.SPOTIFY_BACK_ENDPOINT;

const Login = () => {
    const authorize = authEndpoint + '/authorize'
    console.log(authorize)
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px 0'}}>
            <Button variant="filled" link={authorize}>Log In</Button>
        </div>
    );
};

export default Login;