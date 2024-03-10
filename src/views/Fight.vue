<template>
  <div>
    <div class="background" ref="Background">
      <Transition name="bounce">
        <div class="dialog-box-fight" v-if="isOpenDialog">
          <div class="dialog-content">
            <p>{{ message }}</p>
          </div>
        </div>
      </Transition>
      <img :src="backImage">
      <!--Summon-->
      <img ref="summon" id="summon" src="/images/bahamut.png" class="summon">
      <img ref="explosion" id="explosion" src="/images/explosion.gif" class="explosion">
      <!--Summon end-->
      <!--Arrow char selection-->
      <img class="arrow" ref="arrow" id="arrow" src="/images/arrow.gif">
      <img class="enemyCursor" ref="enemyCursor" id="enemyCursor" src="/images/FF7Cursor.png">
      <!--Arrow char selection END-->
      <!--Top hero-->
      <div class="top-hero" ref="top-hero" id="top-hero" v-if="fightStore.heroes[0]"
        :style="{ opacity: fightStore.heroes[0].isDead ? '0.01' : '1', filter: fightStore.heroes[0].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_sephi.gif" width="110" height="120">
      </div>
      <!--Top hero END-->
      <!--Middle hero-->
      <div class="middle-hero" ref="middle-hero" id="middle-hero"
        :style="{ opacity: fightStore.heroes[1].isDead ? '0.01' : '1', filter: fightStore.heroes[1].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_cloud.gif" width="140" height="100">
      </div>
      <!--Middle hero END-->
      <!--Bottom hero-->
      <div class="bottom-hero" ref="bottom-hero" id="bottom-hero"
        :style="{ opacity: fightStore.heroes[2].isDead ? '0.01' : '1', filter: fightStore.heroes[2].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img src="/images/bat_aeris.gif" width="110" height="100">
      </div>
      <!--Bottom hero END-->
      <!--Magic ring-->
      <div class="hero-magic" ref="hero-magic" id="hero-magic">
        <img src="/images/magic.gif">
      </div>
      <div class="hero-magic-ring-green" ref="hero-magic-ring-green" id="hero-magic-ring-green">
        <img src="/images/green_ring_summon.png">
      </div>
      <div class="hero-magic-ring-red" ref="hero-magic-ring-red" id="hero-magic-ring-red">
        <img src="/images/red_ring_summon.png">
      </div>
      <div class="hero-magic-ring-yellow" ref="hero-magic-ring-yellow" id="hero-magic-ring-yellow">
        <img src="/images/yellow_ring_summon.png">
      </div>
      <!--Magic ring END-->
      <!--Top enemy -->
      <div class="top-enemy" ref="top-enemy" id="top-enemy" v-if="fightStore.enemies[0]"
        :style="{ opacity: fightStore.enemies[0].isDead ? '0.01' : '1', filter: fightStore.enemies[0].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img :src="getImageUrl(fightStore.enemies[0].enemyImage)" width="140" height="140">
      </div>
      <!--Top enemy END-->
      <!--Middle enemy-->
      <div class="middle-enemy" ref="middle-enemy" id="middle-enemy" v-if="fightStore.enemies[1]"
        :style="{ opacity: fightStore.enemies[1].isDead ? '0.01' : '1', filter: fightStore.enemies[1].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img :src="getImageUrl(fightStore.enemies[1].enemyImage)" width="140" height="140">
      </div>
      <!--Middle enemy END-->
      <!--Bottom enemy-->    
      <div class="bottom-enemy" ref="bottom-enemy" id="bottom-enemy" v-if="fightStore.enemies[2]"
        :style="{ opacity: fightStore.enemies[2].isDead ? '0.01' : '1', filter: fightStore.enemies[2].isDead ? 'saturate(100%) brightness(100%) hue-rotate(-410deg) contrast(100%)' : 'none' }">
        <img :src="getImageUrl(fightStore.enemies[2].enemyImage)" width="140" height="140">
      </div>
      <!--Bottom enemy END-->
      <div class="damage" ref="damage" id="damage" :style="{ opacity: lastDamage == 0 ? '0' : '1' }">
        <span style="font-size: 24px;">{{ lastDamage }}</span>
      </div>
      <div class="debug" ref="debug" id="debug" v-if="debug">
        <span v-for="(enemy, index) in fightStore.enemies" :key="index" style="font-size: 24px;">
          {{ enemy.fileName + ": " + enemy.pg + "/" + enemy.pgMax + " : " + enemy.damage }}
        </span>
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
          <thead>
            <th><span class="header">NAME</span></th>
          </thead>
          <tbody>
            <tr v-for="(hero, index) in fightStore.heroes" :key="index">
              <td class="hero-name-container">
                <image id="ff7cursor" class="ff7cursor" v-if="hero.fileName === fightStore.selectedCharacter.fileName" />
                <span v-if="hero.isAvailable && !hero.hasAttacked && !hero.isDead" @click="changeSelectedChar(hero)"
                  :class="{ 'animated-text': hero.fileName === fightStore.selectedCharacter.fileName && !hero.isDead, 'dead-character': hero.isDead }"
                  :style="{ cursor: hero.isAvaliable && !hero.isDead ? 'pointer' : 'default', color: hero.isDead ? 'red' : 'white' }">
                  {{ useLocalizeText(hero.name) }}
                </span>
                <span class="hero-name" v-else-if="hero.isAvailable && hero.hasAttacked && !hero.isDead"
                  :style="{ cursor: hero.isAvaliable && !hero.isDead ? 'pointer' : 'default', color: hero.isDead ? 'red' : 'gray' }">
                  {{ useLocalizeText(hero.name) }}
                </span>
                <span class="hero-name" v-else-if="hero.isAvailable && hero.isDead"
                  :style="{ cursor: hero.isAvaliable && !hero.isDead ? 'pointer' : 'default', color: hero.isDead ? 'red' : 'gray' }">
                  {{ useLocalizeText(hero.name) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="final-box final-box-stats-info">
        <table class="custom-table" style="margin-left: 24px;">
          <div style="display: flex; justify-content: space-between;">
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;width:200px;">
              <span class="header" style="margin-top: 4px;margin-bottom:0px;">{{ useLocalizeText('PG') }}</span>
            </div>
            <div style="flex: 1;margin-left: 48px;margin-bottom: 12px">
              <div style="display: flex; flex-direction: column; align-items: center;width:100px;">
                <span class="header" style="margin-top: 4px;margin-bottom:0px;">{{ useLocalizeText('PM') }}</span>
              </div>
            </div>
          </div>
          <tr v-for="(hero, index) in fightStore.heroes" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <div v-if="hero.isAvailable"
                        :style="{ display: 'flex', justifyContent: 'space-between', color: hero.isDead ? 'red' : 'initial','margin-top':'-12px' }">
                        <!-- Column PG -->
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;width:200px;">
                          <span :style="{ 'margin-bottom': '-15px', color: hero.isDead ? 'red' : 'white' }">{{ hero.pg
                          }}/{{ hero.pgMax }}</span>
                          <progress :max="hero.pgMax" :value="hero.pg" :class="'pg'"></progress>
                        </div>
                        <!-- Column PM -->
                        <div style="flex: 1;margin-left: 48px;">
                          <div style="display: flex; flex-direction: column; align-items: center;width:100px;">
                            <span :style="{ 'margin-bottom': '-15px', color: hero.isDead ? 'red' : 'white' }">{{ hero.pm
                            }}/{{ hero.pmMax }}</span>
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
      <div ref="menuBasic" class="final-box final-box-menuone-info"
        v-if="showMenuBasic && !fightStore.selectedCharacter.isEnemy">
        <table class="custom-table">
          <tr v-for="(action, index) in selectedActions" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <image id="ff7cursor" class="ff7cursor" v-if="action.fileName === selectedAction.fileName" />
                      <span
                        @click="(action.enabled && (action.pmPrice === 0 || (action.pmPrice > 0 && action.pmPrice <= fightStore.selectedCharacter.pm))) ? actionExecute(action, action.name) : null"
                        :style="{ cursor: action.enabled ? 'pointer' : 'default', color: (action.enabled && (action.pmPrice === 0 || (action.pmPrice > 0 && action.pmPrice <= fightStore.selectedCharacter.pm))) ? 'white' : 'gray' }">
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
      <div ref="menuMagic" class="final-box final-box-menuone-info" :style="calculateStyleMagics()" v-if="showMenuMagic">
        <table class="custom-table" v-if="selectedAction">
          <tr v-for="(magic, index) in selectedAction.magics" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <image class="ff7cursor" v-if="magic.fileName === selectedMagic.fileName" />
                      <span
                        @click="(magic.enabled && (magic.pmPrice === 0 || (magic.pmPrice > 0 && magic.pmPrice <= fightStore.selectedCharacter.pm))) ? magicExecute(magic) : null"
                        :style="{ cursor: magic.enabled ? 'pointer' : 'default', color: (magic.enabled && (magic.pmPrice === 0 || (magic.pmPrice > 0 && magic.pmPrice <= fightStore.selectedCharacter.pm))) ? 'white' : 'gray' }">
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
      <div ref="menuTargets" class="final-box final-box-menuone-info" :style="calculateStyleTargets(sourceMenu)"
        v-if="showMenuTargets">
        <table class="custom-table" v-if="!fightStore.selectedCharacter.isEnemy">
          <tr v-for="(enemy, index) in fightStore.enemies" :key="index">
            <td>
              <table>
                <thead>
                  <tr>
                    <td>
                      <image id="ff7cursor" class="ff7cursor"
                        v-if="enemy.fileName === fightStore.targetCharacter.fileName" />
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
        <table class="custom-table" v-if="fightStore.selectedCharacter.isEnemy">
          <tr v-for="(hero, index) in fightStore.heroes" :key="index">
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
    </div>
  </div>
</template>

<script setup>

import {
  getImageUrl,
  getRandomBackgroundImage,
  updateArrowPosition,
  showAttack,
  showMagicAttack,
  showSummon,
  updateLastDamagePosition,
  calculateStyleTargets,
  calculateStyleMagics,
  hideArrow,
  showArrow,
  updateEnemyCursorPosition,
  hideEnemyCursor,
  showEnemyCursor,
  applyFlipToLeft
} from './uxFightHelper'

import { ref, onBeforeMount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalizeText } from '../composables/localization'
import { useAppStore } from '../stores/app'
import { useFightStore } from '../stores/fight'

const fightStore = useFightStore();
const appStore = useAppStore();
const router = useRouter();
const debug = ref(false);

const backImage = ref(getRandomBackgroundImage()); // Background random image
const message = ref(''); // Upper dialog
const isOpen = ref(false); // Open up dialog
const sourceMenu = ref(''); // From where menu targets is opened

const lastDamage = ref(0); // Last damage received and show
const selectedActions = ref([]); // Selected actions
const selectedAction = ref({ fileName: "", minDamage: 0, maxDamage: 0, pmPrice: 0 }); // Selected action
const selectedMagic = ref({ fileName: "", minDamage: 0, maxDamage: 0, pmPrice: 0 }); // Selected magic from magics

const showMenuBasic = ref(false); // Show attacks menu
const showMenuMagic = ref(false); // Show magics menu
const showMenuTargets = ref(false); // Show enemies menu

const turnCount = ref(1); // Turn number
const isOpenDialog = ref(false);
/**
 * Set current page
 */
onBeforeMount(async () => {
  appStore.setPageName("Fight");
  turnCount.value = 0;
});

/** Begin combat **/
onMounted(async () => {
  await showDialog();
  goTurn();
});

/**
 * Set current hero, fightStore.heroes, and fightStore.enemies
 */
const goTurn = async () => {
  let char = fightStore.getRandomAvailableHeroAlive();
  await changeSelectedChar(char);
}

/**
 * Change selected character
 * @param {*} newChar 
 */
const changeSelectedChar = async (newChar) => {
  if (newChar) {
    hideAllMenus();
    fightStore.selectedCharacter = newChar;
    selectedActions.value = fightStore.selectedCharacter.actions;
    if (!fightStore.selectedCharacter.isEnemy) {
      updateArrowPosition(fightStore.selectedCharacter);
      showMenuBasic.value = true;
      showArrow();
    }
    selectedAction.value = { fileName: "", minDamage: 0, maxDamage: 0, pmPrice: 0 };
  }
};

/**
 * Execute action / menus
 * @param {*} action action obj 
 */
const actionExecute = async (action) => {
  if (!fightStore.selectedCharacter) {
    console.error('No character selected');
    return;
  }
  const actionName = action.fileName;
  switch (actionName) {
    case 'attack':
      appStore.playSelect();
      sourceMenu.value = "menuBasic";
      selectedAction.value = action;
      showMenuTargets.value = true;
      showMenuMagic.value = false;
      selectedMagic.value = { fileName: "", minDamage: 0, maxDamage: 0, pmPrice: 0 };
      break;
    case 'magic':
      appStore.playSelect();
      sourceMenu.value = "menuMagic";
      selectedAction.value = action;
      showMenuTargets.value = false;
      showMenuMagic.value = true;
      selectedMagic.value = { fileName: "", minDamage: 0, maxDamage: 0, pmPrice: 0 };
      break;
    case 'summon':
      appStore.playSelect();
      selectedMagic.value = { fileName: "", minDamage: 0, maxDamage: 0, pmPrice: 0 };
      showMenuMagic.value = false;
      showMenuTargets.value = false;
      selectedAction.value = action;
      appStore.playSummon();
      await summonExecute();
      break;
    case 'exit':
      hideArrow();
      applyFlipToLeft();
      showMenuBasic.value = false;
      selectedMagic.value = { fileName: "", minDamage: 0, maxDamage: 0, pmPrice: 0 };
      showMenuMagic.value = false;
      showMenuTargets.value = false;
      selectedAction.value = action;
      appStore.playSelect();
      let msg = "skip_fight";
      fightStore.lastCombatStatus = 2;
      await showDialog(msg);
      navEndFight();
      break;
  }
};

/**
 * Execute damage
 * @param {*} enemy obj 
 */
const damageExecute = async (enemy) => {
  fightStore.targetCharacter = enemy;
  updateEnemyCursorPosition(fightStore.targetCharacter);
  switch (selectedAction.value.fileName) {
    case 'attack':
      hideAllMenus();
      if (!fightStore.selectedCharacter.isEnemy) {
        appStore.playSelect();
      }
      fightStore.markSelectedCharacterAsAttacked();
      appStore.playAttackLaunch();
      appStore.playAttack();      
      if (await showAttack(fightStore.selectedCharacter, fightStore.targetCharacter)) {
        if (await ApplyDamage()) {
          await executeEnemyResponse();
        }
      }
      break;
    case 'magic':
      if (!fightStore.selectedCharacter.isEnemy) {
        appStore.playSelect();
      }
      hideAllMenus();
      appStore.playMagicLaunch();
      fightStore.markSelectedCharacterAsAttacked();
      fightStore.targetCharacter = enemy;
      appStore.playMagic(selectedMagic.value.fileName);
      if (showMagicAttack(fightStore.selectedCharacter, fightStore.targetCharacter, selectedMagic.value)) {
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
  appStore.playSelect();
};

/**
 * Execute summon
 */
const summonExecute = async () => {
  hideAllMenus();
  if (fightStore.selectedCharacter) {
    appStore.playSummonLaunch();
    if (await showSummon(fightStore.selectedCharacter)) {
      if (await ApplyDamage()) {
        fightStore.markSelectedCharacterAsAttacked();
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
    updateLastDamagePosition(fightStore.targetCharacter);
    fightStore.targetCharacter.damage = damage;
    fightStore.targetCharacter.pg -= damage;
    if (fightStore.targetCharacter.pg < 0) {
      fightStore.targetCharacter.pg = 0;
    }
    if (pmPrice > 0) {
      fightStore.selectedCharacter.pm -= pmPrice;
      if (fightStore.selectedCharacter.pm < 0) {
        fightStore.selectedCharacter.pm = 0;
      }
    }
    if (!fightStore.selectedCharacter.isEnemy){
     showEnemyCursor();
    }
    lastDamage.value = damage;
    await new Promise(resolve => setTimeout(resolve, 1500));
    lastDamage.value = 0;
    if (!fightStore.selectedCharacter.isEnemy){
     hideEnemyCursor();
    }
    if (fightStore.targetCharacter.pg == 0) {
      fightStore.targetCharacter.isDead = true;
      appStore.playDead();
      await checkContinue();
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
  } else {

    await new Promise(resolve => setTimeout(resolve, 6000));
    const enemiesToDamage = fightStore.enemies.filter(e => !e.isDead);
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
        appStore.playDead();
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
  const aliveAllies = fightStore.countAliveAllies();
  const aliveEnemies = fightStore.countAliveEnemies();
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
  await new Promise(resolve => setTimeout(resolve, 1000));
  message.value = useLocalizeText(key);
  isOpenDialog.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  isOpenDialog.value = false;
};

/**
 * Navigate to endFight
 */
const navEndFight = () => {
  appStore.navEndFight();
};

/**
 * Execute enemy reponse after allied attack
 */
const executeEnemyResponse = async () => {
  hideArrow();
  const e = fightStore.getRandomAvailableEnemyAlive();
  changeSelectedChar(e);
  selectedAction.value = selectedActions.value[0];
  fightStore.targetCharacter = fightStore.getRandomAvailableHeroAliveForTarget();
  appStore.playAttack();
  if (showAttack(fightStore.selectedCharacter, fightStore.targetCharacter)) {
    if (await ApplyDamage()) {
      if (fightStore.allHeroesAttacked()) {
        await fightStore.resetHeroesAttacked();
      }
      const h = fightStore.getRandomAvailableHeroAlive();
      if (h) {
        await changeSelectedChar(h);
      } else {
        await checkContinue();
        await resetTurn();
      }
    }
  }
};

/**
 * Reset turn, counters and values...
 * */
const resetTurn = async () => {
  fightStore.alliesAttackedCount = 0;
  fightStore.enemiesAttackedCount = 0;
  turnCount.value += 1;
  await fightStore.resetCharactersAttacked();
  const firstAvailableHero = fightStore.getRandomAvailableHeroAlive();
  if (firstAvailableHero) {
    await changeSelectedChar(firstAvailableHero);
  } else {
    const firstAvailableEnemy = fightStore.getRandomAvailableEnemyAlive();
    if (firstAvailableEnemy) {
      await changeSelectedChar(firstAvailableEnemy);
    } else {
      navEndFight();
    }
  }
};


/** BOTTOM MENUS **/

/**
 * Hide all menu
 */
const hideAllMenus = () => {
  showMenuBasic.value = false;
  showMenuMagic.value = false;
  showMenuTargets.value = false;
}

</script setup>
<style scoped>
@import '../../public/styles/fight.css'
</style>
