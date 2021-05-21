import Vue from 'vue'
import Vuex from 'vuex'
import SpotifyWebApi from "spotify-web-api-node"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverIp: process.env.VUE_APP_SERVERIP,
    isLogged: false,
    responseLoggin: {},
    search: "",
    searchList:[],
    lyric: "",
    spotifyApi : new SpotifyWebApi({
      clientId: "da7b7d21cdef42099a1cb5cdcb379df2",
    }),
    selectedTrack:null,

    idVideo:'',
    titleVideo:'',
    isLoadVideo:false,
    isSearching:false,

    info_artist:'es cool',
    url_img_artist:'https://unavatar.vercel.app/github/nafeeur10?fallback=https://s3.amazonaws.com/laracasts/images/forum/avatars/default-avatar-1.png'


  },
  mutations: {
    loggin(state, resp){
      state.responseLoggin = resp
    },
    setSearch(state, search){
      state.search = search
    },
    setSearchList(state, list){
      state.searchList = list
    },
    updateSearch (state, search) {
      state.search = search;
      if(state.search != ''){
        state.spotifyApi.searchTracks(state.search).then(res => {
          state.searchList = res.body.tracks.items.map(track => {
              
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url
              }
            })
        })

      }
      else{
        state.searchList = []
      }
    },
    setIsLoadVideo(state, isload){
      state.isLoadVideo = isload
    },
    setIsSearching(state, isSearching){
      state.isSearching = isSearching
    },
    setSelectedTrack(state, track){
      state.selectedTrack = track
    },
    setLyric(state, lyric){
      state.lyric = lyric
    },
    setIdVideo(state, id){
      state.idVideo = id
    },
    setTitleVideo(state, title){
      state.titleVideo = title
    },

    setInfoArtist(state, info){
      state.info_artist = info
    },
    setUrlImgArtist(state, url){
      state.url_img_artist = url
    },
  },
  actions: {
    loggin:({ commit }, resp) => {
      commit('loggin', resp);
    },
    setSearch:({ commit }, search) => {
      commit('setSearch', search);
    },
    setSearchList:({ commit }, list) => {
      commit('setSearchList', list);
    },
  },
  modules: {
  }
})
