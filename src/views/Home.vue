<template>
  <div>
    <div class="background" ref="Background">
      <img src="/images/main.jpg">
      <div class="home-logo">
        <img src="/images/logo.png" width="400" height="130">
      </div>
      <span class="version"> {{ "Demo Ver. 0.50"  }} </span>
      <ul class="home-menu">
        <li @click="navHistory">{{ useLocalizeText('play') }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
const appStore = useAppStore();
const router = useRouter();

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("Home");
});

/**
 * Navigation to history
 */
const navHistory = () => {
  appStore.playSelect();
  router.push({ path: "History" });
};

</script>

<style scoped>
@import '../../public/styles/home.css'
</style>
