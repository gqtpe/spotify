import {GenreTile} from "./GenreTile/GenreTile.tsx";
import {useBrowseCategories} from "../SearchPages/StartPage/hooks/useBrowseCategories.ts";


const Genres = () => {
    const {categories} = useBrowseCategories()
    return <>
        {categories?.map(category => {
            return <GenreTile key={category.id} item={category}/>
        })}
    </>
}


export default Genres