<template>
  <div class="lyric" >
    <h3>Letra</h3>
    <div style="text-aling:center">
      <textarea class="textArea" v-model="lyric"  disabled="disabled" >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Lyric',
  props: {
    msg: String
  },
  computed: {
    ...mapState({
        lyric: "lyric"
      })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .textArea{
    border: none;
    font-size: 18px;
    line-height: 30px;
    min-height: 500px;
    text-align: center;
    width:100%
  }
</style>
