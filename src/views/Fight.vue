<template>
  <div>
    <div class="dialog-box custom-cursor" :class="{ 'open': isOpen }">
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="background" ref="Background">
      <img ref="bahamut" id="bahamut" src="/images/bahamut.png" class="bahamut" style="visibility: collapse;">
      <img ref="explosion" id="explosion" src="/images/explosion.gif" class="explosion"
        style="visibility: collapse;">
      <img ref="arrow" id="arrow" src="/images/arrow.gif" width="20" height="20"
        :style="{ position: 'absolute', left: arrow.Left + 'px', top: arrow.Top + 'px', zIndex: arrow.zIndex }">
      <div class="sephirot-magic" ref="sephirot-magic" id="sephirot-magic" style="visibility: collapse;">
        <img src="/images/magic.gif" width="110" height="120">
      </div>
      <div class="sephirot" ref="sephirot" id="sephirot"
        :style="{ opacity: characters[0].isDead ? '0.3' : '1', filter: characters[0].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_sephi.gif" width="110" height="120">
      </div>
      <div class="sephirot-damage" ref="sephirot-damage" id="sephirot-damage" v-if="characters[0].damage">
        <span style="font-size: 24px;">{{ characters[0].damage }}</span>
      </div>
      <div class="cloud-magic" ref="cloud-magic" id="cloud-magic" style="visibility: collapse;">
        <img src="/images/magic.gif" width="110" height="120">
      </div>
      <div class="cloud" ref="cloud" id="cloud"
        :style="{ opacity: characters[1].isDead ? '0.3' : '1', filter: characters[1].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_cloud.gif" width="140" height="100">
      </div>
      <div class="cloud-damage" ref="cloud-damage" id="cloud-damage" v-if="characters[1].damage">
        <span style="font-size: 24px;">{{ characters[1].damage }}</span>
      </div>
      <div class="aeris-magic" ref="aeris-magic" id="aeris-magic" style="visibility: collapse;">
        <img src="/images/magic.gif" width="110" height="120">
      </div>
      <div class="aeris" ref="aeris" id="aeris"
        :style="{ opacity: characters[2].isDead ? '0.3' : '1', filter: characters[2].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_aeris.gif" width="110" height="100">
      </div>
      <div class="aeris-damage" ref="aeris-damage" id="aeris-damage" v-if="characters[2].damage">
        <span style="font-size: 24px;">{{ characters[2].damage }}</span>
      </div>
      <div class="enemy" ref="enemy" id="enemy"
        :style="{ opacity: characters[3].isDead ? '0.3' : '1', filter: characters[3].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_enemy.gif" width="140" height="140">
      </div>
      <div class="enemy-damage" ref="enemy-damage" id="enemy-damage" v-if="characters[3].damage">
        <span style="font-size: 24px;">{{ characters[3].damage }}</span>
      </div>
      <div class="enemy-magic-receive" ref="enemy-magic-receive" id="enemy-magic-receive" style="visibility: collapse;">
        <img :src="getImageUrl(magicName,'gif')" width="140" height="140">
      </div>
      <div class="attack" ref="attack" id="attack">
        <img src="/images/attack.gif" width="140" height="140">
      </div>
      <div class="attack-enemy" ref="attack-enemy" id="attack-enemy" :style="{
        position: 'absolute',
        left: target.left + '%',
        top: target.top + '%',
        zIndex: 3
      }">
        <img src="/images/attack.gif" width="140" height="140">
      </div>
      <div class="final-box final-box-chars-info">
        <table class="custom-table">
          <th><span class="header">NAME</span></th>
          <tr v-for="(character, index) in characters" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <span v-if="character.isAvaliable && !character.hasAttacked && !character.isDead"
                      @click="changeSelectedChar(character)"
                      :class="{ 'animated-text': character.name === selectedCharacter.name && !character.isDead, 'dead-character': character.isDead }"
                      :style="{ cursor: character.isAvaliable && !character.isDead ? 'pointer' : 'default', color: character.isDead ? 'red' : 'white' }">
                      {{ useLocalizeText(character.name) }}
                    </span>
                    <span v-if="character.isAvaliable && character.hasAttacked && !character.isDead"                    
                    :style="{ cursor: character.isAvaliable && !character.isDead ? 'pointer' : 'default', color: character.isDead ? 'red' : 'gray' }">
                      {{ useLocalizeText(character.name) }}
                    </span>
                    <span v-if="character.isAvaliable && character.isDead"                    
                    :style="{ cursor: character.isAvaliable && !character.isDead ? 'pointer' : 'default', color: character.isDead ? 'red' : 'gray' }">
                      {{ useLocalizeText(character.name) }}
                    </span>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div class="final-box final-box-stats-info">
        <table class="custom-table" style="margin-left: 24px;">
          <div style="display: flex; justify-content: space-between;">
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;width:200px;">
              <span class="header" style="margin-bottom: -6px;">{{ useLocalizeText('PG') }}</span>
            </div>
            <div style="flex: 1;margin-left: 48px;">
              <div style="display: flex; flex-direction: column; align-items: center;width:100px;">
                <span class="header" style="margin-bottom: -6px;">{{ useLocalizeText('PM') }}</span>
              </div>
            </div>
          </div>
          <tr v-for="(character, index) in characters" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <div v-if="character.isAvaliable" :style="{ display: 'flex', justifyContent: 'space-between', color: character.isDead ? 'red' : 'initial' }">
                        <!-- Column PG -->
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;width:200px;">
                          <span style="margin-bottom: -6px;">{{ character.pg }}/{{ character.pgMax }}</span>
                          <progress :max="character.pgMax" :value="character.pg" :class="'pg'"></progress>
                        </div>
                        <!-- Column PM -->
                        <div style="flex: 1;margin-left: 48px;">
                          <div style="display: flex; flex-direction: column; align-items: center;width:100px;">
                            <span style="margin-bottom: -6px;">{{ character.pm }}/{{ character.pmMax }}</span>
                            <progress :max="character.pmMax" :value="character.pm" :class="'pm'"></progress>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div class="final-box final-box-menuone-info" v-if="showMenus && !selectedCharacter.isEnemy">
        <table class="custom-table">
          <tr v-for="(action, index) in selectedActions" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <span
                        @click="(action.enabled && (action.pmPrice === 0 || (action.pmPrice > 0 && action.pmPrice <= selectedCharacter.pm))) ? actionExecute(action, action.name) : null"
                        :style="{ cursor: action.enabled ? 'pointer' : 'default', color: (action.enabled && (action.pmPrice === 0 || (action.pmPrice > 0 && action.pmPrice <= selectedCharacter.pm))) ? 'white' : 'gray' }">
                        {{ useLocalizeText(action.fileName) }}
                      </span>
                    </td>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div class="final-box final-box-menutwo-info" v-if="showMenuTwo && showMenus">
        <table class="custom-table" v-if="selectedAction">
          <tr v-for="(magic, index) in selectedAction.magics" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <span
                        @click="(magic.enabled && (magic.pmPrice === 0 || (magic.pmPrice > 0 && magic.pmPrice <= selectedCharacter.pm))) ? magicExecute(magic) : null"
                        :style="{ cursor: magic.enabled ? 'pointer' : 'default', color: (magic.enabled && (magic.pmPrice === 0 || (magic.pmPrice > 0 && magic.pmPrice <= selectedCharacter.pm))) ? 'white' : 'gray' }">
                        {{ useLocalizeText(magic.fileName) }}
                      </span>
                    </td>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div @click="navMap" class="final-box-aux">
          <p class="info-text">{{ useLocalizeText('map').toUpperCase() }}</p>
        </div>
      <img :src="getImageUrl(backgroundImage,'jpg')">
    </div>  
  </div>
</template>

<script setup>
//Import and vars
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
import { useFightStore } from '../stores/fight'
const fightStore = useFightStore();
const appStore = useAppStore();
const router = useRouter();
const message = ref('');
const isOpen = ref(false);
const showMenuTwo = ref(false);
const showMenus = ref(true);
const arrow = ref({})
const magicName = ref('');
const characters = ref([]);
const selectedCharacter = ref({});
const targetCharacter = ref({});
const selectedActions = ref([]);
const selectedAction = ref({});
let targets = [{ name: "cloud", top: 52, left: 28, isDead: false, }, { name: "sephirot", top: 42, left: 26, isDead: false }, { name: "aeris", top: 62, left: 16, isDead: false },];
const target = ref({ left: 0, top: 0, isDead: false, });
const backgroundImage = ref('');

/**
 * Set current page
 */
onBeforeMount(async () => {
  appStore.setPageName("Fight");
  backgroundImage.value = `back_${Math.floor(Math.random() * 2) + 1}`;
  characters.value = fightStore.characters;
  changeSelectedChar(characters.value[0]);
  await showDialog();
});

/**
 * Change selected char
 * @param {*} newChar 
 */
const changeSelectedChar = (newChar) => {
  showMenuTwo.value = false;
  selectedCharacter.value = newChar;
  selectedActions.value = selectedCharacter.value.actions;
  selectedAction.value = null; // Reset selected action
  updateArrow();
  chooseTargetCharacter();
};

/**
 * Update arrow above char when select coords
 */
const updateArrow = () => {
  switch (selectedCharacter.value.name) {
    case "sephirot":
      arrow.value = { Left: 210, Top: 160, zIndex: 4 };
      break;
    case "cloud":
      arrow.value = { Left: 170, Top: 230, zIndex: 10 };
      break;
    case "aeris":
      arrow.value = { Left: 100, Top: 300, zIndex: 10 };
      break;
    case "enemy":
      arrow.value = { Left: 540, Top: 180, zIndex: 10 };
      break;
  }
};

/**
 * Execute action
 * @param {*} action action obj 
 */
const actionExecute = async (action) => {
  if (!selectedCharacter.value) {
    console.error('No character selected');
    return;
  }
  const actionName = action.fileName;
  switch (actionName) {
    case 'attack':
      selectedAction.value = action;
      showMenuTwo.value = false;
      if (!selectedCharacter.value.isEnemy) {
        hideAndShowAttack(selectedCharacter.value.name);
      } else {
        hideAndShowEnemyAttack();
      }
      await ApplyDamage();
      markCharacterAsAttacked(selectedCharacter.value.name); // Actualiza el registro de personajes que han atacado      
      executeEnemyAttack();
      changeToNextCharacter();
      break;
    case 'magic':
      selectedAction.value = action;
      showMenuTwo.value = true;
      break;
    case 'summon':
      selectedAction.value = action;
      showMenuTwo.value = false;
      summonExecute();
      break;
    default:
      showMenuTwo.value = false;
      console.error('Action not recognized:', actionName);
      break;
  }
};

/**
 * Execute magic
 * @param {*} magic 
 */
const magicExecute = (magic) => {
  showMenuTwo.value = false;
  if (selectedCharacter.value) {
    selectedAction.value = magic;
    ApplyDamage();
    hideAndShowMagicLoading();
    magicName.value = magic.fileName;
    hideAndShowMagicAttack();
    markCharacterAsAttacked(selectedCharacter.value.name); // Actualiza el registro de personajes que han atacado      
    executeEnemyAttack();
    changeToNextCharacter();

  } else {
    console.error('Element not found:', name);
  }
};

/**
 * Execute summon
 */
const summonExecute = () => {
  showMenuTwo.value = false;
  if (selectedCharacter.value) {
    appStore.playSummon();
    hideAndShowCharsForSummon();
    hideAndShowMagicLoading();
    hideAndShowBahamutForSummon();
  }
};

/**
 * Hide and show arrow animation
 */
const hideAndShowArrow = () => {
  const elementArrow = document.querySelector('#arrow');
  if (elementArrow) {
    elementArrow.classList.add('animate-hide');
    setTimeout(() => {
      elementArrow.classList.remove('animate-hide');
    }, 1000);
  } else {
    console.error('Elemento no encontrado:', name);
  }
}

/**
 * Hide and show attack animation
 */
const hideAndShowAttack = (name) => {
  showMenuTwo.value = false;
  showMenus.value = false;
  hideAndShowArrow();
  const elementAttack = document.querySelector('#attack');
  if (elementAttack) {
    elementAttack.classList.add('animate-show');
    setTimeout(() => {
      elementAttack.classList.remove('animate-show');
    }, 1000);
  } else {
    console.error('Elemento no encontrado:', name);
  }
  appStore.playAttack();
  const element = document.querySelector('#' + name);
  if (element) {
    element.classList.add('animate-attack');
    setTimeout(() => {
      element.classList.remove('animate-attack');
      showMenus.value = true;
    }, 1000);
  } else {
    console.error('Elemento no encontrado:', name);
  }

}

/**
 * Hide and show magic ring loading animation
 */
const hideAndShowMagicLoading = () => {
  showMenus.value = false;
  const name = "#" + selectedCharacter.value.name.toLowerCase() + "-magic";
  hideAndShowArrow();
  const elementMagic = document.querySelector(name);
  if (elementMagic) {
    // Hacer visible el elemento antes de la animación
    elementMagic.style.visibility = 'visible';

    // Agregar clase para animar la visibilidad del elemento
    elementMagic.classList.add('animate-show');
    setTimeout(() => {
      elementMagic.classList.remove('animate-show');

      // Después de la animación, ocultar el elemento nuevamente
      elementMagic.style.visibility = 'hidden';
    }, 1000);
  }
}

/**
 * Hide and show magic attack animation
 */
const hideAndShowMagicAttack = () => {
  const name = "#enemy-magic-receive";
  const elementMagic = document.querySelector(name);

  switch (selectedAction.value.fileName) {
  case "fire":
    appStore.playFire();
    break;
  case "ice":
    appStore.playIce();
    break;
  case "thunder":
    appStore.playThunder();
    break;
  case "aqua":
    appStore.playAqua();
    break;
  default:
    console.error("Invalid audio name:", name);
}

  if (elementMagic) {
    // Hacer visible el elemento antes de la animación
    elementMagic.style.visibility = 'visible';

    // Agregar clase para animar la visibilidad del elemento
    elementMagic.classList.add('animate-show');
    setTimeout(() => {
      elementMagic.classList.remove('animate-show');

      // Después de la animación, ocultar el elemento nuevamente
      elementMagic.style.visibility = 'hidden';
      showMenus.value = true;
    }, 1000);
  }
}

/**
 * Hide and show characters during summon animation
 */
const hideAndShowCharsForSummon = () => {
  const elementCloud = document.querySelector('#cloud');
  if (elementCloud) {
    elementCloud.classList.add('animate-hide');
    setTimeout(() => {
      elementCloud.classList.remove('animate-hide');
    }, 8000);
  } else {
    console.error('Elemento no encontrado:', name);
  }
  const elementAeris = document.querySelector('#aeris');
  if (elementAeris) {
    elementAeris.classList.add('animate-hide');
    setTimeout(() => {
      elementAeris.classList.remove('animate-hide');
    }, 8000);
  } else {
    console.error('Elemento no encontrado:', name);
  }
}

/**
 * Hide and show Bahamut summon animation
 */
const hideAndShowBahamutForSummon = () => {
  showMenus.value = false;
  const element = document.querySelector('.bahamut'); // Cambiado para seleccionar por clase
  const elementExplosion = document.querySelector('.explosion'); // Cambiado para seleccionar por clase
  if (element) {
    // Hacer visible el elemento Bahamut
    element.style.visibility = 'visible';
    element.classList.add('animate-move-bottom', 'animate'); // Agregar clases para animar movimiento hacia abajo

    // Después de 3 segundos, detener la animación de movimiento hacia abajo
    setTimeout(() => {
      element.classList.remove('animate-move-bottom');

      // Agregar clase para animar movimiento hacia arriba
      element.classList.add('animate-move-top', 'animate');

      // Después de 3 segundos, detener la animación de movimiento hacia arriba
      setTimeout(() => {
        element.classList.remove('animate-move-top');

        // Después de que termine la animación de Bahamut, ocultarlo
        setTimeout(() => {
          element.style.visibility = 'hidden';
        }, 1000); // Espera 2 segundos para ocultar Bahamut

      }, 3000); // Espera 3 segundos para movimiento hacia arriba de Bahamut

    }, 3000); // Espera 3 segundos para movimiento hacia abajo de Bahamut

    // Después de 3 segundos, mostrar la explosión
    setTimeout(() => {
      if (elementExplosion) {
        // Hacer visible el elemento explosión antes de la animación
        elementExplosion.style.visibility = 'visible';

        // Agregar clase para animar la visibilidad del elemento explosión
        elementExplosion.classList.add('animate-show');

        // Después de 1 segundo, quitar la clase de animación de la explosión
        setTimeout(() => {
          elementExplosion.classList.remove('animate-show');

          // Después de la animación, ocultar la explosión
          setTimeout(() => {
            elementExplosion.style.visibility = 'hidden';
            ApplyDamage();
            markCharacterAsAttacked(selectedCharacter.value.name); // Actualiza el registro de personajes que han atacado      
            executeEnemyAttack();
            changeToNextCharacter();
            showMenus.value = true;
          }, 1000); // Espera 1 segundo para ocultar la explosión
        }, 1000); // Espera 1 segundo para quitar la clase de animación de la explosión
      }
    }, 3000); // Espera 3 segundos para mostrar la explosión
  } else {
    console.error('Elemento no encontrado:', '.bahamut');
  }
}

/**
 * Hide and show Enemys attack animation
 */
const hideAndShowEnemyAttack = () => {
  showMenuTwo.value = false;
  hideAndShowArrow();
  const elementAttack = document.querySelector('#attack-enemy');
  if (elementAttack) {
    elementAttack.classList.add('animate-show');
    setTimeout(() => {
      elementAttack.classList.remove('animate-show');
    }, 1000);
  } else {
    console.error('Elemento no encontrado:');
  }
  appStore.playAttack();
  const element = document.querySelector('#enemy');
  if (element) {
    element.classList.add('animate-attack-enemy');
    setTimeout(() => {
      element.classList.remove('animate-attack-enemy');
    }, 1000);
  } else {
    console.error('Elemento no encontrado:', name);
  }

}

/**
 * Choose next attack target
 */
const chooseTargetCharacter = () => {
  if (selectedCharacter.value.isEnemy) {
    // Filtrar personajes que no estén muertos y que no sean enemigos
    const aliveAllies = characters.value.filter(character => !character.isDead && !character.isEnemy);
    const aliveTargets = targets.filter(t => !t.isDead);

    // Obtener la longitud del array de personajes que cumplan con las condiciones dadas
    const countAliveAllies = aliveAllies.length;
    let index = Math.floor(Math.random() * countAliveAllies);

    // Asignar el objetivo y el personaje objetivo basados en el resultado aleatorio
    target.value = aliveTargets[index];
    targetCharacter.value = aliveAllies[index];
  } else {
    // Encontrar el primer personaje enemigo que no esté muerto
    targetCharacter.value = characters.value.find(c => c.isEnemy && !c.isDead);
  }
}

/**
 * Aplica el daño
 */
const ApplyDamage = async () => {

  const { minDamage, maxDamage, pmPrice } = selectedAction.value;

  // Paso 1: Calcular un número aleatorio dentro del rango entre minDamage y maxDamage
  const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

  // Paso 2: Aplicar el daño al toCharacter
  targetCharacter.value.pg -= damage;
  if (targetCharacter.value.pg < 0) {
    targetCharacter.value.pg = 0; // Asegurarse de que los puntos de vida no sean negativos
  }

  // Paso 3: Restar el pmCost del fromCharacter si corresponde
  if (pmPrice > 0) {
    selectedCharacter.value.pm -= pmPrice;
    if (selectedCharacter.value.pm < 0) {
      selectedCharacter.value.pm = 0; // Asegurarse de que los puntos de magia no sean negativos
    }
  }

  targetCharacter.value.damage = damage;
  await new Promise(resolve => setTimeout(resolve, 1000));
  targetCharacter.value.damage = 0;

  // Si la vida baja, marcamos como muertos
  if (targetCharacter.value.pg == 0) {
    targetCharacter.value.isDead = true;

    // Encuentra el índice del personaje en targets
    const index = targets.findIndex(t => t.name === targetCharacter.value.name);

    // Si se encuentra el índice, actualiza el valor isDead en ese índice
    if (index !== -1) {
      targets[index].isDead = true;
    }

    // Llama a las funciones restantes
    await checkContinue();
    chooseTargetCharacter();
  }

};

/**
 * Check Continue or ends fight
 */
const checkContinue = async () => {

  const aliveAllies = characters.value.filter(character => !character.isDead && !character.isEnemy).length;
  const aliveEnemies = characters.value.filter(character => !character.isDead && character.isEnemy).length;
  let msg = "";

  if (aliveEnemies > 0) {
    if (aliveAllies == 0) {
      msg = "ko_fight";
      fightStore.lastCombatStatus = 0;
    } else {
      return true;
    }
  } else {
    appStore.playDead();
    msg = "win_fight";
    fightStore.lastCombatStatus = 1;
  }
  await showDialog(msg);
  navEndFight();
  return false;
};

/**
 * Show dialog with message
 */
const showDialog = async (key = "begin_fight") => {
  await new Promise(resolve => setTimeout(resolve, 500));
  message.value = useLocalizeText(key);
  isOpen.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  isOpen.value = false;
};

/**
 * Navigate to endFight
 */
const navEndFight = () => {
  router.push({ path: "endfight" });
};

/**
 * Mark character has attacked
 * @param {*} characterName 
 */
const markCharacterAsAttacked = (characterName) => {
  const character = characters.value.find(char => char.name === characterName);
  if (character) {
    character.hasAttacked = true;
  }
};

/**
 * Verify all characters not enemy has attacked
 */
const allCharactersAttacked = () => {
  return characters.value
    .filter(character => !character.isEnemy && !character.isDead)
    .every(character => character.hasAttacked);
};

/**
 * Reset has attacked
 */
const resetCharactersAttacked = () => {
  characters.value.forEach(character => {
    if (!character.isEnemy && !character.isDead) {
      character.hasAttacked = false;
    }
  });
};

/**
 * Select next character not attacked
 */
const changeToNextCharacter = () => {
  const index = characters.value.findIndex(character => !character.isDead && !character.isEnemy && !character.hasAttacked && character.isAvaliable);
  if (index !== -1) {
    changeSelectedChar(characters.value[index]);
  }
};

/**
 * Execute enemy attack after all chars
 */
const executeEnemyAttack = async () => {
  if (allCharactersAttacked()) {
    showMenus.value = false;
    await new Promise(resolve => setTimeout(resolve, 1000));
    changeSelectedChar(characters.value[3]);
    await actionExecute(selectedCharacter.value.actions[0], selectedCharacter.value.actions[0].name);
    resetCharactersAttacked();
    await new Promise(resolve => setTimeout(resolve, 1000));
    showMenus.value = true;
  }
};

/**
 * Navigate to map
 */
 const navMap = () => {
  appStore.playSelect();
  appStore.setPageName("Map");
  router.push({ path: "Map" });
};


/**
 * Calculate image
 */
 const getImageUrl = (fileName,extension) => {
  return `/ff7vue/images/${fileName}.${extension}`;
}

</script>
<style scoped>
@import '../../public/styles/fight.css'
</style>
