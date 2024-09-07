import {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import styles from "./Search.module.scss";
import {IoIosSearch} from "react-icons/io";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    width: number
    bindToAddressBar?: boolean
}

const Search = ({width, ...rest}: Props) => {
    return (
        <div className={styles.search} style={{width: `${width * 16}px`}}>
            <IoIosSearch id="search-icon" size={30}/>
            <input
                type="text"
                {...rest}
            />
        </div>
    )
}

export default memo(Search)
