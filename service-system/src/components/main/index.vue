<template>
  <div class="main">
      <router-view></router-view>
  </div>
</template>

<script>
//import time from "../../common/date"
export default {
    name:"home",
    mounted(){
        //console.log(time.get_current_time(),time.get_custom_time(time.get_current_time()));
    },
    data:()=>({

    })
}
</script>

<style>
    .main {
        width: 100%;
        height: 100%;
    }
</style>