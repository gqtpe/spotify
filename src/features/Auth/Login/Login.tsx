import Button from "../../../common/components/Button/Button.tsx";

const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;

const Login = () => {
    const authorize = authEndpoint + '/authorize'
    console.log(authorize)
    const handleClick = (str: string) =>{
        if(isCopied){
            setIsCopied(false)
        }
        navigator.clipboard.writeText(str)
        setIsCopied(true)
        setTimeout(()=>setIsCopied(false), 2000)
    }
    const style:CSSProperties = {
        opacity: isCopied ? 1 : 0,
        transition: 'opacity, 0.3s ease-in-out'
    }
    return (
        <div className="login">
            <div className="login__button"><Button variant="filled" link={authorize}>Log In</Button></div>
            <div className="login__hint">
                <div className="login__hint-login">
                    <span>login</span>
                    <b onClick={()=>handleClick('gqtpe-spotify-access@mail.ru')}>gqtpe-spotify-access@mail.ru</b>
                </div>
                <div className="login__hint-password">
                    <span>password</span>
                    <b onClick={()=>handleClick('access-free-gqtpe')}>access-free-gqtpe</b>
                </div>
            </div>
        </div>
    );
};

export default Login;