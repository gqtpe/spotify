import {spotifyAPI, User as UserType} from "../../../../api/spotifyAPI.ts";
import {Typography} from "../../../../common/components/Typography/Typography.tsx";
import "./User.scss";
import Button from "../../../../common/components/Button/Button.tsx";
import Skeleton from "../../../../common/components/Skeleton/Skeleton.tsx";
import useSave from "../../../Library/useSave/useSave.ts";
import {useCallback, useEffect, useState} from "react";

type Props = {
    item: UserType
}
const User = ({item}: Props) => {
    const save = useSave('user')
    const [followState, setFollowState] = useState<boolean | null>(null)

    const handleClick = useCallback(async () => {
        const response = await save([item.id])
        setFollowState(response)
    }, [])
    useEffect(() => {
        const fetchFollowState = async () => {
            const response = await spotifyAPI.checkIsItemSaved('user', [item.id])
            setFollowState(response.data[0])
        }
        fetchFollowState()
    }, []);
    return <div className="detailed-page user">
        <div className="detailed-page__header user__header">
            <div className="detailed-page__image user__image">
                {item.images.length ?<img src={item.images[0]?.url} alt={item.display_name}/>:<Skeleton/>}
            </div>
            <div className="user__description">
                <Typography variant='subtitle1'>User</Typography>
                <Typography className="user__name" variant='h1'>{item.display_name}</Typography>
                <Typography variant='subtitle1' sx={{color: 'var(--text400)'}}>{item.email}</Typography>
                <Typography variant='subtitle1'
                            sx={{color: 'var(--text400)'}}>{item.followers.total} followers</Typography>
            </div>
        </div>
        <div className="detailed-page__actions artist__actions ">
            {followState === null ?
                <Button density="none" variant="outlined"><Skeleton>Following</Skeleton></Button>
                :
                <Button density="none" variant="outlined"
                        onClick={handleClick}>{followState ? 'Following' : 'Follow'}</Button>
            }
        </div>
    </div>
};

export default User;