const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();
app.use(cors())
app.use(express.json())

app.post('/refresh', (req, res) => 
    {

        const refreshToken = req.body.refreshToken
        console.log("hi")
        const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:"ab262c1183ff45e89ae2b12af1c7aa70",
        clientSecret: "c8f45de0944246aaae9eacccb8a43e88",
        refreshToken
        }) 
                spotifyApi.refreshAccessToken()
                .then(data => (
                res.json({
                    accessToken: data.body.access_token,
                    expiresIn: data.body.expires_in
                })
                
                )).catch(err => {
                    res.sendStatus(400)
                    console.log(err)
                })
    }
)

app.post('/login', (req, res) => 
    {
        const code = req.body.code
        const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:"ab262c1183ff45e89ae2b12af1c7aa70",
        clientSecret: "c8f45de0944246aaae9eacccb8a43e88"
        })
        spotifyApi.authorizationCodeGrant(code)
        .then(data => (
            res.json({
                accessToken:data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
           
        )).catch(() => {
            res.sendStatus(400)
            
        })
    }
)
app.listen(3001)
