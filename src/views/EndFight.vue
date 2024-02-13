<template>
  <div>
    <div class="dialog-box custom-cursor" :class="{ 'open': isOpen }">
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="background" ref="Background" @click="navMap">
      <img src="/images/menu.jpg" style="opacity: 0;">
      <div class="final-box final-box-title-info">
        <span>{{ "Gained gil." }}</span>
      </div>
      <div class="final-box final-box-gained-info" @click="navMap">
        <table style="margin-left: 24px;margin-top: 4px;">
          <tr>
            <td>
              {{ "Gained gil" }}
            </td>
            <td>
              {{ `${fightStore.gainedGil}G` }}
            </td>
          </tr>
        </table>
      </div>
      <div class="final-box final-box-gil-info" @click="navMap">
        <table style="margin-left: 24px;margin-top: 4px;">
          <tr>
            <td>
              {{ "Gil" }}
            </td>
            <td>
              {{ `${fightStore.gil}G` }}
            </td>
          </tr>
        </table>
      </div>
      <div class="final-box final-box-items-info" @click="navMap">
        <span>{{ "No items" }}</span>
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


/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("EndFight");
  //If win combat, reset Enemy live, if loose, reset our lives before add gil
  if (fightStore.lastCombatStatus == 0){
    fightStore.resetChars();
  }else if (fightStore.lastCombatStatus == 1){
    fightStore.resetEnemy();
  }
  fightStore.lastCombatStatus = null;
  fightStore.setGainedGil();
});

/**
 * Start animation and clock
 */
onMounted(async () => {
  await showDialog();
  document.addEventListener('keydown', handleMenuKeyDown);
});

/**
 * Show dialog with message
 */
const showDialog = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  message.value = useLocalizeText("no_items_message");
  isOpen.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  isOpen.value = false;
};

/**
 * Remove key listener
 */
onUnmounted(() => {
  document.removeEventListener('keydown', handleMenuKeyDown);
});

/**
 * Navigate to map and reload gil
 */
const navMap = async () => {
  appStore.playGil();
  await fightStore.updateGil(); // Wait gil is udpated
  appStore.playSelect();
  router.push({ path: "Map" }); // Navigate to "Map"

};

/**
 * Key Enter to pass animation
 * @param {*} event 
 */
const handleMenuKeyDown = async (event) => {
  if (event.key === 'Enter' || event.key === 'Escape') {
    appStore.playSelect();
    await navMap();
  }
};

</script>

<style scoped>
@import '../../public/styles/endFight.css'
</style>
