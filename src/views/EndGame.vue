<template>
  <div>
    <div class="background" ref="Background">
      <img src="/images/end.jpg">
      <div class="logo">
        <img src="/images/logo.png" width="400" height="130">
      </div>
      <ul class="menu">
        <span style="font-size: 32px;">{{ useLocalizeText('play_again') }}</span>
        <li @click="navRoot">{{ useLocalizeText('yes') }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalizeText } from '../composables/localization'
import { useFightStore } from '../stores/fight'
const fightStore = useFightStore();
import { useAppStore } from '../stores/app'
const appStore = useAppStore();
const router = useRouter();

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("EndGame");
  
});

/**
 * Navigate to start page
 */
const navRoot = () => {
  appStore.playSelect();
  router.push({ path: "/" });
};

</script>

<style scoped>
@import '../../public/styles/endGame.css'
</style>
