<template>
  <div class="infoArtist" style="background-color:rgba(82, 79, 79, 0.133)">
    <div style="width:100%;background-color:rgba(82, 79, 79, 0.433);padding:1px;">
      <h4> &nbsp;&nbsp;Información de Wikipedia</h4>
    </div>
    <div class="container" style="width:99%">
      <br>
      <div class="row" >
        <div class="col s4" style="padding-left:4%">
          <img :src="url_img_artist" height="300px" width="300px" class="circularImag"/>
        </div>
        <div class="col s8">
          <label for="" style="font-size:28px" >{{ selectedTrack.artist }}</label>
          <br>
          <br>
          <textarea class="infoArtist" v-model="info_artist"  disabled="disabled" >
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'InfoArtist',
  props: {
    msg: String
  },
  computed: {
    ...mapState({
        info_artist: "info_artist",
        url_img_artist: "url_img_artist",
        selectedTrack: "selectedTrack"
      })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.infoArtist{

    text-align: justify;
    height:100%;
    width:100%;
    min-height: 500px;
    line-height: 20px;
    font-size: 18px;
    border: none;

}.circularImag{
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;


}
</style>
