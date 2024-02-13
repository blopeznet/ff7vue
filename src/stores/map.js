import { defineStore } from 'pinia'

const initialState = {
    map_Left: 75,
    map_Top: 203,
    map_zIndex: 4,
    map_src: "./images/stop_down.gif",
    moveDistance: 5,
    fightFrecuencyMs: 20000,
};

/**
 * Store map
 */
export const useMapStore = defineStore({
    id: 'map',
    state: () => ({
        map_Left: 75,
        map_Top: 203,
        map_zIndex: 4,
        map_src: "./images/stop_down.gif",
        moveDistance: 5,
        fightFrecuencyMs: 20000,
    }),
    actions: {
        moveUp() {
            if (this.checkCoords()) {
                this.map_src = "./images/go_up.gif";
                this.map_Top -= this.moveDistance;
            }
        },
        stopUp() {
            this.map_src = "./images/stop_up.gif";
        },

        moveDown() {
            if (this.checkCoords()) {
                this.map_src = "./images/go_down.gif";
                this.map_Top += this.moveDistance;
            }
        },
        stopDown() {
            this.map_src = "./images/stop_down.gif";
        },
        moveLeft() {
            if (this.checkCoords()) {
                this.map_src = "./images/go_left.gif";
                this.map_Left -= this.moveDistance;
            }
        },
        stopLeft() {
            this.map_src = "./images/stop_left.gif";
        },
        moveRight() {
            if (this.checkCoords()) {
                this.map_src = "./images/go_right.gif";
                this.map_Left += this.moveDistance;
            }
        },
        stopRight() {
            this.map_src = "./images/stop_right.gif";
        },
        checkCoords() {

            if (this.map_Left < 75) {
                this.map_Left = 75;
                return false;
            }

            if (this.map_Left > 600) {
                this.map_Left = 600;
                return false;

            }

            if (this.map_Top < 80) {
                this.map_Top = 80;
                return false;

            }

            if (this.map_Top > 400) {
                this.map_Top = 400;
                return false;

            }

            return true;
        },
        checkClick(map_Left,map_Top) {

            if (map_Left < 75) {
                return false;
            }

            if (map_Left > 600) {
                return false;

            }

            if (map_Top < 80) {
                return false;

            }

            if (map_Top > 400) {
                map_Top = 400;
                return false;

            }

            return true;
        },
        resetState() {
            Object.assign(this.$state, initialState);
        },
    }
})