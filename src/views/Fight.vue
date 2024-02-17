<template>
  <div>
    <div class="dialog-box custom-cursor" :class="{ 'open': isOpen }">
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="background" ref="Background">
      <img :src="backImage">
      <!--Summon-->
      <img ref="summon" id="summon" src="/images/bahamut.png" class="summon">
      <img ref="explosion" id="explosion" src="/images/explosion.gif" class="explosion">
      <!--Summon end-->
      <!--Arrow char selection-->
      <img class="arrow" ref="arrow" id="arrow" src="/images/arrow.gif">
      <!--Arrow char selection END-->
      <!--Top hero-->
      <div class="top-hero" ref="top-hero" id="top-hero"
        :style="{ opacity: heroes[0].isDead ? '0.3' : '1', filter: heroes[0].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_sephi.gif" width="110" height="120">
      </div>
      <!--Top hero END-->
      <!--Middle hero-->
      <div class="middle-hero" ref="middle-hero" id="middle-hero"
        :style="{ opacity: heroes[1].isDead ? '0.3' : '1', filter: heroes[1].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_cloud.gif" width="140" height="100">
      </div>
      <!--Middle hero END-->
      <!--Bottom hero-->
      <div class="bottom-hero" ref="bottom-hero" id="bottom-hero"
        :style="{ opacity: heroes[2].isDead ? '0.3' : '1', filter: heroes[2].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_aeris.gif" width="110" height="100">
      </div>
      <!--Bottom hero END-->
      <!--Magic ring-->
      <div class="hero-magic" ref="hero-magic" id="hero-magic">
        <img src="/images/magic.gif">
      </div>
      <!--Magic ring END-->
      <!--Top enemy-->
      <div class="top-enemy" ref="top-enemy" id="top-enemy"
        :style="{ opacity: enemies[0].isDead ? '0.3' : '1', filter: enemies[0].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_enemy.gif" width="140" height="140">
      </div>
      <!--Top enemy END-->
      <!--Middle enemy-->
      <div class="middle-enemy" ref="middle-enemy" id="middle-enemy"
        :style="{ opacity: enemies[1].isDead ? '0.3' : '1', filter: enemies[1].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_enemy.gif" width="140" height="140">
      </div>
      <!--Middle enemy END-->
      <!--Bottom enemy-->
      <div class="bottom-enemy" ref="bottom-enemy" id="bottom-enemy"
        :style="{ opacity: enemies[2].isDead ? '0.3' : '1', filter: enemies[2].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_enemy.gif" width="140" height="140">
      </div>
      <!--Bottom enemy END-->
      <div class="damage" ref="damage" id="damage" :style="{ opacity: lastDamage == 0 ? '0' : '1' }">
        <span style="font-size: 24px;">{{ lastDamage }}</span>
      </div>
      <div class="debug" ref="debug" id="debug">
        <span style="font-size: 24px;">{{ enemies[0].fileName + ": " + enemies[0].pg + "/" + enemies[0].pgMax + " : "+enemies[0].damage }}</span>
        <span style="font-size: 24px;">{{ enemies[1].fileName + ": " + enemies[1].pg + "/" + enemies[1].pgMax + " : "+enemies[1].damage}}</span>
        <span style="font-size: 24px;">{{ enemies[2].fileName + ": " + enemies[2].pg + "/" + enemies[2].pgMax + " : "+enemies[2].damage}}</span>
      </div>
      <!--Attacks-->
      <div class="enemy-magic-receive" ref="enemy-magic-receive" id="enemy-magic-receive" style="visibility: collapse;">
        <img ref="magic" id="magic" width="140" height="140">
      </div>
      <div class="attack" ref="attack" id="attack">
        <img src="/images/attack.gif" width="140" height="140">
      </div>
      <div class="attack-enemy" ref="attack-enemy" id="attack-enemy">
        <img src="/images/attack.gif" width="140" height="140">
      </div>
      <!--Attacks END-->
      <!--menus-->
      <div class="final-box final-box-chars-info">
        <table class="custom-table">
          <th><span class="header">NAME</span></th>
          <tr v-for="(hero, index) in heroes" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <span v-if="hero.isAvaliable && !hero.hasAttacked && !hero.isDead" @click="changeSelectedChar(hero)"
                      :class="{ 'animated-text': hero.fileName === selectedCharacter.fileName && !hero.isDead, 'dead-character': hero.isDead }"
                      :style="{ cursor: hero.isAvaliable && !hero.isDead ? 'pointer' : 'default', color: hero.isDead ? 'red' : 'white' }">
                      {{ useLocalizeText(hero.name) }}
                    </span>
                    <span v-if="hero.isAvaliable && hero.hasAttacked && !hero.isDead"
                      :style="{ cursor: hero.isAvaliable && !hero.isDead ? 'pointer' : 'default', color: hero.isDead ? 'red' : 'gray' }">
                      {{ useLocalizeText(hero.name) }}
                    </span>
                    <span v-if="hero.isAvaliable && hero.isDead"
                      :style="{ cursor: hero.isAvaliable && !hero.isDead ? 'pointer' : 'default', color: hero.isDead ? 'red' : 'gray' }">
                      {{ useLocalizeText(hero.name) }}
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
          <tr v-for="(hero, index) in heroes" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <div v-if="hero.isAvaliable"
                        :style="{ display: 'flex', justifyContent: 'space-between', color: hero.isDead ? 'red' : 'initial' }">
                        <!-- Column PG -->
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;width:200px;">
                          <span style="margin-bottom: -6px;">{{ hero.pg }}/{{ hero.pgMax }}</span>
                          <progress :max="hero.pgMax" :value="hero.pg" :class="'pg'"></progress>
                        </div>
                        <!-- Column PM -->
                        <div style="flex: 1;margin-left: 48px;">
                          <div style="display: flex; flex-direction: column; align-items: center;width:100px;">
                            <span style="margin-bottom: -6px;">{{ hero.pm }}/{{ hero.pmMax }}</span>
                            <progress :max="hero.pmMax" :value="hero.pm" :class="'pm'"></progress>
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
        <table class="custom-table" style="margin-left: 24px;">
          <div style="display: flex; justify-content: space-between;">
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;width:200px;">
              <span class="header" style="margin-bottom: -6px;"></span>
            </div>
            <div style="flex: 1;margin-left: 48px;">
              <div style="display: flex; flex-direction: column; align-items: center;width:100px;">
                <span class="header" style="margin-bottom: -6px;"></span>
              </div>
            </div>
          </div>
        </table>
      </div>
      <div ref="menuBasic" class="final-box final-box-menuone-info" v-if="showMenuBasic && !selectedCharacter.isEnemy">
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
                      <span v-if="action.fileName === selectedAction.fileName">{{ " > " }}</span>
                    </td>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div ref="menuMagic" :style="calculateStyleMagics()" v-if="showMenuMagic">
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
                      <span v-if="magic.fileName === selectedMagic.fileName">{{ " > " }}</span>
                    </td>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div ref="menuTargets" :style="calculateStyleTargets(sourceMenu)" v-if="showMenuTargets">
        <table class="custom-table" v-if="!selectedCharacter.isEnemy">
          <tr v-for="(enemy, index) in enemies" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <span @click="damageExecute(enemy)"
                        :style="{ cursor: !enemy.isDead ? 'pointer' : 'default', color: (!enemy.isDead) ? 'white' : 'gray' }">
                        {{ useLocalizeText(enemy.name) }}
                      </span>
                    </td>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
        <table class="custom-table" v-if="selectedCharacter.isEnemy">
          <tr v-for="(hero, index) in heroes" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <span @click="damageExecute(hero)"
                        :style="{ cursor: !hero.isDead ? 'pointer' : 'default', color: (!hero.isDead) ? 'white' : 'gray' }">
                        {{ useLocalizeText(hero.name) }}
                      </span>
                    </td>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <!--End menus-->
      <div @click="navMap" class="final-box-aux">
        <p class="info-text">{{ useLocalizeText('map').toUpperCase() }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  getRandomBackgroundImage,
  updateArrowPosition,
  showAttack,
  showMagicAttack,
  showSummon,
  updateLastDamagePosition,
  calculateStyleTargets,
  calculateStyleMagics,
  hideArrow
} from './uxFightHelper'

import { ref, onBeforeMount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
import { useFightStore } from '../stores/fight'

const fightStore = useFightStore();
const appStore = useAppStore();
const router = useRouter();

const backImage = ref(getRandomBackgroundImage()); // Imagen de fondo aleatoria
const message = ref(''); // Para el mensaje del diálogo general
const isOpen = ref(false); // Para abrir el diálogo general
const sourceMenu = ref(''); // Para saber desde dónde se abre el menú de objetivos

const selectedCharacter = ref({}); // Personaje seleccionado
const targetCharacter = ref({}); // Personaje objetivo de ataque
const heroes = ref([]); // Héroes
const enemies = ref([]); // Enemigos

const lastDamage = ref(0); // Último ataque recibido
const selectedActions = ref([]); // Acciones seleccionadas
const selectedAction = ref({}); // Acción seleccionada
const selectedMagic = ref({}); // Magia seleccionada dentro de Acción magia

const showMenuBasic = ref(false); // Mostrar menú de ataques
const showMenuMagic = ref(false); // Mostrar menú de magias
const showMenuTargets = ref(false); // Mostrar menú de enemigos

const alliesAttackedCount = ref(0); // Héroes que han atacado por turno
const enemiesAttackedCount = ref(0); // Enemigos que han atacado por turno
const turnCount = ref(1); // Número de turno

/**
 * Set current page
 */
onBeforeMount(() => {
  appStore.setPageName("Fight");
  goTurn();
});

/** Begin combat **/
onMounted(() => {
});

/**
 * Set current hero, heroes, and enemies
 */
const goTurn = async () => {
  heroes.value = fightStore.characters.filter(character => !character.isDead && !character.isEnemy && !character.hasAttacked);
  enemies.value = fightStore.characters.filter(character => !character.isDead && character.isEnemy && !character.hasAttacked);
  turnCount.value = 0;
  await changeSelectedChar(getRandomAvailableHeroAlive());
  console.info("characters",fightStore.characters);
  console.info("heroes",heroes.value);
  console.info("enemies",enemies.value);
}

/**
 * Change selected character
 * @param {*} newChar 
 */
const changeSelectedChar = async (newChar) => {
  hideAllMenus();
  selectedCharacter.value = newChar;
  selectedActions.value = selectedCharacter.value.actions;
  selectedAction.value = {}; // Reset selected action
  if (!selectedCharacter.value.isEnemy) {
    updateArrowPosition(selectedCharacter);
    showMenuBasic.value = true;
  }
};

/**
 * Execute action / menus
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
      sourceMenu.value = "menuBasic";
      selectedAction.value = action;
      showMenuTargets.value = true;
      showMenuMagic.value = false;
      selectedMagic.value = {};
      break;
    case 'magic':
      sourceMenu.value = "menuMagic";
      selectedAction.value = action;
      showMenuTargets.value = false;
      showMenuMagic.value = true;
      selectedMagic.value = {};
      break;
    case 'summon':
      selectedMagic.value = {};
      showMenuMagic.value = false;
      showMenuTargets.value = false;
      selectedAction.value = action;
      await summonExecute();
      break;
  }
};

/**
 * Execute damage
 * @param {*} enemy obj 
 */
const damageExecute = async (enemy) => {
  hideAllMenus();
  switch (selectedAction.value.fileName) {
    case 'attack':
      markSelectedCharacterAsAttacked();
      targetCharacter.value = enemy;
      if (showAttack(selectedCharacter, targetCharacter)) {
        if (await ApplyDamage()) {
          await executeEnemyResponse();
        }
      }
      break;
    case 'magic':
      markSelectedCharacterAsAttacked();
      targetCharacter.value = enemy;
      if (showMagicAttack(selectedCharacter, targetCharacter, selectedMagic)) {
        if (await ApplyDamage()) {
          await executeEnemyResponse();
        }
      }
      break;
  }
};

/**
 * Execute magic
 * @param {*} magic 
 */
const magicExecute = async (magic) => {
  showMenuTargets.value = true;
  selectedMagic.value = magic;
};

/**
 * Execute summon
 */
const summonExecute = async () => {
  hideAllMenus();
  if (selectedCharacter.value) {
    if (await showSummon(selectedCharacter)) {
      if (await ApplyDamage()) {
        markSelectedCharacterAsAttacked();
        setTimeout(async () => {
          await executeEnemyResponse();
        }, 6500);
      }
    }
  }
};


/**
 * Apply damage
 */
const ApplyDamage = async () => {

  let minDamage, maxDamage, pmPrice;
  var isSummon = false;

  if (selectedAction.value.fileName === "magic") {
    ({ minDamage, maxDamage, pmPrice } = selectedMagic.value);
  } else if (selectedAction.value.fileName === "attack") {
    ({ minDamage, maxDamage, pmPrice } = selectedAction.value);
  } else if (selectedAction.value.fileName === "summon") {
    isSummon = true;
    ({ minDamage, maxDamage, pmPrice } = selectedAction.value);
  }

  if (!isSummon) {
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    updateLastDamagePosition(targetCharacter);
    lastDamage.value = damage;
    targetCharacter.value.damage = damage;


    targetCharacter.value.pg -= damage;
    if (targetCharacter.value.pg < 0) {
      targetCharacter.value.pg = 0;
    }

    if (pmPrice > 0) {
      selectedCharacter.value.pm -= pmPrice;
      if (selectedCharacter.value.pm < 0) {
        selectedCharacter.value.pm = 0;
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    lastDamage.value = 0;

    if (targetCharacter.value.pg == 0) {
      targetCharacter.value.isDead = true;
      await checkContinue();
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

  } else {

    await new Promise(resolve => setTimeout(resolve, 6000));


    const enemiesToDamage = enemies.value.filter(e => !e.isDead);
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    for (const enemy of enemiesToDamage) {
      enemy.damage = damage;
      enemy.pg -= damage;
      if (enemy.pg < 0) {
        enemy.pg = 0;
      }
    }


    for (const enemy of enemiesToDamage) {
      if (enemy.pg == 0) {
        enemy.isDead = true;
      }
    }

    await checkContinue();
    await new Promise(resolve => setTimeout(resolve, 3000));

  }
  return true;
};

/**
 * Check Continue or ends fight
 */
const checkContinue = async () => {
  const aliveAllies = countAliveAllies();
  const aliveEnemies = countAliveEnemies();
  let msg = "";

  if (aliveEnemies > 0) {
    if (aliveAllies == 0) {
      msg = "ko_fight";
      fightStore.lastCombatStatus = 0;
    } else {
      return true;
    }
  } else {
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
 * Count the number of alive allies
 */
const countAliveAllies = () => {
  return heroes.value.filter(h => !h.isDead).length;
};

/**
 * Count the number of alive enemies
 */
const countAliveEnemies = () => {
  return enemies.value.filter(e => !e.isDead).length;
};


/**
 * Mark selected character has attacked and counters
 * @param {*} characterName 
 */
const markSelectedCharacterAsAttacked = () => {
  if (selectedCharacter.value) {
    if (!selectedCharacter.value.isEnemy) {
      const hero = heroes.value.find(char => char.fileName === selectedCharacter.value.fileName);
      if (hero) {
        hero.hasAttacked = true;
      }
    } else {
      const enemy = enemies.value.find(char => char.fileName === selectedCharacter.value.fileName);
      if (enemy) {
        enemy.hasAttacked = true;
      }
    }
    alliesAttackedCount.value = heroes.value.filter(h => h.hasAttacked).length;
    enemiesAttackedCount.value = enemies.value.filter(e => e.hasAttacked).length;
  }
};

/**
 * Verify if all characters (heroes and enemies) have attacked
 */
const allCharactersAttacked = () => {
  const allHeroesAttacked = heroes.value
    .filter(hero => !hero.isDead)
    .every(hero => hero.hasAttacked);

  const allEnemiesAttacked = enemies.value
    .filter(enemy => !enemy.isDead)
    .every(enemy => enemy.hasAttacked);

  return allHeroesAttacked && allEnemiesAttacked;
};

/**
 * Reset has attacked heroes and enemies
 */
const resetCharactersAttacked = async () => {
  heroes.value.forEach(hero => {
    if (!hero.isDead) {
      hero.hasAttacked = false; // Corrección aquí
    }
  });
  enemies.value.forEach(e => {
    if (!e.isDead) {
      e.hasAttacked = false; // Corrección aquí
    }
  });
};

/**
 * Execute enemy reponse after allied attack
 */
const executeEnemyResponse = async () => {
  if (!selectedCharacter.value.isEnemy) {
    if (alliesAttackedCount.value > enemiesAttackedCount.value) {
      hideArrow();
      const e = getRandomAvailableEnemyAlive();
      changeSelectedChar(e);
      selectedAction.value = selectedActions.value[0];
      targetCharacter.value = getRandomAvailableHeroAliveForTarget();
      markSelectedCharacterAsAttacked();
      if (showAttack(selectedCharacter, targetCharacter)) {
        if (await ApplyDamage()) {
          if (allCharactersAttacked()) {
            await resetCharactersAttacked();
          }
          const h = getRandomAvailableHeroAlive();
          if (h) { // Verificar que hay un héroe disponible antes de cambiar el personaje seleccionado
            await changeSelectedChar(h);
          } else {
            await checkContinue();
            await resetTurn();
          }
        }
      }
    }
  }
};

const resetTurn = async () => {
  // Reiniciar contadores de personajes que han atacado
  alliesAttackedCount.value = 0;
  enemiesAttackedCount.value = 0;

  // Reiniciar el contador de turno
  turnCount.value += 1;

  await resetCharactersAttacked();

  // Cambiar al primer personaje disponible para actuar
  const firstAvailableHero = getRandomAvailableHeroAlive();
  if (firstAvailableHero) {
    await changeSelectedChar(firstAvailableHero);
  } else {
    // Si no hay héroes disponibles, cambia al primer enemigo disponible
    const firstAvailableEnemy = getRandomAvailableEnemyAlive();
    if (firstAvailableEnemy) {
      await changeSelectedChar(firstAvailableEnemy);
    } else {
      // Si no hay héroes ni enemigos disponibles, el combate ha terminado
      navEndFight();
    }
  }
};

/**
 * Obtener uno de los supervivientes heroes que no hayan atacado
 */
const getRandomAvailableHeroAlive = () => {
  const availableHeroes = heroes.value.filter(h => !h.isDead && !h.hasAttacked);
  if (availableHeroes.length > 0) {
    if (availableHeroes.length === 1) {
      return availableHeroes[0]; // Si solo queda un héroe, devuélvelo
    } else {
      const randomIndex = Math.floor(Math.random() * availableHeroes.length);
      return availableHeroes[randomIndex];
    }
  } else {
    return null;
  }
};

/**
 * Obtener uno de los supervivientes heroes que no hayan atacado
 */
const getRandomAvailableHeroAliveForTarget = () => {
  const availableHeroes = heroes.value.filter(h => !h.isDead);
  if (availableHeroes.length > 0) {
    if (availableHeroes.length === 1) {
      return availableHeroes[0]; // Si solo queda un héroe, devuélvelo
    } else {
      const randomIndex = Math.floor(Math.random() * availableHeroes.length);
      return availableHeroes[randomIndex];
    }
  } else {
    return null;
  }
};


/**
 * Obtener uno de los supervivientes enemigos que no hayan atacado
 */
const getRandomAvailableEnemyAlive = () => {
  const availableEnemies = enemies.value.filter(e => !e.isDead && !e.hasAttacked);
  if (availableEnemies.length > 0) {
    if (availableEnemies.length === 1) {
      return availableEnemies[0]; // Si solo queda un enemigo, devuélvelo
    } else {
      const randomIndex = Math.floor(Math.random() * availableEnemies.length);
      return availableEnemies[randomIndex];
    }
  } else {
    return null;
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

/** BOTTOM MENUS **/

/**
 * Ocultar todos los menús
 */
const hideAllMenus = () => {
  showMenuBasic.value = false;
  showMenuMagic.value = false;
  showMenuTargets.value = false;
}

</script>
<style scoped>@import '../../public/styles/fight.css'</style>
