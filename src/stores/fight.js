import { defineStore } from "pinia";
import { useLocalizeText } from "../composables/localization";
import heroesData from "../data/heroes.json";
import enemiesData from "../data/enemies.json";

const initialState = {
  loading: false,
  heroes: [],
  enemies: [],
  gil: 1000,
  gainedGil: 0,
  lastCombatStatus: 0,
  targetCharacter: {
    isEnemy: false,
    actions: [],
    damage: 0,
    pg: 0,
    pm: 0,
    isDead: false,
    fileName: "",
  },
  selectedCharacter: {
    isEnemy: false,
    actions: [],
    damage: 0,
    pg: 0,
    pm: 0,
    isDead: false,
    fileName: "",
  },
  alliesAttackedCount: 0,
};

/**
 * Fight store
 */
export const useFightStore = defineStore({
  id: "fight",
  state: () => ({
    ...initialState, // Use spread operator to avoid repeating state properties
  }),
  actions: {
    // Init chars heroes and enemies
    async initCharacters() {
      if (this.heroes.length === 3) {
        return false;
      }
      this.heroes = heroesData;
      const numEnemies = Math.floor(Math.random() * 3) + 1;
      const enemies = [];
      for (let i = 0; i < numEnemies; i++) {
        const randomIndex = Math.floor(Math.random() * enemiesData.length);
        enemies.push({ ...enemiesData[randomIndex] });
      }
      this.enemies = enemies;
      this.assignActionsValuesToHeroes();
      this.assignActionsValuesToEnemies();
      this.setEnemiesFileNames();
    },
    // Reset enemies values
    resetEnemy() {
      this.enemies = [];
      const enemiesAvailable = [...enemiesData];
      let numEnemies = Math.floor(Math.random() * 3) + 1;
      const newEnemies = [];
      for (let i = 0; i < numEnemies; i++) {
        const randomIndex = Math.floor(Math.random() * enemiesAvailable.length);
        const selectedEnemy = { ...enemiesAvailable[randomIndex] };
        selectedEnemy.fileName =
          numEnemies === 1
            ? "top-enemy"
            : numEnemies === 2
            ? i === 0
              ? "top-enemy"
              : "middle-enemy"
            : i === 0
            ? "top-enemy"
            : i === 1
            ? "middle-enemy"
            : "bottom-enemy";
        newEnemies.push({
          ...selectedEnemy,
          damage: 0,
          isAvaliable: true,
          isDead: false,
          pg: selectedEnemy.pgMax,
          hasAttacked: false,
        });
        enemiesAvailable.splice(randomIndex, 1);
      }
      if (newEnemies.length === 0) {
        const randomIndex = Math.floor(Math.random() * enemiesAvailable.length);
        const randomEnemy = { ...enemiesAvailable[randomIndex] };
        randomEnemy.fileName = "middle-enemy";
        enemiesAvailable.splice(randomIndex, 1);
        newEnemies.push(randomEnemy);
      }
      this.enemies = newEnemies;
      this.assignActionsValuesToEnemies();
    },
    // Set loading
    setLoading(loading) {
      this.loading = loading;
    },
    // Set gainedGil random
    setGainedGil() {
      this.gainedGil = Math.floor(Math.random() * 101);
    },
    // Update gil async
    updateGil() {
      return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
          if (this.gainedGil > 0) {
            this.gainedGil--;
            this.gil++;
          } else {
            clearInterval(intervalId);
            resolve(null);
          }
        }, 50);
      });
    },
    // Reset state and init characters
    resetState() {
      Object.assign(this.$state, initialState);
      this.initCharacters();
    },
    // Reset damage, dead and pg from heroes
    resetChars() {
      this.heroes.forEach((character) => {
        character.damage = 0;
        if (character.isDead) {
          character.isDead = false;
          character.pg = 100;
        }
        character.hasAttacked = false;
      });
    },
    // Reset pg from heroes to max
    resetPG() {
      this.heroes.forEach((character) => {
        character.damage = 0;
        character.isDead = false;
        character.pg = character.pgMax;
        character.hasAttacked = false;
      });
    },
    // Reset pm from heroes to max
    resetPM() {
      this.heroes.forEach((character) => {
        character.damage = 0;
        character.isDead = false;
        character.pm = character.pmMax;
        character.hasAttacked = false;
      });
    },
    // Set actions for characters
    setActionCharacters(character) {
      const calculateDamage = (level) => {
        const minDamageAttack = Math.floor(level * 0.5);
        const maxDamageAttack = Math.floor(level * 1.5);
        return { minDamageAttack, maxDamageAttack };
      };

      const calculateDamageAndPMPrice = (level) => {
        const minDamage = Math.floor(level * 0.5);
        const maxDamage = Math.floor(level * 1.5);
        const pmPrice = Math.floor(level * 0.1);
        return { minDamage, maxDamage, pmPrice };
      };

      const calculateDamageAndPMPriceSummon = (level) => {
        const minDamageSummon = Math.floor(level * 5);
        const maxDamageSummon = Math.floor(level * 10);
        const pmPriceSummon = Math.floor(level * 2);
        return { minDamageSummon, maxDamageSummon, pmPriceSummon };
      };

      let actions = [];
      const actionAttack = {
        name: useLocalizeText("attack"),
        enabled: true,
        pmPrice: 0,
        fileName: "attack",
      };
      const actionMagic = {
        name: useLocalizeText("magic"),
        enabled: true,
        pmPrice: 0,
        fileName: "magic",
      };
      const actionSummon = {
        name: useLocalizeText("summon"),
        enabled: true,
        pmPrice: 0,
        fileName: "summon",
      };
      const actionExit = {
        name: useLocalizeText("leave"),
        enabled: true,
        pmPrice: 0,
        fileName: "exit",
      };
      const magicAqua = {
        name: useLocalizeText("aqua"),
        enabled: true,
        fileName: "aqua",
      };
      const magicFire = {
        name: useLocalizeText("fire"),
        enabled: true,
        fileName: "fire",
      };
      const magicIce = {
        name: useLocalizeText("ice"),
        enabled: true,
        fileName: "ice",
      };
      const magicThunder = {
        name: useLocalizeText("thunder"),
        enabled: true,
        fileName: "thunder",
      };

      actionMagic.magics = [];
      [magicAqua, magicFire, magicIce, magicThunder].forEach((magic) => {
        const { minDamage, maxDamage, pmPrice } = calculateDamageAndPMPrice(
          character.level
        );
        magic.minDamage = minDamage;
        magic.maxDamage = maxDamage;
        magic.pmPrice = pmPrice;
        actionMagic.magics.push(magic);
      });

      const { minDamageSummon, maxDamageSummon, pmPriceSummon } =
        calculateDamageAndPMPriceSummon(character.level);
      actionSummon.minDamage = minDamageSummon;
      actionSummon.maxDamage = maxDamageSummon;
      actionSummon.pmPrice = pmPriceSummon;

      const { minDamageAttack, maxDamageAttack } = calculateDamage(
        character.level
      );
      actionAttack.minDamage = minDamageAttack;
      actionAttack.maxDamage = maxDamageAttack;

      switch (character.type) {
        case "god":
          actions.push(actionAttack);
          actions.push(actionMagic);
          actions.push(actionSummon);
          actions.push(actionExit);
          break;
        case "warrior":
          actions.push(actionAttack);
          actions.push(actionMagic);
          actions.push(actionExit);
          break;
        case "magician":
          actions.push(actionAttack);
          actions.push(actionMagic);
          actions.push(actionExit);
          break;
        case "enemy":
          actions.push(actionAttack);
          break;
        default:
          break;
      }
      return actions;
    },
    // Set action values to heroes
    assignActionsValuesToHeroes() {
      this.heroes.forEach((hero) => {
        hero.actions.forEach((action) => {
          switch (action.name) {
            case "attack":
              const { minDamageAttack, maxDamageAttack } = this.calculateDamage(
                hero.level
              );
              action.minDamage = minDamageAttack;
              action.maxDamage = maxDamageAttack;
              break;
            case "magic":
              action.magics.forEach((magic) => {
                const { minDamage, maxDamage, pmPrice } =
                  this.calculateDamageAndPMPrice(hero.level);
                magic.minDamage = minDamage;
                magic.maxDamage = maxDamage;
                magic.pmPrice = pmPrice;
              });
              break;
            case "summon":
              const { minDamageSummon, maxDamageSummon, pmPriceSummon } =
                this.calculateDamageAndPMPriceSummon(hero.level);
              action.minDamage = minDamageSummon;
              action.maxDamage = maxDamageSummon;
              action.pmPrice = pmPriceSummon;
              break;
            default:
              break;
          }
        });
      });
    },
    // Set action values to enemies
    assignActionsValuesToEnemies() {
      this.enemies.forEach((enemy) => {
        enemy.actions.forEach((action) => {
          switch (action.name) {
            case "attack":
              const { minDamageAttack, maxDamageAttack } = this.calculateDamage(
                enemy.level
              );
              action.minDamage = minDamageAttack;
              action.maxDamage = maxDamageAttack;
              break;
            case "magic":
              action.magics.forEach((magic) => {
                const { minDamage, maxDamage, pmPrice } =
                  this.calculateDamageAndPMPrice(enemy.level);
                magic.minDamage = minDamage;
                magic.maxDamage = maxDamage;
                magic.pmPrice = pmPrice;
              });
              break;
            case "summon":
              const { minDamageSummon, maxDamageSummon, pmPriceSummon } =
                this.calculateDamageAndPMPriceSummon(enemy.level);
              action.minDamage = minDamageSummon;
              action.maxDamage = maxDamageSummon;
              action.pmPrice = pmPriceSummon;
              break;
            default:
              break;
          }
        });
      });
    },
    // Calc damage attack
    calculateDamage(level) {
      const minDamageAttack = Math.floor(level * 0.5);
      const maxDamageAttack = Math.floor(level * 1.5);
      return { minDamageAttack, maxDamageAttack };
    },
    // Calc damage and pm price magic
    calculateDamageAndPMPrice(level) {
      const minDamage = Math.floor(level * 0.5);
      const maxDamage = Math.floor(level * 1.5);
      const pmPrice = Math.floor(level * 0.1);
      return { minDamage, maxDamage, pmPrice };
    },
    // Calc damage and pm price summon
    calculateDamageAndPMPriceSummon(level) {
      const minDamageSummon = Math.floor(level * 5);
      const maxDamageSummon = Math.floor(level * 10);
      const pmPriceSummon = Math.floor(level * 2);
      return { minDamageSummon, maxDamageSummon, pmPriceSummon };
    },
    // Set fileNames to enemies after start
    setEnemiesFileNames() {
      const numEnemies = this.enemies.length;
      this.enemies.forEach((enemy, i) => {
        switch (numEnemies) {
          case 1:
            enemy.fileName = "top-enemy";
            break;
          case 2:
            enemy.fileName = i === 0 ? "top-enemy" : "middle-enemy";
            break;
          default:
            enemy.fileName =
              i === 0 ? "top-enemy" : i === 1 ? "middle-enemy" : "bottom-enemy";
            break;
        }
      });
    },
    // Reset damage and has attacked from heroes
    resetHeroes() {
      for (let i = 0; i < this.heroes.length; i++) {
        const hero = this.heroes[i];
        this.heroes[i].damage = 0;
        hero.hasAttacked = false;
      }
    },
    // Get random hero not attacked and not dead
    getRandomAvailableHeroAlive() {
      const availableHeroes = this.heroes.filter(
        (h) => !h.isDead && !h.hasAttacked
      );
      if (availableHeroes.length > 0) {
        if (availableHeroes.length === 1) {
          return availableHeroes[0];
        } else {
          const randomIndex = Math.floor(
            Math.random() * availableHeroes.length
          );
          return availableHeroes[randomIndex];
        }
      } else {
        return null;
      }
    },
    //Mark selected char as attack
    markSelectedCharacterAsAttacked() {
      if (this.selectedCharacter) {
        if (!this.selectedCharacter.isEnemy) {
          const hero = this.heroes.find(
            (char) => char.fileName === this.selectedCharacter.fileName
          );
          if (hero) {
            hero.hasAttacked = true;
          }
        }
        this.alliesAttackedCount = this.heroes.filter(
          (h) => h.hasAttacked && h.isDead == false
        ).length;
      }
    },
    //Reset has attacked for all heroes
    resetHeroesAttacked() {
      this.heroes.forEach((hero) => {
        if (!hero.isDead) {
          hero.hasAttacked = false;
        }
      });
    },
    //Get hero not dead random
    getRandomAvailableHeroAliveForTarget() {
      const availableHeroes = this.heroes.filter((h) => !h.isDead);
      if (availableHeroes.length > 0) {
        if (availableHeroes.length === 1) {
          return availableHeroes[0];
        } else {
          const randomIndex = Math.floor(
            Math.random() * availableHeroes.length
          );
          return availableHeroes[randomIndex];
        }
      } else {
        return null;
      }
    },
    //Get enemy not dead random
    getRandomAvailableEnemyAlive() {
      const availableEnemies = this.enemies.filter((e) => !e.isDead);
      if (availableEnemies.length > 0) {
        if (availableEnemies.length === 1) {
          return availableEnemies[0];
        } else {
          const randomIndex = Math.floor(
            Math.random() * availableEnemies.length
          );
          return availableEnemies[randomIndex];
        }
      } else {
        return null;
      }
    },
    //Count heroes allive
    countAliveAllies() {
      return this.heroes.filter((h) => !h.isDead).length;
    },
    //Count enemies allive
    countAliveEnemies() {
      return this.enemies.filter((e) => !e.isDead).length;
    },
    //Verify all heroes has attacked
    allHeroesAttacked() {
      const heroesAttacked = this.heroes
        .filter((hero) => !hero.isDead)
        .every((hero) => hero.hasAttacked);
      return heroesAttacked;
    },
  },
});
