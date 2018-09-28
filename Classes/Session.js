/**
 Projet 2, Labyrinthe de Pan
 Session.js
 Samuel Yvon
 Avril-Mai 2016
 */

var Session = function (objgl) {
    this.level = 1;
    this.objgl = objgl;
    this.timeLeft = Config.GAME.LEVEL_TIME;
    this.gameStartTimestamp = new Date();
    this.birdViewTimestamp = null;
    this.isGameRunning = true;
    this.birdView = false;
    this.arrowCount = this.calculateArrowCount(1);
    this.trCount = this.calculateTrCount(1);
    this.tpCount = this.calculateTpCount(1);
    this.score = Config.GAME.INITIAL_SCORE;
    this.complementaryObjects = [];

};

Session.prototype.calculateArrowCount = function(level) {
    return (2 * Config.GAME.MAX_LEVEL) - 2 * (level);
};

Session.prototype.calculateTpCount = function(level) {
    return (Math.floor(level/2));
};

Session.prototype.calculateTrCount = function(level) {
    return (level-1);
};

Session.prototype.update = function () {

    //Calcul du temps restant
    var now = new Date();
    var diff = now.getTime() - this.gameStartTimestamp.getTime();
    this.timeLeft = Math.max(0, Config.GAME.LEVEL_TIME - (Math.round(diff / 1000)));

    //Update des champs physiques
    o('tdLevel', this.level);
    o('tdTimeLeft', this.timeLeft);
    o('tdScore', this.score);

    if (this.timeLeft <= 0 && !Config.DEBUG.NO_TIMEOUT) {
        this.updateScore(-200);
        son.roundend();
        this.endGame();
    }

    if (this.birdViewTimestamp != null) {
        var bvDiff = now.getTime() - this.birdViewTimestamp.getTime()
        if (bvDiff / 1000 >= 1) {
            this.updateScore(-10);
            this.birdViewTimestamp = new Date();
        }
    }
}

Session.prototype.tresorDetecter = function () {
    this.level = this.level + 1;
    this.updateScore(1000 + 10 * this.timeLeft);
    this.arrowCount = this.calculateArrowCount(this.level);
    this.tpCount = this.calculateTpCount(this.level);
    this.trCount = this.calculateTrCount(this.level);
    this.generateComplementaryObjects();
    if(this.level <= 10) {
        son.tresor();
        this.endGame();
    } else {
        this.level = 10;
        son.demontalk();
        alert('Partie termin&eacute;e! Recharger pour recommencer! Vous avez un score de: '+this.score);
    }
};

Session.prototype.endGame = function () {
    this.isGameRunning = false;
    arreterAnimation();
    this.startGame();
};

Session.prototype.startGame = function () {
    this.restartGameTime();
    this.isGameRunning = true;
    if(this.birdView) {
        this.toggleBirdView(false)
    }
    demarrer();
};

Session.prototype.restartGameTime = function() {
    this.timeLeft = Config.GAME.LEVEL_TIME;
    this.gameStartTimestamp = new Date();
};

Session.prototype.toggleBirdView = function (binValue) {
    if (binValue && !Config.DEBUG.DISABLE_BIRDVIEW_SCORE_HIT) {
        this.birdViewTimestamp = new Date();
    } else {
        this.birdViewTimestamp = null;
    }
    session.birdView = binValue;
    bousolle.binVisible = binValue;
    plafond.binVisible = !binValue;
    for (var i = this.complementaryObjects.length - 1; i >= 0; i--) {
        this.complementaryObjects[i].binVisible = !binValue;
    }
};

Session.prototype.toggleCheating = function () {
    if (this.birdView) {
        log('---Cheating Mode---');
        for (var i = this.complementaryObjects.length - 1; i >= 0; i--) {
            this.complementaryObjects[i].binVisible = !this.complementaryObjects[i].binVisible
        }
    }
};

Session.prototype.detonateBomb = function () {
    this.updateScore(-100);
    son.bomb1()
};

Session.prototype.updateScore = function (amount) {
    this.score = Math.max(this.score + amount, 0)
};

Session.prototype.generateComplementaryObjects = function () {

    //reset des tableaux
    this.complementaryObjects = [];
    tabTelep = [];
    tabTeler = [];
    sortedArrowMap = new HitboxTree(Config.GAME.GAME_WIDTH,Config.GAME.GAME_DEPTH);

    var tiles = Config.MAP.TILES.slice();

    var arrowCount = this.arrowCount;
    var tpCount = this.tpCount;
    var trCount = this.trCount;

    var rndTresor = Math.floor((Math.random() * 27 * 31));
    while (tiles[rndTresor] != 0) {
        rndTresor = Math.floor((Math.random() * 27 * 31));
    }
    tiles[rndTresor] = 3;

    var intCount = 0;
    for (var u = 0; u < 31; u++) {
        for (var i = 0; i < 27; i++) {
            if (rndTresor == intCount) {
                tresor = new Tresor(this.objgl);
                setPositionsXYZ([i * Config.WALL.WALL_DEPTH + 0.5 * Config.WALL.WALL_DEPTH,3, u * Config.WALL.WALL_DEPTH + Config.WALL.WALL_DEPTH * 0.5], tresor.transformations)
                this.complementaryObjects.push(tresor);
                pentagrame = new Pentagramme(this.objgl);
                setPositionsXYZ([i * Config.WALL.WALL_DEPTH + 0.5 * Config.WALL.WALL_DEPTH,0.001, u * Config.WALL.WALL_DEPTH + Config.WALL.WALL_DEPTH * 0.5], pentagrame.transformations)
                this.complementaryObjects.push(pentagrame)
            }
            intCount++;
        }
    }

    for (var a = 0; a < arrowCount; a++) {
        var rndArrow = Math.floor((Math.random() * 27 * 31));
        while (tiles[rndArrow] != 0) {
            rndArrow = Math.floor(Math.random() * 27 * 31)
        }
        tiles[rndArrow] = 4;
        intCount = 0;
        for (var u = 0; u < 31; u++) {
            for (var i = 0; i < 27; i++) {
                if (rndArrow == intCount) {
                    var pointeur = new Pointeur(this.objgl, [i * Config.WALL.WALL_DEPTH + 0.5 * Config.WALL.WALL_DEPTH,-0.4, u * Config.WALL.WALL_DEPTH + Config.WALL.WALL_DEPTH * 0.5])
                    this.complementaryObjects.push(pointeur)
                    sortedArrowMap.root.insert(pointeur.hitbox)
                }
                intCount++;
            }
        }
    }

    for (var a = 0; a < tpCount; a++) {
        var rndTpCount = Math.floor((Math.random() * 27 * 31));
        while (tiles[rndTpCount] != 0) {
            rndTpCount = Math.floor(Math.random() * 27 * 31)
        }
        tiles[rndTpCount] = 5;
        intCount = 0;
        for (var u = 0; u < 31; u++) {
            for (var i = 0; i < 27; i++) {
                if (rndTpCount == intCount) {
                    var teleporteur = new Teleporteur(this.objgl, [i * Config.WALL.WALL_DEPTH + 0.5 * Config.WALL.WALL_DEPTH,-0.4, u * Config.WALL.WALL_DEPTH + Config.WALL.WALL_DEPTH * 0.5])
                    this.complementaryObjects.push(teleporteur);
                    tabTelep.push(teleporteur);
                    if(tiles[intCount-1]==1 || tiles[intCount+1]==1) {
                        setAngleY(0,teleporteur.transformations)
                    } else {
                        setAngleY(90,teleporteur.transformations)
                    }
                }
                intCount++;
            }
        }
    }
    
    for (var a = 0; a < trCount; a++) {
        var rndTrCount = Math.floor((Math.random() * 27 * 31));
        while (tiles[rndTrCount] != 0) {
            rndTrCount = Math.floor(Math.random() * 27 * 31);
        }
        tiles[rndTrCount] = 6
        intCount = 0;
        for (var u = 0; u < 31; u++) {
            for (var i = 0; i < 27; i++) {
                if (rndTrCount == intCount) {
                    var telerecepteur = new Telerecepteur(this.objgl, [i * Config.WALL.WALL_DEPTH + 0.5 * Config.WALL.WALL_DEPTH,-0.4, u * Config.WALL.WALL_DEPTH + Config.WALL.WALL_DEPTH * 0.5])
                    this.complementaryObjects.push(telerecepteur);
                    tabTeler.push(telerecepteur);
                }
                intCount++;
            }
        }
    }
};


function log(text) {
    if (Config.DEBUG.ALLOW_LOGGING) {
        console.log(text)
    }
}
