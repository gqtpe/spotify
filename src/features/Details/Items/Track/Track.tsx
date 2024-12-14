import {FC} from "react";

import type {Track} from "../../../../api/types/track.ts";

const Track: FC<{ item: Track }> = ({item}) => {
    const play = usePlayAction()
    const [isSaved, setIsSaved] = useState(false)
    const save = useSave('track')
    const handleClick = async () => {
        const state = await save([item.id])
        setIsSaved(state);
    }
    useEffect(() => {
        const fetchIsSaved = async () => {
            const response = await spotifyAPI.checkIsItemSaved(item.type, [item.id])
            setIsSaved(response.data[0])
        }
        fetchIsSaved()
    }, []);
    return (
        <div className="detailed-page track">
            <div className="detailed-page track">
                <div className="detailed-page__header track__header">
                    <div className="detailed-page__image track__image">
                        <img src={item?.album.images[0]?.url} alt={item?.name}/>
                    </div>
                    <div className="detailed-page-description">
                        <Typography variant='subtitle1'>Track</Typography>
                        <Typography className="track__title" variant='h1'>{item?.name}</Typography>
                        <div className="detailed-page__stats">
                            {item.artists.map(artist=>{
                                return <><Typography variant='subtitle1' link={'/artist/' + artist.id}>
                                    {artist.name}
                                </Typography>•</>
                            })}
                            <Typography variant='subtitle1'
                                        sx={{color: 'var(--text-400)'}}>{item?.album.release_date}</Typography>•
                            <Typography variant='subtitle1'
                                        sx={{color: 'var(--text-400)'}}>{msToTime(item?.duration_ms)}</Typography>
                        </div>
                    </div>
                </div>
                <div className="detailed-page__content">
                    <div className="detailed-page__actions track__actions">
                        <IconButton fz={24} onClick={() => play({type: 'track', uris: [item?.uri]})}>
                            <FaPlay/>
                        </IconButton>
                        <IconButton fz={24} variant="icon" onClick={handleClick}>
                            {isSaved ? <IoIosCheckmarkCircle/> : <IoIosAddCircleOutline/>}
                        </IconButton>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A delectus ipsa magnam repellat sequi. Aliquid, animi architecto atque consequuntur ducimus ea fuga minus odit, tempora temporibus totam veritatis vitae? Aliquam aperiam dolor dolores doloribus esse eum iure laborum magni natus nesciunt odio officia officiis porro quasi ratione, repellendus ullam. Ad aliquam commodi consectetur cupiditate deserunt dolorum eum expedita ipsam iste labore minima nobis nostrum, nulla numquam omnis porro quaerat repellat velit veniam vitae. Dicta ipsum nesciunt rem similique velit. Architecto assumenda, blanditiis delectus earum in laboriosam, libero magnam modi numquam officia omnis placeat repellat ullam. Consequatur cupiditate fuga molestias natus nobis perspiciatis quia quidem ratione recusandae rerum sapiente, temporibus? Alias atque dicta eaque excepturi facilis iure magni minima tempore voluptas! Consequatur cum doloribus fugiat modi sapiente. Adipisci assumenda deserunt doloribus error labore pariatur praesentium quidem ratione, sint. Ad nostrum similique vero voluptates! Accusamus adipisci, assumenda consequuntur ea enim esse ex facere fugit hic incidunt ipsum laudantium magnam omnis perferendis placeat praesentium, provident quae quo ullam unde. Accusantium at eaque illo iusto maiores minus non, nostrum odit quod sequi, tempora velit veritatis. Accusantium commodi cum doloribus, esse fugiat illo in itaque minima necessitatibus nesciunt nobis obcaecati officiis optio, quae vero. Ab doloribus iure molestiae molestias suscipit tempora. Architecto distinctio fugit itaque libero natus? Aspernatur, nostrum, sapiente. Dolore impedit, nobis. Amet aspernatur commodi, eligendi eum ex exercitationem iste, labore, laborum molestiae nesciunt officiis pariatur quasi quidem quo repudiandae sed voluptatum? At doloribus eveniet iste modi nam unde, voluptate? A ab accusantium adipisci aliquam aspernatur at autem beatae, corporis deleniti distinctio dolor dolores doloribus eius eligendi et eveniet expedita facilis fuga fugit in iste laudantium maiores neque nobis obcaecati odio possimus praesentium quae quaerat quia quos reiciendis soluta unde. Beatae earum officia omnis provident repellat, sint temporibus. Ad cupiditate distinctio iste minus nisi odio odit praesentium qui, quo, rem similique sunt ut voluptas! Deleniti illo nam nesciunt sit voluptas! Accusantium blanditiis commodi error et facere facilis impedit itaque laudantium maiores minima neque, perspiciatis quis quos tempore.
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Track;
