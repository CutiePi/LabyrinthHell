/*
 Fichier de configuration du jeu de labyrinthe
 Samuel Yvon
 Gabriel Roy
 Jasmin Lapointe
 Avril-Mai 2016
 */

var Console = console;

var Config = {

    Version: "0.0.1.8",
    //Debug: Tout a false lors du vrai jeu
    DEBUG: {
        SHOW_HITBOXES: false,//Affiche les boites de collisions
        NO_TIMEOUT: false,//Empeche le temps de faire que la partie se termine
        MUTE_SOUND: false,//Enleve le son
        DISABLE_BOBBING: false, //Laisser sa a true... sa glitch un peu
        ENABLE_MOUVEMENT_IN_BIRDVIEW: false,//Permet de bouger en mode vue d'oiseau
        ALLOW_LOGGING: false,//Permet faire des output dans la console (avec la fonction log)
        NO_CLIP: false,//Permet de passer au travers les murs
        DISABLE_BIRDVIEW_SCORE_HIT: false,//Permet de rester en mode d'oiseau indéfiniment
        SHOW_BOMB_HITBOXES: false,//Permet de montrer les hitbox des bombes
        ENABLE_MOUSE_LATERAL_VIEW: false,//Activer la sourie pour changer l'angle
        ENABLE_THIRD_DIVISION_ROUND_IN_HITBOX_MAP: false,//Active une troisième génération du tree de hitobox (EXPERIMENTAL)
        ALLOW_BOT: false,//Active le bbot
        UNLIMITED_BOMBS: false//Bombes illimitées
    },  

    CANVAS: {
        HEIGHT: 720,
        WIDTH: 1280
    },

    CAMERA: {
        HEIGHT: 0,
        BIRD_HEIGHT: 60,
        TURN_ANGLE: (Math.PI / 180) * 2.2,
        SPEED: 0.09
    },

    GAME: {
        CEILING_HEIGHT: 6,
        GAME_WIDTH: 54,
        GAME_DEPTH: 62,
        LEVEL_TIME: 60,
        MAX_LEVEL: 10,
        INITIAL_SCORE: 1000
    },

    MAP: {
        TILES: [
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2,
            2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2,
            2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2,
            2, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2,
            2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 2,
            2, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 2,
            2, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 2, 2, 9, 2, 2, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 2, 9, 9, 9, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 9, 9, 9, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2,
            2, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 2, 9, 9, 9, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2,
            2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2,
            2, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 2,
            2, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2,
            2, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 2,
            2, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 2,
            2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
        ]
    },

    CHARACTER: {
        WALKING_COOLDOWN: 10,
        WIDTH: 0.5
    },

    WALL: {
        WALL_DEPTH: 2
    },

    TREASURE: {
        WIDTH: 1
    },
    DOOR: {
        HITBOX_SIZE: 8,
        SPEED: -0.05
    },
    HOMEAABB: {
        WIDTH: 10
    }
};
