<template>
  <div>
    <div class="dialog-box custom-cursor" :class="{ 'open': isOpen }">
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="background" ref="Background">
      <img src="/images/menu.jpg" style="opacity: 0.7;">
      <div class="final-box final-box-characters-info" :style="{ top: (TopChars) + 'px' }">
        <div class="tabla">
          <table style="margin-top: 24px;margin-left: 24px;">
            <tr v-for="(character, index) in fightStore.characters" :key="index">
              <td v-if="character.isAvaliable"><img :src="getImageUrl(character.name)" width="98" height="110"></td>             
              <td style="width:200px">
                <table style="width:200px;margin-left: 24px;" v-if="character.isAvaliable">
                  <thead>
                    <tr>
                      <th style="font-size: 28px;">{{ useLocalizeText(character.name) }}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="font-size: 24px;font-weight: bold;color:aqua;">{{ useLocalizeText('nv') }}</td>
                      <td>{{ character.level }}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 24px;font-weight: bolder;color:aqua;">{{ useLocalizeText('pg') }}</td>
                      <td>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                          <span style="margin-bottom: -6px;">{{ character.pg }}/{{ character.pgMax }}</span>
                          <progress :max="character.pgMax" :value="character.pg" :class="'pg'"></progress>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 24px;font-weight: bolder;color:aqua">{{ useLocalizeText('pm') }}</td>
                      <td>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                          <span style="margin-bottom: -6px;">{{ character.pm }}/{{ character.pmMax }}</span>
                          <progress :max="character.pmMax" :value="character.pm" :class="'pm'"></progress>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>

        </div>
      </div>
      <div class="final-box final-box-menu-info" :style="{ top: (TopMenu) + 'px' }">
        <div class="grid-menu-item1" style="color:gray">{{ useLocalizeText('items') }}</div>
        <div class="grid-menu-item2" @click="restorePG">{{ useLocalizeText('restore_pg') }}</div>
        <div class="grid-menu-item2" @click="restorePM">{{ useLocalizeText('restore_pm') }}</div>
        <div class="grid-menu-item2" @click="navMap">{{ useLocalizeText('leave') }}</div>
      </div>
      <div class="final-box final-box-time-info" :style="{ bottom: (BottomTime) + 'px' }">
        <div class="grid-container">
          <div class="grid-item">{{ useLocalizeText('tmp') }}</div>
          <div class="grid-item">{{ time }}</div>
          <div class="grid-item">{{ useLocalizeText('gil') }}</div>
          <div class="grid-item">{{ `${fightStore.gil}G` }}</div>
        </div>
      </div>
      <div class="final-box final-box-place-info" :style="{ bottom: (BottomPlace) + 'px' }">
        <p class="info-text-place">{{ useLocalizeText('gaia_area') }}</p>
      </div>
      <div @click="navMap" class="final-box-aux">
        <p class="info-text">{{ useLocalizeText('map').toUpperCase() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
import { useLocalizeText } from '../composables/localization'
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/app'
const appStore = useAppStore();
import { useFightStore } from '../stores/fight'
const fightStore = useFightStore();
const router = useRouter();
const message = ref('');
const isOpen = ref(false);
const time = ref('');
const TopChars = ref(-600);
const TopMenu = ref(-500);
const BottomTime = ref(-100);
const BottomPlace = ref(-200);
let moveElementInterval; // Animation interval

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("Menu");
});

/**
 * Start animation and clock
 */
onMounted(() => {
  document.addEventListener('keydown', handleMenuKeyDown);
  updateTime();
  moveElementInterval = setInterval(moveElement, 1);
  setInterval(updateTime, 1000);
});

/**
 * Remove keyboard listener
 */
onUnmounted(() => {
  document.removeEventListener('keydown', handleMenuKeyDown);
});

/**
 * Navigation to map
 */
const navMap = () => {
  appStore.playMenu();
  router.push({ path: "Map" });
};

/**
 * Real time
 */
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  time.value = `${hours}:${minutes}:${seconds}`;
};


/**
 * Move element at start
 */
const moveElement = () => {
  const finalTopChars = 30;
  const finalTopMenu = 12;
  const finalBottomTime = 100;
  const finalBottomPlace = 10;

  let allElementsReachedFinalValues = [false, false, false, false];

  if (TopMenu.value <= finalTopMenu) {
    TopMenu.value += 3;
  } else {
    allElementsReachedFinalValues[0] = true;
  }

  if (TopChars.value <= finalTopChars) {
    TopChars.value += 3;
  } else {
    allElementsReachedFinalValues[1] = true;
  }

  if (BottomTime.value <= finalBottomTime) {
    BottomTime.value += 3;
  } else {
    allElementsReachedFinalValues[2] = true;
  }

  if (BottomPlace.value <= finalBottomPlace) {
    BottomPlace.value += 3;
  } else {
    allElementsReachedFinalValues[3] = true;
  }

  if (allElementsReachedFinalValues.every(value => value === true)) {
    clearInterval(moveElementInterval);
    console.info("detiene");
  }
};

/**
 * Key down controll
 * @param {*} event 
 */
const handleMenuKeyDown = async (event) => {
  appStore.playMenu();
  if (event.key === 'Escape') {
    router.push({ path: "Map" });
  }
};


/**
 * Restore PG
 */
const restorePG = async () => {
  appStore.playSelect();
  fightStore.resetPG();
  await showDialog("pg_restored");
  appStore.playRestore();

};


/**
 * Restore PM
 */
const restorePM = async () => {
  appStore.playSelect();
  fightStore.resetPM();
  await showDialog("pm_restored");
  appStore.playRestore();

};

/**
 * Show dialog with message
 */
const showDialog = async (key = "begin_fight") => {
  await new Promise(resolve => setTimeout(resolve, 500));
  message.value = useLocalizeText(key);
  isOpen.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  isOpen.value = false;
};

/**
 * Calculate image
 */
 const getImageUrl = (characterName) => {
  return `/ff7vue/images/${characterName.toLowerCase()}.png`;
}

</script>

<style scoped>
@import '../../public/styles/menu.css'
</style>
