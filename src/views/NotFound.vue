<template>
  <div>
    <div class="background" ref="Background">
      <customButton :buttonText="useLocalizeText('home')" :onClick="appStore.navHome" >        
      </customButton>
      <img src="/images/404.jpg">
      <div class="logo">
        <img src="/images/logo.png" width="400" height="130">
      </div>
      <ul class="menu">
        <p>{{ useLocalizeText('oops') }}</p>
      </ul>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { onBeforeMount } from 'vue'
import { useLocalizeText } from '../composables/localization'
import customButton from '../components/customButton.vue'
import { useAppStore } from '../stores/app'
const appStore = useAppStore();

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("NotFound");
});

</script>

<style scoped>
@import '../../public/styles/endGame.css'
</style>
