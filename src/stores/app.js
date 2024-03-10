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
    router: {},
    audio: null,
    playing: false,
    applyFightAnimation:false,
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    setLocale(locale) {
      this.locale = locale;
    },
    setVolume(newValue) {
      this.musicVolume = newValue;
      if (this.audio) {
        this.audio.volume = this.musicVolume;       
      }
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
          mapStore.resetState();
          break;
        case "History":
          mapStore.resetState();
          break;
        case "Map":
          fightStore.resetState();
          break;
        case "Menu":
          break;
        case "Fight":
          this.applyFightAnimation = false;
          break;
        case "EndFight":
          break;
        case "EndGame":
          mapStore.resetState();
          break;
        default:
          break;
      }
    },
    /**Play sound effects */
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
    calculateMusic(fileName) {
      return `/ff7vue/music/${fileName}`;
    },
    /**Navigation actions */
    navHome() {
      this.playSelect();
      this.playBackgroundAudio("root");
      this.router.push({ name: "root", params: { param: "home" } });
    },
    navHistory() {
      this.playSelect();
      this.playBackgroundAudio("history");
      this.router.push({ name: "history", params: { param: "root" } });
    },
    navSettings() {
      this.playSelect();
      this.playBackgroundAudio("settings");
      this.router.push({ name: "settings", params: { param: "settings" } });
    },
    navAbout() {
      this.playSelect();
      this.playBackgroundAudio("about");
      this.router.push({ name: "about", params: { param: "about" } });
    },
    navHelp() {
      this.playSelect();
      this.playBackgroundAudio("help");
      this.router.push({ name: "help", params: { param: "help" } });
    },
    navMap() {
      this.playSelect();
      this.playBackgroundAudio("map");
      this.router.push({ name: "map", params: { param: "map" } });
    },
    navMenu() {
      this.playSelect();
      this.router.push({ name: "menu", params: { param: "menu" } });
    },
    navEndFight() {
      this.playBackgroundAudio("endfight");
      this.router.push({ name: "endfight", params: { param: "endfight" } });
    },
    navEndGame() {
      this.playBackgroundAudio("endgame");
      this.router.push({ name: "endgame", params: { param: "endgame" } });
    },
    navFight() {
      this.applyFightAnimation = true;
      this.playBackgroundAudio("fight");
      this.router.push({ name: "fight", params: { param: "fight" } });
    },
    async playBackgroundAudio(name) {
      try {
        if (this.audio) {
          this.audio.pause();
          await new Promise(resolve => this.audio.onpause = resolve);
        }
        this.audio = new Audio(this.calculateMusic(`${name}.mp3`));        
        this.audio.volume = this.musicVolume;
        this.audio.play();
        this.playing = true;
      } catch (error) {
        console.error(error);
      }
    },    
  }
});
