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
      AUTH_URL : process.env.VUE_APP_AUTH_URL,
     }
  },
  
  mounted(){
    alert(this.AUTH_URL)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 
</style>
