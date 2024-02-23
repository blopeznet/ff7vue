<template>
  <div>
    <div class="dialog-box custom-cursor" :class="{ 'open': isOpen }">
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="background" ref="Background" style="cursor: pointer;" @click="handleMapClick">    
      <customButton :buttonText="useLocalizeText('menu')" :onClick="appStore.navMenu" >        
      </customButton>
      <img src="/images/map.jpg">
      <div id="arrow_up"
        style="position:absolute; left:50px; top:45%; transform: translateY(-50%); width:19px; height:18px; z-index:3">
        <img src="/images/arrow_up.gif" width="33" height="34">
      </div>
      <div id="arrow_down"
        style="position:absolute; right:140px; top:10%; transform: translateY(-50%); width:19px; height:18px; z-index:3">
        <img src="/images/arrow_down.gif" width="33" height="34">
      </div>
      <div id="sea" style="position:absolute; right:0px; top:70%;  z-index:3">
        <img src="/images/sea.gif">
      </div>
      <div id="water" style="position:absolute; right:0px; top:6px;  z-index:2">
        <img src="/images/water.gif">
      </div>
      <div id="water_2" style="position:absolute; right:228px; top:0px;  z-index:2">
        <img src="/images/water_2.gif">
      </div>
      <div id="mini_map" style="position:absolute; right:24px; top:75%;  z-index:3">
        <img src="/images/mini_map.gif">
      </div>
      <div id="shadow"
        :style="{ position: 'absolute', left: mapStore.map_Left + 'px', top: (mapStore.map_Top - 4) + 'px', zIndex: mapStore.map_zIndex - 2 }">
        <img src="/images/shadow.gif" width="33" height="47">
      </div>
      <img ref="cloudElement" :src="mapStore.map_src" width="30" height="44"
        :style="{ position: 'absolute', left: mapStore.map_Left + 'px', top: mapStore.map_Top + 'px', zIndex: mapStore.map_zIndex }">     
      <!-- Position element -->
      <div id="position"
        :style="{ position: 'absolute', left: positionLeft + 'px', top: positionTop + 'px', zIndex: 999 }">
        <img src="/images/FF7Cursor.png" width="30" height="70">
      </div>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
import customButton from '../components/customButton.vue'
import { useLocalizeText } from '../composables/localization'
import router from '../router';
import { useAppStore } from '../stores/app'
const appStore = useAppStore();
import { useMapStore } from '../stores/map'
const mapStore = useMapStore();
const cloudElement = ref(null);
const message = ref('');
//Messages out of bounds
var messages = [];
messages.push(useLocalizeText('map_messages.01'));
messages.push(useLocalizeText('map_messages.02'));
messages.push(useLocalizeText('map_messages.03'));
messages.push(useLocalizeText('map_messages.04'));
messages.push(useLocalizeText('map_messages.05'));
const isOpen = ref(false);
let intervalBattle = null; // Intervar var for battle
const mapBackground = ref(null);
const positionLeft = ref(mapStore.map_Left); 
const positionTop = ref(mapStore.map_Top);

/**
 * Handle keyboard press key down
 * @param {*} event 
 */
const handleKeyDown = async (event) => {
  if (event.key === 'Escape') {
    appStore.navMenu();
  }

  if (event.key === 'ArrowDown') {
    mapStore.moveDown();
  }
  if (event.key === 'ArrowRight') {
    mapStore.moveRight();
  }
  if (event.key === 'ArrowUp') {
    mapStore.moveUp();
  }
  if (event.key === 'ArrowLeft') {
    mapStore.moveLeft();
  }
};

/**
 * Handle keyboard press key up
 * @param {*} event 
 */
const handleKeyUp = (event) => {
  if (event.key === 'ArrowDown') {
    mapStore.stopDown();
  }
  if (event.key === 'ArrowRight') {
    mapStore.stopRight();
  }
  if (event.key === 'ArrowUp') {
    mapStore.stopUp();
  }
  if (event.key === 'ArrowLeft') {
    mapStore.stopLeft();
  }
};

/**
 * Set page name
 * */
onBeforeMount(() => {
  appStore.setPageName("Map");
});

/**
 * Add listener keyboard
 */
onMounted(async () => {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  mapBackground.value = document.querySelector('.background');

  // Mutation observer cloud left and top for messages
  const observer = new MutationObserver(async (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && (mutation.attributeName === 'style' && mutation.target.style.top || mutation.target.style.left)) {

        if (mapStore.map_Left >= 600 && mapStore.map_Top <= 120) {
          router.push({ path: "EndGame" });
        }
        if (!mapStore.checkCoords()) {
          return;
        }
      }
    }
  });
  observer.observe(cloudElement.value, { attributes: true, attributeFilter: ['style'] });

  // Función for go to battle
  const makeEnemyAttackInterval = async () => {
    await goToFight();
    const nextTime = mapStore.fightFrecuencyMs;
    intervalBattle = setTimeout(makeEnemyAttackInterval, nextTime);
  };

  // Interval start after first launch
  const firstTime = mapStore.fightFrecuencyMs;
  intervalBattle = setTimeout(makeEnemyAttackInterval, firstTime);

});

/**
 * Remove listeners keyboard
 */
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
  clearInterval(intervalBattle);

});

/**
 * Go to Figth
 */
const goToFight = async () => {
  router.push({ path: "fight" });
};

/**
 * Handle and move cloud with tap/click
 * **/
const handleMapClick = (event) => {
  const absoluteX = event.clientX;
  const absoluteY = event.clientY;
  const appContainer = document.querySelector('#app');
  const containerRect = appContainer.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;
  const backgroundRect = document.querySelector('.background').getBoundingClientRect();
  const backgroundWidth = backgroundRect.width;
  const backgroundHeight = backgroundRect.height;
  const offsetX = (containerWidth - backgroundWidth) / 2;
  const offsetY = (containerHeight - backgroundHeight) / 2;
  const relativeX = absoluteX - containerRect.left - offsetX;
  const relativeY = absoluteY - containerRect.top - offsetY;
  const zoom = parseFloat(appContainer.style.zoom || '100') / 100;
  const adjustedX = relativeX / zoom;
  const adjustedY = relativeY / zoom;
  positionLeft.value = adjustedX;
  positionTop.value = adjustedY;
  document.getElementById('position').style.display = 'visible';
  // Bounds limit
  if (adjustedX >= 0 && adjustedX <= 600 && adjustedY >= 0 && adjustedY <= 400) {
    document.getElementById('position').style.display = 'visible';
    const dx = adjustedX - mapStore.map_Left;
    const dy = adjustedY - mapStore.map_Top;
    let src;
    if (Math.abs(dx) > Math.abs(dy)) {
      src = dx > 0 ? './images/go_right.gif' : './images/go_left.gif';
    } else {
      src = dy > 0 ? './images/go_down.gif' : './images/go_up.gif';
    }
    mapStore.map_src = src;
    const totalSteps = Math.max(Math.abs(dx), Math.abs(dy));
    const moveDistanceX = dx / totalSteps;
    const moveDistanceY = dy / totalSteps;
    let step = 0;
    const moveInterval = setInterval(() => {
      mapStore.map_Left += moveDistanceX;
      mapStore.map_Top += moveDistanceY;
      if (++step >= totalSteps) {
        clearInterval(moveInterval); 
        if (document && document.style){
         document.getElementById('position').style.display = 'visible'; 
        }
        mapStore.map_src = './images/stop_down.gif';
      }
    }, 1000 / 30); // 30 times x second
  }
};

</script>
<style scoped>

#position img {
  display: visible;
  margin-left: auto;
  margin-right: auto;
  height: 20px;
}

</style>

   