<template>
  <div id="app" >
    <Login v-if="code==null"/>
    <div v-if="code!=null">
      <Home/>
    </div>
  </div>
</template>

<script>

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import axios from "axios"
import { mapState } from "vuex";

export default {
  name: 'App',
  components: {
    Login,
    Home
  },
  props: {
    msg: String
  },
  data(){
    return {
      AUTH_URL : "https://accounts.spotify.com/authorize?client_id=da7b7d21cdef42099a1cb5cdcb379df2&response_type=code&redirect_uri=http://localhost:8080/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",
      isLogged : false,
      code: new URLSearchParams(window.location.search).get("code"),
      data:null
    }
  },

  created(){
    if(this.code != null){      
        this.loggin();
    }
  },
  computed: {
    //...mapState("map", ["filteredStations"]),
    ...mapState({
        responseLoggin: "responseLoggin",
        spotifyApi: "spotifyApi",
        serverIp: "serverIp"
      })
  },
  methods: {
    loggin(){
      var code = this.code
      axios.post(this.serverIp+"/login", {code}).then(res => {
          this.$store.dispatch('loggin',res.data)
          this.spotifyApi.setAccessToken(res.data.accessToken)
          window.history.pushState({}, null, "/")
        })
        .catch(() => {
        console.log("Aaaaerrron")

        this.isLogged = false

        })
    }
  }
}
</script>

<style >
#app {
  
  color: #2c3e50;
  margin-top: 0px;
  height: 100% !important;
  width: 100% !important;
  background: url('./assets/background.png')
    center no-repeat;
    position: absolute; top: 0; left: 0;
}
</style>
