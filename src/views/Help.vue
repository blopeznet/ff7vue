<template>
    <div class="background" ref="Background">
        <img src="/images/menu.jpg" style="opacity: 0.7;">
        <div class="about-page">
            <p>{{ useLocalizeText('content_help.introduction')}}</p>
            <p>{{ useLocalizeText('content_help.mouse')}}</p>
            <p>{{ useLocalizeText('content_help.keyboard')}}</p>
            <p>{{ useLocalizeText('content_help.pad')}}</p>
            <p></p>
            <a @click="navRoot" style="font-size: 28px;">{{ useLocalizeText('reset') }}</a>
        </div>
        <img class="bubble" src="/images/bubble.png">
        <img class="title_img" src="/images/text_back_1.png">
        <span class="title_txt_shadow">{{ useLocalizeText('content_help.title')}}</span>
        <span class="title_txt">{{ useLocalizeText('content_help.title')}}</span>
    </div>
</template>
  
<script setup>

import { onBeforeMount} from 'vue';
import { useLocalizeText } from '../composables/localization'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
const appStore = useAppStore();
const router = useRouter();

/**
 * Set current page
 */
 onBeforeMount(() => {
  appStore.setPageName("Home");
});

/**
 * Navigate to root
 */
 const navRoot = () => {
  router.push({ path: "/" });
};

</script>

  
<style>
.about-page {
    position: fixed;
    left: 0;
    z-index: 1;
    width: 500px;
    height: 600px;
    top: 200px;
    left: 50%;
    margin-top: 130px;
    margin-left: 20px;
    transform: translate(-50%, -50%);
    font-size: 23px;
}

.bubble {
    position: fixed;
    left: 100px;
    top: 100px;
    transform: translate(-50%, -50%);
    z-index: 2;

}

.bubble {
    position: fixed;
    left: 100px;
    top: 100px;
    transform: translate(-50%, -50%);
    z-index: 2;

}

.title_txt {
    position: fixed;
    left: 100px;
    top: 100px;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-size: 28px;
    font-family: 'ITC Stone Sans Std', sans-serif;
}

.title_txt_shadow {
    position: fixed;
    left: 98px;
    top: 101px;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-family: 'ITC Stone Sans Std', sans-serif;
    font-weight: bold;    
    font-size: 28px;
    color:black;

    /* Ensure bold weight is applied */
}

.title_img {
    position: fixed;
    left: 100px;
    top: 100px;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-family: 'ITC Stone Sans Std', sans-serif;
    font-weight: bold;


    /* Ensure bold weight is applied */
}

a{
    text-decoration: underline;
}
</style>
  