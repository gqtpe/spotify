const allOptions: Option[] = [
    {id: 'addToYourLibrary', title: 'Add To YourLibrary', availableFor: ['album', 'playlist']},
    {
        id: 'addToQueue',
        title: 'Add to queue',
        availableFor: ['album', 'playlist', 'track'],
        icon: <MdOutlinePlaylistAdd/>
    },
    {id: 'addToPlaylist', title: 'Add to playlist', availableFor: ['track']},
    {id: 'removeFromYourLibrary', title: 'Remove From Your library', availableFor: ['playlist', 'playlist']},
    {id: 'removeFromYourLibrary', title: 'Remove From Your library', availableFor: ['playlist', 'playlist']},
]
