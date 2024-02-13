<script setup>
//Import and vars
import { RouterView, useRouter } from 'vue-router'
import { useAppStore } from '../src/stores/app'
import Controller from './components/Controller.vue'
import { useLocalizeText } from './composables/localization'

const appStore = useAppStore();
const router = useRouter();

/**
 * Navigate to root
 */
const navHome = () => {
  router.push({ path: "/" });
};

/**
 * Navigate to about
 */
const navAbout = () => {
  router.push({ path: "/about" });
};

/**
 * Navigate to help
 */
const navHelp = () => {
  router.push({ path: "/help" });
};

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

// Function to update volume
const updateVolume = (event) => {
  appStore.musicVolume = parseFloat(event.target.value);
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
        <audio ref="audioPlayer" :src="calculateAudio(router.currentRoute.value.fullPath)"
          :volume="appStore.musicVolume" autoplay loop></audio>
      </div>
      <template #fallback>
      </template>
    </Suspense>
    <!-- Dialog jostick -->
    <Controller v-if="appStore.showJoy" :open="true" modal class="controller-container">
    </Controller>
    <!-- Bottom bar -->
    <div class="bottom-bar">
      <div class="button-group">
        <div class="left-buttons"> 
          <div class="round-button-container" >
            <button @click="navHome" class="round-button">{{ useLocalizeText("reset") }}</button>
          </div>              
          <div class="round-selector-container">
            <span class="bottom-bar-label" style="margin-bottom: 10px;">{{ useLocalizeText("volume") }}</span>
            <input type="range" min="0" max="1" step="0.01" :value="appStore.musicVolume" id="volumeControl"
              @input="updateVolume" style="margin-bottom: 10px;">
          </div>
          <div class="round-button-container">
            <button class="round-button" @click="appStore.soundEffects = !appStore.soundEffects">
              {{  useLocalizeText("effects") + " " +
              useLocalizeText(appStore.soundEffects.toString()) }}
            </button>            
          </div>
        </div>
      </div>
      <div class="right-buttons">
          <div class="locale-changer">
            <span class="bottom-bar-label" style="margin-right: 12px;">{{ useLocalizeText("language") }}</span>
            <select v-model="$i18n.locale" style="margin-right: 12px;max-width: 100px;">
              <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{
                useLocalizeText(locale) }}
              </option>
            </select>
          </div>        
          <div class="round-button-container" >
            <button @click="navHelp" class="round-button">{{ useLocalizeText("help") }}</button>
          </div>
          <div class="round-button-container" style="margin-right: 12px;">
            <button @click="navAbout" class="round-button">{{ useLocalizeText("about") }}</button>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../public/styles/app.css'
</style>

