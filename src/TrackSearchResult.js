import React from 'react'
import "./TrackSearchResult.css"
import Card from 'react-bootstrap/Card'
import { render } from '@testing-library/react'


 
export default function TrackSearchResult({ track ,chooseTrack}) {

    function handlePlay(){
        chooseTrack(track)

    }
      const blur = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        marginBottom: '0px',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropfilter: 'blur(4)',
        color: "#000000",
        padding: '10px',
        textAlign: 'center',
        borderRadius: '0px 0px 10px 10px',
        }
    
    return <div  style={{ cursor: "pointer"}} onClick={handlePlay}>
   
        <div styles={{backgroundImage:track.albumUrl }} > 
        <div><b>{track.title}</b></div> </div>
       
        {/* <Card >
  <Card.Img variant="top" src={track.albumUrl} alt="Album Art" style={{height:"64px",  borderRadius: '10px', width: "64px"}} />
  <Card.Body>
    <div style={blur}> {track.title}</div>
    <Card.Text>
    {track.artists}
    </Card.Text>
  </Card.Body>
</Card> */}
  

    </div>
}
