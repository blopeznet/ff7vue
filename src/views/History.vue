<template>
  <div>
    <div class="background" ref="Background" @click="appStore.navMap">
      <customButton :buttonText="useLocalizeText('next')" :onClick="appStore.navMap">
      </customButton>
      <img src="/images/history.jpg">
      <Transition name="bounce">
        <div class="dialog-box-history" v-if="isOpen">
          <div class="dialog-content" @click="appStore.navMap">
            <p>{{ text }}</p>
          </div>
        </div>
      </Transition>
      <div class="history-cloud" ref="Cloud">
        <img src="/images/cloud.gif" width="48" height="102">
      </div>
      <div class="history-sephirot" ref="Sephirot" :style="{ opacity: sephirotOpacity }">
        <img src="/images/sephirot.gif" width="57" height="120">
      </div>
      <div class="history-aeris" ref="Aeris" :style="{ opacity: aerisOpacity }">
        <img src="/images/aeris.gif" width="37" height="94">
      </div>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { ref, onMounted, onBeforeMount } from 'vue';
import customButton from '../components/customButton.vue'
import { useRouter } from 'vue-router';
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
import { useFightStore } from '../stores/fight'
const fightStore = useFightStore();
const appStore = useAppStore();
const router = useRouter();
const text = ref(useLocalizeText('history_intro'));
const textComplete = useLocalizeText('history');
const writingSpeed = 50;
const isOpen = ref(false);
const sephirotOpacity = ref(0);
const aerisOpacity = ref(0);

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("History");
});

/**
 * Show characters and write text
 */
onMounted(async () => {
  await Promise.all([
    new Promise(resolve => {
      setTimeout(() => {
        isOpen.value = true;
        resolve();
      }, 1000);
    }),
    new Promise(resolve => {
      setTimeout(() => {
        writeText();
        resolve();
      }, 2000);
    }),
    new Promise(resolve => {
      setTimeout(() => {
        fadeInCharacters();
        resolve();
      }, 3000);
    })

  ]);



});

/**
 * Show chars
 */
function fadeInCharacters() {
  setTimeout(() => {
    sephirotOpacity.value = 1;
  }, 1000);
  setTimeout(() => {
    aerisOpacity.value = 1;
  }, 2000);
}

/**
 * Write text on Message
 */
function writeText() {
  let index = 0;
  const interval = setInterval(() => {
    text.value += textComplete[index];
    index++;
    if (index === textComplete.length) {
      clearInterval(interval);
    }
  }, writingSpeed);
}


</script>

<style scoped>
@import '../../public/styles/history.css'
</style>
