import React from 'react'
import {Container} from 'react-bootstrap'

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId ="ab262c1183ff45e89ae2b12af1c7aa70";
const redirectUri = "http://localhost:3000";
const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-state"
];

export default function Login() {
    return (
        <Container style = {{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
 {(
  <a className="btn btn-success btn-lg"
  href= {`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true`}>
    Login to Spotify 
    </a>  
)}
        </Container>
    )
}
