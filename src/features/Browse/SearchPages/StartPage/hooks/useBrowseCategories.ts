import {useEffect} from "react";
import {browseActions, browseSelectors} from "../../../index.ts";
import {useActions, useAppSelector} from "../../../../Application/hooks";


export const useBrowseCategories = () => {
    const categories = useAppSelector(browseSelectors.selectCategories)
    const {fetchBrowseCategories} = useActions(browseActions)
    useEffect(() => {
        if (!categories.length) {
            fetchBrowseCategories()
        }
    }, [])


    return {categories}
}