<template>
  <div>
    <div class="background" ref="Background">
      <customButton :buttonText="useLocalizeText('play')" :onClick="appStore.navHistory">
      </customButton>
      <customButton :buttonText="useLocalizeText('settings')" style="margin-left:132px" :onClick="appStore.navSettings">
      </customButton>

      <customButton id="btnAdd" :buttonText="useLocalizeText('add_start_page')" 
      v-if="showBtnAdd"
      :onClick="installApp"
      style="margin-left:302px">
      </customButton>

      <img src="/images/main.jpg">
      <div class="home-logo">
        <img src="/images/logo.png" width="400" height="130">
      </div>
      <span class="version"> {{ "Demo Ver. 0.89" }} </span>
    </div>
  </div>
</template>

<script setup>
//Import and vars
import { onBeforeMount, onMounted,ref } from 'vue'
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
import customButton from '../components/customButton.vue'
const appStore = useAppStore();
let deferredPrompt;
const showBtnAdd = ref(false);

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("Home");
});

/**
 * Event show button install
 * */
onMounted(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showBtnAdd.value = true;
  });

});


/**
 * Install app
 * */
const installApp = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Ok install');
      } else {
        console.log('Ko install');
      }
      deferredPrompt = null;
    });
  }
}

</script>

<style scoped>
@import '../../public/styles/home.css'
</style>
