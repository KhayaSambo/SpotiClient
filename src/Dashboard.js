import React from 'react'
import useAuth from './useAuth'
import Player from './Player'
import {Container, Form, Row} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'


const SpotifyApi = new SpotifyWebApi({
    clientId: "ab262c1183ff45e89ae2b12af1c7aa70"
})
export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search,setSearch] = useState("")
    const [searchResults ,setSearchResults] = useState([])
    const [playingTrack ,setPlayingTrack] = useState()

    function chooseTrack(track){
        setPlayingTrack(track)
        setSearch('')
    }

    useEffect(() => {
       if(!accessToken) return
        SpotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false
        SpotifyApi.searchTracks(search).then(res => { 
            if(cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0]
            )
            return{
                artists: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: track.album.images[1].url
            }    
        })
        )
    })
   
    return() => cancel = true
     }, [search, accessToken])

    return(
        <Container>
         <div>
    <Form.Control
    type="search" placeholder="Search" value={search}
    onChange={e => setSearch(e.target.value)}
    />
    </div>
    <div className="flex-grow-1 " style={{ height: "80vh", overflowY: "auto"}}>
    <Row xs={1} md={3} className="g-4">
       {searchResults.map(track => (<TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}  />))
        }
        </Row>
    </div>
    <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
</Container>
)
}
