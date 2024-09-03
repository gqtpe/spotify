import {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import styles from "./Search.module.scss";
import {IoIosSearch} from "react-icons/io";
import {useSearch} from "./useSearch.ts";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    width: number;
}

const Search = ({width, placeholder = 'What do you want to play?', ...rest}: Props) => {
    const {onChange,onFocus,value} = useSearch();
    return (
        <div className={styles.search} style={{width: `${width * 16}px`}}>
            <IoIosSearch id="search-icon" size={30}/>
            <input
                type="text"
                onFocus={onFocus}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    )
}

export default memo(Search)
