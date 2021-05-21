<template>
  <div class="search" >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="srch_wrpr" style="margin-left: auto;margin-right: auto;">
        <div class="srch_sb_cnt">
            <input type="text" :value="search" @input="updateSearch" class="sech_txt_inpt" placeholder="Busca tu Canción/Artista...">
            <button class="srch_btn" v-on:click="selectTrack(selectedTrack)">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div v-if="searchList.length > 0" class="containerTracks">
      <div class="container" style="height:500px;overflowY: auto;width:100%; background-color:white">
          
          <div class="row itemTrack"  v-for="track in searchList" :key="track.uri"  v-on:click="selectTrack(track)">
            <div class="col s4" >
              <img :src="track.albumUrl" height="64px" width="64px"  />
            </div>
            <div class="col s8" style="padding-top:3%;text-float:left;">
              {{track.title}} <br>
              <b> {{track.artist}}</b>
            </div>
          </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios"

export default {
  name: 'Search',
  props: {
    msg: String
  },
   computed: {
    ...mapState({
        spotifyApi: 'spotifyApi',
        search: state => state.search,
        searchList: 'searchList',
        selectedTrack: 'selectedTrack',
        serverIp: "serverIp"
      })
  },
  methods: {
    updateSearch (e) {
      this.$store.commit('updateSearch', e.target.value)
    },
    selectTrack(track){
      if(track!=null){
        this.$store.commit('setSearch', track.artist+" - "+track.title)
        this.$store.commit('setSelectedTrack', track)
        this.$store.commit('setSearchList', [])
        this.$store.commit('setIsLoadVideo', false)
        this.$store.commit('setIsSearching', true)

        // conectarme al serve y traer:
        // {lyric:"dddd", idVideoYoutube:""}
        // cargar video y letra
        axios.get(this.serverIp+"/getDataTrack",{
            params: {
              title: track.title,
              artist: track.artist
            }
          }).then(res => {
            console.log(Object.keys(res.data))
            this.$store.commit('setIdVideo', res.data.idVideo)
            this.$store.commit('setTitleVideo', res.data.titleVideo)
            this.$store.commit('setLyric', res.data.lyric)
            this.$store.commit('setInfoArtist', res.data.info_artist)
            this.$store.commit('setUrlImgArtist', res.data.url_img_artist)
            this.$store.commit('setIsLoadVideo', true)
            this.$store.commit('setIsSearching', false)

            
          })
          .catch(() => {
  
          })
          
      }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  @import url('https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900');
  @import url('https://fonts.googleapis.com/css?family=Playball');
  .srch_wrpr {width: 500px; max-width: 500px; height: 70px; position: relative; z-index: 1}
  .srch_sb_cnt {width: 100%; height: 70px; background-image: linear-gradient(120deg, #e5f5f1 0%, #dfe6e9 100%); background-color: transparent; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); overflow: hidden;  border-radius: 40px; }
  .sech_txt_inpt {border-bottom: none!important;box-shadow: none!important;opacity: 1; height: 50px; left: 10px; border-radius: 30px; border: 0; width: 94%; padding: 0 60px 0 15px; background-color: transparent; color: #333; font-size: 15px; transition: all 0.3s ease-in-out 0s; }
  .sech_txt_inpt:focus {letter-spacing: 2px;text-transform: uppercase;border-bottom: none!important;box-shadow: none!important;}
  .sech_txt_inpt:focus, .srch_btn:focus {outline: none;}
  .sech_txt_inpt, .srch_btn {position: absolute; z-index: 1; top: 50%; transform: translateY(-50%); }
  .srch_btn { width: 50px; height: 50px; right: 10px; border-radius: 100%; font-size: 20px; background-image: linear-gradient(to top, #1d7c83 0%, #175458 100%); color: #fff;text-shadow: 1px 1px 2px rgba(17, 12, 12, 0.2);}
  .containerTracks{
    width: 500px;  height: 0px; position: relative; z-index: 2;margin-left: auto;margin-right: auto; padding-top:5px;
  }
  .itemTrack{
    cursor: pointer;background-color:rgba(255, 255, 255, 0.999);border-bottom: 1px solid black;
  }
</style>
