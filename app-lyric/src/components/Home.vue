<template>
  <div id="home" style="padding-top:5%">
    <Search/>
    <div class="container" style="width:98%" v-if="isLoadVideo ">
      
        <div class="row">
            <div class="col s7" style="padding-top:2%;background-color:rgba(255,255,255,0.9)">
                <br><br><Video/>
            </div>
            <div class="col s5" style="padding-top:2%; background-color:rgba(255,255,255,0.9)">
                <Lyric/>
            </div>
        </div>
        <InfoArtist/>
    </div>
    <div>
      <br><br><br><br><br>
      <Loading v-if="!isLoadVideo && isSearching"/>
    </div>
  </div>
</template>

<script>
import Search from '../components/Search'
import Video from '../components/Video'
import Lyric from '../components/Lyric'
import Loading from '../components/Loading'
import InfoArtist from '../components/InfoArtist'

import { mapState } from "vuex";

export default {
  name: 'Home',
  components: {
    Search,
    Video,
    Lyric,
    Loading,
    InfoArtist
  },
  props: {
    msg: String
  },
  data(){
    return {
        AUTH_URL : "https://accounts.spotify.com/authorize?client_id=da7b7d21cdef42099a1cb5cdcb379df2&response_type=code&redirect_uri=http://localhost:8080/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",
        isLogged : false,
        code:null
    }
  },
   computed: {
    //...mapState("map", ["filteredStations"]),
    ...mapState({
        isLoadVideo: 'isLoadVideo',
        idVideo: 'idVideo',
        isSearching: 'isSearching'
      })
  },
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
