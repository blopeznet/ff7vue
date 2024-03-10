<template>
  <div class="custom-button" @click="handleClick" @mouseover="showImage" @mouseout="hideImage">
    <div class="custom-button-content">
      <img v-if="isImageVisible" class="img-selector" src="/images/FF7Cursor.png" />
      <p>{{ buttonText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isImageVisible = ref(false);
const isClicked = ref(false);

let disableMouseout = false;

const handleClick = () => {
  showImage();
  isClicked.value = true;
  props.onClick();
};

const showImage = () => {
  isImageVisible.value = true;
};

const hideImage = () => {
  isImageVisible.value = false;
};

const props = defineProps({
  buttonText: String,
  onClick: Function
});
</script>

<style>
.custom-button {
  background: var(--custom-radial-gradient--ff7--remake);
  opacity: 0.7;
  border: 2px solid;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  border-radius: 50%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
  position: fixed;
  width:100px;
  height: 100px;
  bottom: 20px;
  left: 20px;
  z-index: 10000;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content:center;
}

.custom-button:hover {
  cursor: pointer;
  /* Cambia el cursor al pasar sobre el botón */
}

.custom-button-content {
  display: flex;
  align-items: center;
  opacity: 1;
}

.custom-button-content p {
  margin: 0;
  /* Eliminar el margen alrededor del texto */
  font-size: 20px;
  text-align: center;
  /* Centra el texto dentro del botón */
}

.img-selector {
  width: 30px;
  height: 20px;
  opacity: 1.0;
  margin-left: -25px;
  background-size: cover;
  visibility: visible;
}

</style>
