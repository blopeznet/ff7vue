<template>
  <div>
    <div class="background" ref="Background">
      <customButton :buttonText="useLocalizeText('play')" :onClick="appStore.navHistory" >        
      </customButton>
      <customButton :buttonText="useLocalizeText('settings')" style="margin-left:132px" :onClick="appStore.navSettings" >        
      </customButton>  
      <img src="/images/main.jpg">
      <div class="home-logo">
        <img src="/images/logo.png" width="400" height="130">
      </div>
      <span class="version"> {{ "Demo Ver. 0.75"  }} </span>     
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { onBeforeMount } from 'vue'
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
import customButton from '../components/customButton.vue'
const appStore = useAppStore();
/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("Home");
});

</script>

<style scoped>
@import '../../public/styles/home.css'
</style>
