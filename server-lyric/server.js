var http = require('https');
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")
const axios = require('axios')
const puppeteer = require('puppeteer'); // scraping
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//var urlYoutube = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=3'
var urlYoutube = 'https://www.googleapis.com/youtube/v3/search'
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  console.log("code: "+code)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      console.log("login")
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)

    })
})

app.get("/getDataTrack", async (req, res) => {
  console.log("getData")
  //urlYoutube = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&order=viewCount&q=pinkfloyd+timel&maxResults=3&key=AIzaSyB-7h4uMJ0suWuya3jyWnGj-UUxJx1arlw'
  
  //urlYoutube += '&q='+req.query.artist+'+'+req.query.title+'&key='+process.env.API_KEY_YOUTUBE

  const lyric = (await lyricsFinder(req.query.artist, req.query.title)) || "No disponemos letra para esta canción"
  const videoInfo = (await axios.get(urlYoutube,{
    params:{
      type: 'video',
      part: 'snippet',
      key: process.env.API_KEY_YOUTUBE,
      q: req.query.artist+' '+ req.query.title
    }
  })) || "No hay video"
  
  const infoWikipedia = await scrapeWikipedia("https://es.wikipedia.org/wiki/"+req.query.artist)
  //console.log(videoInfo.data.items)
  titleVideo = videoInfo.data.items[0].snippet.title
  idVideo = videoInfo.data.items[0].id.videoId

  res.send({ 
    lyric:lyric, 
    titleVideo:titleVideo, 
    idVideo:idVideo,
    info_artist:infoWikipedia.info_artist,
    url_img_artist:infoWikipedia.url_img_artist
  })
})

app.get("/init", async (req, res) => {

  res.send({msj:"good"})
})

const scrapeWikipedia = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  
  
  const imgs = await page.$$eval('.infobox img[src]', imgs => imgs.map(img => img.getAttribute('src')));
  var urlImg = "https:"+imgs[0]
  var parraphsArray = await page.$$eval('.mw-parser-output p', parraphs => parraphs.map(p => p.innerText));
  parraphsArray = parraphsArray.slice(0,7)
  browser.close()
  var infoArtist=''
  parraphsArray.forEach(p => {
    infoArtist += p+'\n\n'
  })
  //console.log(infoArtist)
  return {info_artist:infoArtist, url_img_artist:urlImg}
}
app.listen(process.env.PORT || 7000, () => {
  //a = await scrapeWikipedia("https://es.wikipedia.org/wiki/Rammstein")
  console.log("iniciando ilyricmusic server "+process.env.CLIENT_ID)
})