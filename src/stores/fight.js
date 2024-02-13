import { defineStore } from 'pinia'
import { useLocalizeText } from '../composables/localization'

const initialState = {
    loading: false,
    characters: [],
    gil: 1000,
    gainedGil: 0,
    levelGame: 1, //Level 0 Easy, 1 Normal, 2 Hard
};

/**
 * Fight store
 */
export const useFightStore = defineStore({
    id: 'fight',
    state: () => ({
        loading: false,
        characters: [],
        gil: 1000,
        gainedGil: 0,
        levelGame: 1, //Level 0 Easy, 1 Normal, 2 Hard
    }),
    actions: {
        initCharacters() {
            // Define los personajes
            const characters = [
                {
                    name: "sephirot",
                    level: 99,
                    pg: 9999,
                    pgMax: 9999,
                    pm: 9999,
                    pmMax: 9999,
                    type: "god",
                    damage: 0,
                    isAvaliable: true,
                    isDead: false,
                    isEnemy: false,
                    hasAttacked: false,
                },
                {
                    name: "cloud",
                    level: 12,
                    pg: 1000,
                    pgMax: 1000,
                    pm: 30,
                    pmMax: 30,
                    type: "warrior",
                    damage: 0,
                    isAvaliable: true,
                    isDead: false,
                    isEnemy: false,
                    hasAttacked: false,
                },
                {
                    name: "aeris",
                    level: 10,
                    pg: 300,
                    pgMax: 300,
                    pm: 50,
                    pmMax: 50,
                    type: "magician",
                    damage: 0,
                    isAvaliable: true,
                    isDead: false,
                    isEnemy: false,
                    hasAttacked: false,
                },
                {
                    name: "enemy",
                    level: 20,
                    pg: 20,
                    pgMax: 400,
                    pm: 50,
                    pmMax: 50,
                    type: "enemy",
                    damage: 0,
                    isAvaliable: false,
                    isDead: false,
                    isEnemy: true,
                    hasAttacked: false,
                }
            ];

            // Asigna el daño calculado a las acciones de ataque y magia para cada personaje
            characters.forEach(character => {
                character.actions = [];
                character.actions = this.setActionCharacters(character);
            });

            // Establece la propiedad de personajes
            this.characters = characters;

        },
        setActionCharacters(character) {

            const calculateDamage = (level) => {
                // Calcula el daño mínimo y máximo en función del nivel del personaje
                const minDamageAttack = Math.floor(level * 0.5);
                const maxDamageAttack = Math.floor(level * 1.5);
                return { minDamageAttack, maxDamageAttack };
            };

            const calculateDamageAndPMPrice = (level) => {
                // Calcula el daño mínimo y máximo en función del nivel del personaje
                const minDamage = Math.floor(level * 0.5);
                const maxDamage = Math.floor(level * 1.5);
                // Calcula el PMPrice en función del nivel del personaje
                const pmPrice = Math.floor(level * 0.1); // Por ejemplo, 10% del nivel del personaje
                return { minDamage, maxDamage, pmPrice };
            };

            const calculateDamageAndPMPriceSummon = (level) => {
                // Calcula el daño mínimo y máximo en función del nivel del personaje
                const minDamageSummon = Math.floor(level * 5);
                const maxDamageSummon = Math.floor(level * 10);
                // Calcula el PMPrice en función del nivel del personaje
                const pmPriceSummon = Math.floor(level * 2); // Por ejemplo, 10% del nivel del personaje
                return { minDamageSummon, maxDamageSummon, pmPriceSummon };
            };

            let actions = [];

            // Define las acciones de ataque, magia, summon
            const actionAttack = { name: useLocalizeText("attack"), enabled: true, pmPrice: 0,fileName: "attack" };
            const actionMagic = { name: useLocalizeText("magic"), enabled: true, pmPrice: 0,fileName: "magic" };
            const actionSummon = { name: useLocalizeText("summon"), enabled: true, pmPrice: 0,fileName: "summon" };

            // Define las magias disponibles
            const magicAqua = { name: useLocalizeText("aqua"), enabled: true, fileName: "aqua" };
            const magicFire = { name: useLocalizeText("fire"), enabled: true, fileName: "fire" };
            const magicIce = { name: useLocalizeText("ice"), enabled: true, fileName: "ice" };
            const magicThunder = { name: useLocalizeText("thunder"), enabled: true, fileName: "thunder" };

            actionMagic.magics = [];
            // Calcula el daño y el PMPrice para cada magia
            [magicAqua, magicFire, magicIce, magicThunder].forEach(magic => {
                const { minDamage, maxDamage, pmPrice } = calculateDamageAndPMPrice(character.level); // Nivel predeterminado para los personajes
                magic.minDamage = minDamage;
                magic.maxDamage = maxDamage;
                magic.pmPrice = pmPrice;
                actionMagic.magics.push(magic);
            })

            // Calcula el PMPrice para la acción de invocación
            const { minDamageSummon, maxDamageSummon, pmPriceSummon } = calculateDamageAndPMPriceSummon(character.level);
            actionSummon.minDamage = minDamageSummon;
            actionSummon.maxDamage = maxDamageSummon;
            actionSummon.pmPrice = pmPriceSummon;

            // Calcula el Damage y PMPPrice para la acción de ataque
            const { minDamageAttack, maxDamageAttack } = calculateDamage(character.level);
            actionAttack.minDamage = minDamageAttack;
            actionAttack.maxDamage = maxDamageAttack;

            switch (character.type) {
                case "god":
                    actions.push(actionAttack);
                    actions.push(actionMagic);
                    actions.push(actionSummon);
                    break;
                case "warrior":
                    actions.push(actionAttack);
                    actions.push(actionMagic);
                    break;
                case "magician":
                    actions.push(actionAttack);
                    actions.push(actionMagic);
                    break;
                case "enemy":
                    actions.push(actionAttack);
                    break;
                default:
                    break;

            }
            return actions;
        },
        setLoading(loading) {
            this.loading = loading;
        },
        setGainedGil() {
            this.gainedGil = Math.floor(Math.random() * 101);
        },
        updateGil() {
            return new Promise((resolve, reject) => {
                const intervalId = setInterval(() => {
                    if (this.gainedGil > 0) {
                        this.gainedGil--; // Reduce gainedGil en 1
                        this.gil++;
                    } else {
                        clearInterval(intervalId); // Detiene el intervalo cuando gainedGil llega a 0
                        resolve(); // Resuelve la promesa cuando la actualización está completa
                    }
                }, 50); // Intervalo de 50 milisegundos (0.1 segundo)
            });
        },
        resetState() {
            Object.assign(this.$state, initialState);
            this.initCharacters();
        },
        resetChars() {
            this.characters[0].pg = this.characters[0].pgMax;
            this.characters[1].pg = this.characters[1].pgMax;
            this.characters[2].pg = this.characters[2].pgMax;
            this.characters[0].damage = 0;
            this.characters[1].damage = 0;
            this.characters[2].damage = 0;
            this.characters[0].isDead = false;
            this.characters[1].isDead = false;
            this.characters[2].isDead = false;
            this.characters[0].hasAttacked = false;
            this.characters[1].hasAttacked = false;
            this.characters[2].hasAttacked = false;
        },
        resetEnemy() {
            const enemyIndex = this.characters.findIndex(character => character.type === "enemy");
            const enemy = this.characters[enemyIndex];

            enemy.hasAttacked = false;
            enemy.isDead = false;
            enemy.damage = 0;

            switch (this.levelGame) {
                case 0: //Easy
                    enemy.pg = Math.floor(enemy.pgMax * 0.8);
                    enemy.pgMax = Math.floor(enemy.pgMax * 0.8);
                    enemy.level = Math.floor(Math.random() * 5) + 5;
                    break;
                case 1: //Normal
                    enemy.pg = Math.floor(Math.random() * (enemy.pgMax * 0.5) + enemy.pgMax * 0.5);
                    enemy.pgMax = Math.floor(Math.random() * (enemy.pgMax * 0.5) + enemy.pgMax * 0.5);
                    enemy.level = Math.floor(Math.random() * 10) + 10;
                    break;
                case 2: //Hard
                    enemy.pg = Math.floor(enemy.pgMax * 1.2);
                    enemy.pgMax = Math.floor(enemy.pgMax * 1.2);
                    enemy.level = Math.floor(Math.random() * 5) + 15;
                    break;
                default:
                    break;
            }
        }
        ,
        resetPG() {
            this.characters[0].pg = this.characters[0].pgMax;
            this.characters[1].pg = this.characters[1].pgMax;
            this.characters[2].pg = this.characters[2].pgMax;
        },
        resetPM() {
            this.characters[0].pm = this.characters[0].pmMax;
            this.characters[1].pm = this.characters[1].pmMax;
            this.characters[2].pm = this.characters[2].pmMax;
        },
    }
})