import {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    width: number
}

const Search = ({width, ...rest}: Props) => {
    return (
        <div className={styles.search} style={{width: `${width * 16}px`}}>
            <FiSearch id="search-icon" className={styles.icon}/>
            <input
                type="text"
                {...rest}
            />
        </div>
    )
}

export default memo(Search)
