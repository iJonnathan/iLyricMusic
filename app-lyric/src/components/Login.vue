<template>
  <div class="login" >
      <br><br><br><br><br>
      <br><br><br><br><br>
      <a class="waves-effect waves-light btn-large" :href="AUTH_URL" v-on:click="login()">
        Iniciar
      </a>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
   data(){
    return {
      AUTH_URL : "https://accounts.spotify.com/authorize?client_id=da7b7d21cdef42099a1cb5cdcb379df2&response_type=code&redirect_uri=https://ijonnathan.github.io/ilyricmusic/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",
     
     }
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 
</style>
