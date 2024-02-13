<template>
  <div class="controller-dialog">
    <div class="content">
      <img class="controller-image" src="/images/controller.png"/>
      <div class="button-up" @mousedown="startPress(pressUpStart)" @mouseup="stopPress(pressUpStop)">U</div>
      <div class="button-down" @mousedown="startPress(pressDownStart)" @mouseup="stopPress(pressDownStop)">D</div>
      <div class="button-left" @mousedown="startPress(pressLeftStart)" @mouseup="stopPress(pressLeftStop)">L</div>
      <div class="button-right" @mousedown="startPress(pressRightStart)" @mouseup="stopPress(pressRightStop)">R</div>
      <div class="button-select" @click="pressSelect">SE</div>
      <div class="button-start" @click="pressStart">ST</div>
      <div class="button-circle" @click="pressCircle">O</div>
      <div class="button-triangle" @click="pressTriangle">A</div>
    </div>
  </div>
</template>

<script setup>

import { useAppStore } from '../stores/app'
import { useMapStore } from '../stores/map'
import { useFightStore } from '../stores/fight'
import { useRouter } from 'vue-router';
const router = useRouter();
const appStore = useAppStore();
const mapStore = useMapStore();
const fightStore = useFightStore();

let interval = null;

/**
 * 100 ms for execute init press key up,down,left,right
 * @param {*} callback 
 */
const startPress = (callback) => {
  interval = setInterval(callback, 100); 
};

/**
 * Stop press
 * @param {*} callback 
 */
const stopPress = (callback) => {
  clearInterval(interval);
  callback();
};

/**
 * Press select
 */
const pressSelect = () => {
  appStore.playSelect();
};

/**
 * Press start
 */
const pressStart = () => {
  appStore.playSelect();
  router.push({ path: "/" });
};

/**
 * Begin press up
 */
const pressUpStart = () => {
  if (appStore.pageName == "Map") {
    mapStore.moveUp();
  }
};

/**
 * End press up
 */
const pressUpStop = () => {
  if (appStore.pageName == "Map") {
    mapStore.stopUp();
  }
};

/**
 * Begin press down
 */
const pressDownStart = () => {
  if (appStore.pageName == "Map") {
    mapStore.moveDown();
  }
};

/**
 * End press down
 */
const pressDownStop = () => {
  if (appStore.pageName == "Map") {
    mapStore.stopDown();
  }
};

/**
 * Begin press left
 */
const pressLeftStart = () => {
  if (appStore.pageName == "Map") {
    mapStore.moveLeft();
  }
};

/**
 * End press left
 */
const pressLeftStop = () => {
  if (appStore.pageName == "Map") {
    mapStore.stopLeft();
  }
};

/**
 * Begin press right
 */
const pressRightStart = () => {
  if (appStore.pageName == "Map") {
    mapStore.moveRight();
  }
};

/**
 * End press right
 */
const pressRightStop = () => {
  if (appStore.pageName == "Map") {
    mapStore.stopRight();
  }
};

/**
 * Press circle
 */
const pressCircle = async () => {
  appStore.playSelect();
  switch (appStore.pageName) {
    case "Home":
      router.push({ path: "History" });
      break;
    case "History":
      router.push({ path: "Map" });
      break;
    case "EndFight":
      await fightStore.updateGil(); // Espera a que la actualización de Gil se complete
      router.push({ path: "Map" });
      break;
    case "EndGame": 
      router.push({ path: "/" });
      break;
    case "About":
      router.push({ path: "home" });
      break;    
  }
};

/**
 * Press triangle
 */
const pressTriangle = () => {
  appStore.playMenu();
  switch (appStore.pageName) {
    case "Map":
      router.push({ path: "Menu" });
      break;
    case "Menu":
      router.push({ path: "Map" });
      break;
  }
};

</script>

<style scoped>
@import '../../public/styles/controller.css'
</style>
