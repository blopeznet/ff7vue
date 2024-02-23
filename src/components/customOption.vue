<template>
  <div class="custom-option" @click="handleClick" @mouseover="showImage" @mouseout="hideImage">
    <div class="custom-option-content">
      <img v-if="isImageVisible" class="img-selector" src="/images/FF7Cursor.png" />
      <p>{{ optionText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isImageVisible = ref(false);
const isClicked = ref(false);

const handleClick = (parameter) => {  
  showImage();
  isClicked.value = true;
  props.onClick(parameter);
};

const showImage = () => {
  isImageVisible.value = true;
};

const hideImage = () => {
  isImageVisible.value = false;
};

const props = defineProps({
  optionText: String,
  onClick: Function
});
</script>

<style>
.custom-option {
  border-radius: 10px;
  padding-top: 12px;
  opacity: 1;
  min-width: fit-content; /* Ancho ajustado al contenido */
  bottom: 20px;
  left: 20px;
  z-index: 10000;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  align-items: center; /* Centra el contenido verticalmente */
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
}

.custom-option:hover {
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
}

.custom-option-content {
  display: flex;
  align-items: center;
}

.custom-option-content p {
  margin: 0; /* Eliminar el margen alrededor del texto */
  font-size: 24px;
  text-align: center; /* Centra el texto dentro del botón */
}

.img-selector {
  width: 30px;
  height: 20px;
  margin-left: -25px;
  background-size: cover;  
  visibility: visible;
}

</style>
