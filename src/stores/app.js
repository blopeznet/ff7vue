import { defineStore } from "pinia";
import { useFightStore } from "../stores/fight";
import { useMapStore } from "../stores/map";

/**
 * Store app general
 */
export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    loading: false,
    locale: "en",
    effect: "",
    pageName: "",
    musicVolume: 1.0,
    soundEffects: true,
    showJoy: false,
    router: {}
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    setLocale(locale) {
      this.locale = locale;
    },
    setRouter(router) {
      this.router = router;
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
    playMagic(magicName) {
      if (!this.soundEffects) return;

      let audioFileName;

      switch (magicName) {
        case "aqua":
          audioFileName = "aqua.mp3";
          break;
        case "ice":
          audioFileName = "ice.mp3";
          break;
        case "fire":
          audioFileName = "fire.mp3";
          break;
        case "thunder":
          audioFileName = "thunder.mp3";
          break;
        default:
          return;
      }

      const audio = new Audio(this.calculateAudio(audioFileName));
      audio.volume = this.musicVolume;
      audio.play();
    },
    playSummon() {
      if (!this.soundEffects) return;
      const audio = new Audio(this.calculateAudio("summon.mp3"));
      audio.volume = this.musicVolume;
      audio.play();
    },
    playSummonLaunch() {
      if (!this.soundEffects) return;
      const audio = new Audio(this.calculateAudio("summon_launch.mp3"));
      audio.volume = this.musicVolume;
      audio.play();
    },
    playMagicLaunch() {
      if (!this.soundEffects) return;
      const audio = new Audio(this.calculateAudio("magic_launch.mp3"));
      audio.volume = this.musicVolume;
      audio.play();
    },
    playAttackLaunch() {
      if (!this.soundEffects) return;
      const audio = new Audio(this.calculateAudio("attack_launch.mp3"));
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
    navHome() {
      this.playSelect();
      this.router.push({ path: "/" });
    },
    navHistory() {
      this.playSelect();
      this.router.push({ path: "History" });
    },
    navSettings() {
      this.playSelect();
      this.router.push({ path: "settings" });
    },
    navAbout() {
      this.playSelect();
      this.router.push({ path: "about" });
    },
    navHelp() {
      this.playSelect();
      this.router.push({ path: "help" });
    },
    navMap() {
      this.playSelect();
      this.router.push({ path: "map" });
    },
    navMenu() {
      this.playSelect();
      this.router.push({ path: "menu" });
    },
    
  },
});
