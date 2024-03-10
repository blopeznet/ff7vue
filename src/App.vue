<script setup>
//Import and vars
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAppStore } from '../src/stores/app'
import Fight from './views/Fight.vue';
const appStore = useAppStore();
const router = useRouter();
appStore.setRouter(router);
const isOpen = ref(false);
const audioPlayer = ref(null);

onMounted(() => {
  window.addEventListener("resize", handleOrientationChange);
  handleOrientationChange();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleOrientationChange);
});

const handleOrientationChange = () => {
  if (window.innerWidth > window.innerHeight) {
    isOpen.value = false;
  } else {
    isOpen.value = true;
  }
}

const getTransitionName = () => {
  return appStore.pageName === 'Map' ? 'blur-rotate-fight' : 'fade';
};

</script>

<template>
  <div>
    <Suspense>
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition :name="getTransitionName()" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
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

