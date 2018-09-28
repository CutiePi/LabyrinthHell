/*
 Classe son par Samuel Yvon, Gabriel Roy et Jasmin Lapointe
 Projet 2
 Février-Mai 2016
*/
var Son = function () {
    this.arrowAudio = new Audio('Sounds/ARROW_SOUND.m4a');
    this.soundtrackAudio = new Audio('Sounds/BACKGROUND_TRACK.mp3');
    this.bomb1Audio = new Audio('Sounds/BOMB1_SOUND.wav');
    this.bomb2Audio = new Audio('Sounds/BOMB2_SOUND.wav');
    this.bomb3Audio = new Audio('Sounds/BOMB3_SOUND.wav');
    this.demonscreamAudio = new Audio('Sounds/DEMONSCREAM_SOUND.wav');
    this.demontalkAudio = new Audio('Sounds/DEMONTALK_SOUND.wav');
    this.spawnAudio = new Audio('Sounds/SPAWN_SOUND.wav');
    this.spawn2Audio = new Audio('Sounds/SPAWN2_SOUND.wav');
    this.stepAudio = new Audio('Sounds/STEP_SOUND.wav');
    this.teleportAudio = new Audio('Sounds/TELEPORT_SOUND.wav');
    this.breathingAudio = new Audio('Sounds/BREATHING1_SOUND.wav');
    this.breathingCreepyAudio = new Audio('Sounds/SCARYBREATHING_SOUND.wav');
    this.tresorAudio = new Audio('Sounds/TRESOR_SOUND.wav');
    this.roundendAudio = new Audio('Sounds/ROUNDEND_SOUND.mp3');
}

Son.prototype.arrow = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.soundtrack.volume = 1.0;
        this.arrowAudio.play()
    }
}

Son.prototype.soundtrack = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.soundtrackAudio.volume = 0.2;
        this.soundtrackAudio.loop = true;
        this.soundtrackAudio.play()
    }
}

Son.prototype.bomb1 = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.bomb1Audio.volume = 1.0;
        this.bomb1Audio.play()
    }
}
Son.prototype.bomb2 = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.bomb2Audio.volume = 1.0;
        this.bomb2Audio.play()
    }
}
Son.prototype.bomb3 = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.bomb3Audio.volume = 1.0;
        this.bomb3Audio.play()
    }
}
Son.prototype.demonscream = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.demonscreamAudio.volume = 1.0;
        this.demonscreamAudio.play()
    }
}

Son.prototype.demontalk = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.demontalkAudio.volume = 1.0;
        this.demontalkAudio.play()
    }
}
Son.prototype.spawn = function () {
    if (!Config.DEBUG.MUTE_SOUND) {
        this.spawnAudio.volume = 1.0;
        this.spawnAudio.play()
    }
}
Son.prototype.spawn2 = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.spawn2Audio.volume = 1.0;
        this.spawn2Audio.play()
  }
}

Son.prototype.step = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.stepAudio.volume = 1.0;
        this.stepAudio.play()
  }
}

Son.prototype.teleport = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.teleportAudio.volume = 1.0;
        this.teleportAudio.play()
  }
}

Son.prototype.breathing = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.breathingAudio.volume = 0.8;
        this.breathingAudio.play()
  }
}

Son.prototype.scarybreathing = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.breathingCreepyAudio.volume = 0.8;
        this.breathingCreepyAudio.play()
  }
}

Son.prototype.scarybreathingStop = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.breathingCreepyAudio.pause();
    this.breathingCreepyAudio.currentTime = 0;
  }
}

Son.prototype.tresor = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.tresorAudio.volume = 1.0;
      this.tresorAudio.play()
  }
}

Son.prototype.roundend = function () {
  if(!Config.DEBUG.MUTE_SOUND) {
      this.roundendAudio.volume = 1.0;
      this.roundendAudio.play()
  }
}

/*
 Son.prototype.defuse = function () {
 if (!DEBUG_MUTE_SOUNDsS) {         Utiliser la config!!
 this.defuseAudio.volume = Math.min(SOUNDs_VOLUME, SOUNDs_DEFUSE_VOLUME)
 this.defuseAudio.play();
 }
 }
 */