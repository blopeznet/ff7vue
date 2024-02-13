import { defineStore } from 'pinia'
import { useFightStore } from '../stores/fight'
import { useMapStore } from '../stores/map'

/**
 * Store app general
 */
export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        loading: false,
        locale: "en",
        effect: "",
        pageName: "",
        musicVolume: 0.0,
        soundEffects: true,
        showJoy: true,
    }),
    actions: {
        setLoading(loading) {
            this.loading = loading;
        },
        setLocale(locale) {
            this.locale = locale;
        },
        setPageName(pageName) {

            if (pageName == this.pageName) {
                return;
            }
            const fightStore = useFightStore();
            const mapStore = useMapStore();
            this.pageName = pageName;

            switch (pageName) {
                case "Home":
                    fightStore.resetState();
                    mapStore.resetState();
                    break;
                case "History":
                    fightStore.resetState();
                    mapStore.resetState();
                    break;
                case "Map":
                    break;
                case "Menu":
                    break;
                case "Fight":
                    break;
                case "EndFight":
                    break;
                case "EndGame":
                    fightStore.resetState();
                    mapStore.resetState();
                    break;
                default:
                    break;
            }
        },
        playSelect() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("select.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playMenu() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("menu.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playGil() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("gil.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playAttack() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("attack.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playAqua() {
            const audio = new Audio(this.calculateAudio("aqua.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playIce() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("ice.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playFire() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("fire.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playSummon() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("summon.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playThunder() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("thunder.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playDead() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("dead.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        playRestore() {
            if (!this.soundEffects) return;
            const audio = new Audio(this.calculateAudio("restore.mp3"));
            audio.volume = this.musicVolume;
            audio.play();
        },
        calculateAudio(fileName) {
            return `/ff7vue/effects/${fileName}`;
        },       
    }
})