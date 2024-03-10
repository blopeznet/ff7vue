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
                <div class="tabla" style="max-width:500px">
                    <p>{{ useLocalizeText('content_help.introduction') }}</p>
                    <p>{{ useLocalizeText('content_help.mouse') }}</p>
                    <p>{{ useLocalizeText('content_help.keyboard') }}</p>
                    <p>{{ useLocalizeText('content_help.pad') }}</p>
                </div>
            </div>
            <div class="final-box final-box-menu-info" :style="{ top: TopMenu + 'px' }">
                <div class="grid-menu-item2" @mouseover="overOption(1)" @click="selectOption(1)">
                    <img v-if="selectedOption === 1" class="img-selector" src="/images/FF7Cursor.png" />
                    <a class="href" :href="useLocalizeText('content_about.link')">{{ useLocalizeText('code') }}</a>
                </div>
                <div class="grid-menu-item2" @mouseover="overOption(2)" @click="selectOption(2)">
                    <img v-if="selectedOption === 2" class="img-selector" src="/images/FF7Cursor.png" />
                    <a class="href" href="mailto:borjalgarcia@hotmail.com">{{ useLocalizeText('mail') }}</a>
                </div>
                <div class="grid-menu-item2" @mouseover="overOption(0)" @click="selectOption(0)">
                    <img v-if="selectedOption === 0" class="img-selector" src="/images/FF7Cursor.png" />
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
                <p class="info-text-place">{{ useLocalizeText('help') }}</p>
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
    appStore.setPageName("Help");
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
    appStore.navSettings();
};

/**
 * Function to execute menu option
 * */
const selectOption = (option) => {
    selectedOption.value = option;
    switch (option) {
        case 0:
            appStore.navSettings();
            break;
        case 1:
            break;
        case 2:
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
 
 
<style>
@import '../../public/styles/menu.css'
</style>
  