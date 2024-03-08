<script setup>
//Import and vars
import { onMounted, onUnmounted,ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAppStore } from '../src/stores/app'
const appStore = useAppStore();
const router = useRouter();
appStore.setRouter(router);

const isOpen = ref(false);

onMounted(() => {
  window.addEventListener("resize", handleOrientationChange);
  handleOrientationChange();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleOrientationChange);
});

const handleOrientationChange = () => {
  console.info("entra al evento?");
  console.info("window.innerWidth",window.innerWidth);
  console.info("window.innerHeight",window.innerHeight);
  if (window.innerWidth > window.innerHeight) {
        isOpen.value = false;
    } else {
        isOpen.value = true;
    }
}


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
          autoplay loop>
        </audio>
        <div class="dialog-box-screen" v-if="isOpen">         
        </div>
      </div>
      <template #fallback>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
@import '../public/styles/app.css'
</style>

