import {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import styles from "./Search.module.scss";
import {IoIosSearch} from "react-icons/io";
import {useNavigate} from "react-router-dom";


type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    width: number;
}
const Search = ({width, placeholder = 'What do you want to play?', ...rest}: Props) => {
    //todo:bind with rtk

    // const [value, setValue] = useState('')
    // const [items, setItems] = useState<any>([])
    // const [filteredItems, setFilteredItems] = useState<Todo[]>(items)
    // const [timeoutId, setTimoutId] = useState<number|null>(0)

    const navigate = useNavigate()
    // useEffect(()=>{
    //
    // },[])
    //
    // const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
    //
    // }

    return <div className={styles.search} style={{width: `${width * 16}px`}}>
        <IoIosSearch id="search-icon" size={30}/>
        <input
            type="text"
            onFocus={() => navigate('/search')}
            placeholder={placeholder}
            {...rest}
        />
    </div>
}

export default memo(Search)