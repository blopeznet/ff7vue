<script setup>
//Import and vars
import { RouterView, useRouter } from 'vue-router'
import { useAppStore } from '../src/stores/app'
const appStore = useAppStore();
const router = useRouter();
appStore.setRouter(router);

/**
 * Function to calculate audio source
 * @param {*} path 
 */
const calculateAudio = (path) => {

  let fileName = "";

  if (path === '/') {
    fileName = 'home';
  } else {
    fileName = path.replace('/', '').toLowerCase();
  }

  return `/ff7vue/music/${fileName}.mp3`;

};


</script>

<template>
  <div>
    <Suspense>
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- Audio music player-->
        <audio ref="audioPlayer" :src="calculateAudio(router.currentRoute.value.fullPath)" :volume="appStore.musicVolume"
          autoplay loop></audio>
      </div>
      <template #fallback>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
@import '../public/styles/app.css'
</style>

