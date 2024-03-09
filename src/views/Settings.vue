<template>
  <div>
    <div class="dialog-box custom-cursor" :class="{ 'open': isOpen }">
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="background" ref="Background">
      <customButton :buttonText="useLocalizeText('reset')" :onClick="appStore.navHome">
      </customButton>
      <img src="/images/menu.jpg" style="opacity: 0.7;">
      <div class="final-box final-box-big-info" :style="{ top: (TopChars) + 'px' }">
        <div class="tabla">
          <table style="margin-top: 24px; margin-left: 24px;width:500px">
            <tr>
              <td style="text-align: left">
                <div style="display: flex; align-items: center;">
                  <span class="bottom-bar-label">{{ useLocalizeText("volume") }}</span>
                  <input class="ff7-selector" style="margin-bottom:12px;margin-left:12px;" type="range" min="0" max="1"
                    step="0.01" :value="appStore.musicVolume" id="volumeControl" @input="updateVolume">
                </div>

              </td>
            </tr>
            <tr>
              <td style="text-align: left">
                <div style="display: flex; align-items: center;">
                  <span class="bottom-bar-label">{{ useLocalizeText("effects")
                  }}</span>
                  <button class="ff7-button" @click="playEffects(true)">
                    <img v-if="appStore.soundEffects==true" class="img-selector" src="/images/FF7Cursor.png" />
                    {{ useLocalizeText('yes') }}
                  </button>
                  <button class="ff7-button" :optionText="useLocalizeText('no')" @click="playEffects(false)">
                    <img v-if="appStore.soundEffects==false" class="img-selector" src="/images/FF7Cursor.png" />
                    {{ useLocalizeText('no') }}
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td style="text-align: left">
                <div style="display: flex; align-items: center;">
                  <span class="bottom-bar-label">{{ useLocalizeText("language") + " :"
                  }}</span>
                  <button class="ff7-button" @click="changeLocale('en')">
                    <img v-if="appStore.locale=='en'" class="img-selector" src="/images/FF7Cursor.png" />
                    {{ useLocalizeText('en') }}
                  </button>
                  <button class="ff7-button" @click="changeLocale('es')">
                    <img v-if="appStore.locale=='es'" class="img-selector" src="/images/FF7Cursor.png" />
                    {{ useLocalizeText('es') }}
                  </button>
                </div>
              </td>
            </tr>         
          </table>
        </div>
      </div>
      <div class="final-box final-box-menu-info" :style="{ top: TopMenu + 'px' }">
        <div class="grid-menu-item2" @mouseover="overOption(0)"  @click="selectOption(0)">
          <img v-if="selectedOption === 0" class="img-selector" src="/images/FF7Cursor.png" />
          {{ useLocalizeText('help') }}
        </div>
        <div class="grid-menu-item2" @mouseover="overOption(1)" @click="selectOption(1)">
          <img v-if="selectedOption === 1" class="img-selector" src="/images/FF7Cursor.png" />
          {{ useLocalizeText('about') }}
        </div>
        <div class="grid-menu-item2" @mouseover="overOption(2)" @click="selectOption(2)">
          <img v-if="selectedOption === 2" class="img-selector" src="/images/FF7Cursor.png" />
          {{ useLocalizeText('leave') }}
        </div>
      </div>
      
      <div class="final-box final-box-time-info" :style="{ bottom: (BottomTime) + 'px' }">
        <div class="grid-container">
          <div class="grid-item">{{ useLocalizeText('tmp') }}</div>
          <div class="grid-item">{{ time }}</div>
        </div>
      </div>
      <div class="final-box final-box-place-info" :style="{ bottom: (BottomPlace) + 'px' }">
        <p class="info-text-place">{{ useLocalizeText('settings') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
import customButton from '../components/customButton.vue'
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
const appStore = useAppStore();
const message = ref('');
const isOpen = ref(false);
const time = ref('');
const TopChars = ref(-600);
const TopMenu = ref(-500);
const BottomTime = ref(-75);
const BottomPlace = ref(-200);
let moveElementInterval; // Animation interval
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();
const selectedOption = ref(-1);

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("Settings");
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
  const finalBottomTime = 95;
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
  }
};

/**
 * Key down controll
 * @param {*} event 
 */
const handleMenuKeyDown = async (event) => {
  appStore.playMenu();
  appStore.navHome();
};

/**
 * Function to update volume
 * */
const updateVolume = (event) => {
  appStore.musicVolume = parseFloat(event.target.value);
};

/**
 * Function to update play effects or no
 * */
const playEffects = (parameter) => {
  appStore.playSelect();
  appStore.soundEffects = parameter;
}


/**
 * Function to change language
 * */
const changeLocale = (newLocale) => {
  appStore.playSelect();
  appStore.locale = newLocale;
  locale.value = newLocale;
}

/**
 * Function to execute menu option
 * */
const selectOption = (option) => {
  selectedOption.value = option;
  switch (option) {
    case 0:
      appStore.navHelp();
      break;
    case 1:
      appStore.navAbout();
      break;
    case 2:
      appStore.navHome();
      break;
    default:
      break;
  }
};

/**
 * Function to show image over menu option
 * */
 const overOption = (option) => {
  selectedOption.value = option;
};


</script>

<style scoped>
@import '../../public/styles/menu.css'
</style>
