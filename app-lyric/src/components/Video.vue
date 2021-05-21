<template>
  <div class="video" style="width:700px;height:auto">
    <h4>{{titleVideo}}</h4>
    <LazyYoutubeVideo autoplay :src="urlVideo+idVideo" :iframeAttributes="youtubeAtributes"/>

  </div>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import { mapState } from "vuex";

export default {
  name: 'Video',
  props: {
    msg: String
  },
  components: {
    LazyYoutubeVideo,
  },
  data(){
    return {
      urlVideo: 'https://www.youtube.com/embed/',
      youtubeAtributes:{
        allowfullscreen: false
      },
    }
  },
  computed: {
    ...mapState({
        titleVideo: "titleVideo",
        idVideo: "idVideo"  
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
