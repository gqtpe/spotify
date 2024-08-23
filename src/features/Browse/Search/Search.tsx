import {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import styles from "./Search.module.scss";
import {IoIosSearch} from "react-icons/io";
import {useNavigate} from "react-router-dom";


type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    width: number;
}
const Search = ({width, placeholder = 'What do you want to play?', ...rest}:Props) => {
    const navigate = useNavigate()

    return <div className={styles.search} style={{width: `${width*16}px`}}>
        <IoIosSearch id="search-icon" size={30}/>
        <input
            type="text"
            onFocus={()=>navigate('/search')}
            placeholder={placeholder}
            {...rest}
        />
    </div>
}

export default memo(Search)