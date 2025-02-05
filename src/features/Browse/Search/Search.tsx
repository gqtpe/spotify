import {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
}

const Search = ({ ...rest}: Props) => {
    return (
        <div className={styles.search}>
            <FiSearch id="search-icon" className={styles.icon}/>
            <input
                type="text"
                {...rest}
            />
        </div>
    )
}

export default memo(Search)
