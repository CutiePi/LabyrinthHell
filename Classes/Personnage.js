/**
 Classe pour le personnage
 */

var Personnage = function () {
    this.camera = creerCamera();
    setPositionsCameraXYZ([27, 1, 33], this.camera);
    setCiblesCameraXYZ([27, 0, 0], this.camera);
    setOrientationsXYZ([0, 1, 0], this.camera);
    this.transformations = creerTransformations();
    setPositionsXYZ(getPositionsCameraXYZ(this.camera), this.transformations);
    this.hitbox = new Hitbox(this, Config.CHARACTER.WIDTH);
    this.walkingCooldown = Config.CHARACTER.WALKING_COOLDOWN;
    this.walking = false;
    this.walkingTime = null;
    this.bombCount = (Config.GAME.MAX_LEVEL / 2) - Math.round((session.level) / 2)
    this.stepCount = 0;
    son.spawn()
};

Personnage.prototype.update = function () {

    if (this.walking) {
        son.scarybreathingStop();
        this.walkingCooldown = Math.max(0, this.walkingCooldown - 1);
        if (this.walkingCooldown == 0) {
            this.walking = false;
            this.walkingTime = null;
            this.wobbleTimeStart = new Date()
            son.scarybreathing();
            this.walkingCooldown = Config.CHARACTER.WALKING_COOLDOWN;
        }
    } else {
        if((this.wobbleTimeStart != null) && (((new Date()).getTime() - this.wobbleTimeStart.getTime()) <= 18000)) {
            setPositionCameraY(Math.max((0.015-(((new Date()).getTime() - this.wobbleTimeStart.getTime())/1500000)),0)*(Math.sin((new Date().getTime()) / 100)) + 1, this.camera);
        } else {
            this.wobbleTimeStart = null;
        }
    }
    o("tdBombes", this.bombCount)
};


Personnage.prototype.move = function (touche) {

    var camera = objScene3D.camera;

    if (!session.birdView || Config.DEBUG.ENABLE_MOUVEMENT_IN_BIRDVIEW) {
        if (touche == 37 || touche == 39) {
            // 37:  Flèche-à-gauche; 39:Flèche-à-droite
            var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
            var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
            var intDirection = (touche == 37) ? -1 : 1;
            var fltAngle = intDirection * Config.CAMERA.TURN_ANGLE; // Tourner 2 degrés
            var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
            var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
            setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
            setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
            setAngleY(personnage.getLookingAngle(), bousolle.transformations);

        } else if (touche == 38 || touche == 40) {
            // 38:  Flèche-en-haut; 40:Flèche-en-bas
            var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
            var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
            var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
            var intDirection = (touche == 38) ? 1 : -1;

            var fltXPrime = intDirection * Config.CAMERA.SPEED * Math.cos(Math.acos(fltX / fltRayon));
            var fltZPrime = intDirection * Config.CAMERA.SPEED * Math.sin(Math.asin(fltZ / fltRayon));

            this.step(fltXPrime, fltZPrime);

            var result = this.checkCollisions();
            var canMove = !result.collision;
            var vAngle = this.getLookingAngle();
            var qtt = result.wallCount;


            if (!Config.DEBUG.DISABLE_BOBBING && canMove) {

                var cleanAngle = vAngle;
                if(cleanAngle < 0) {
                    cleanAngle = 360 + cleanAngle
                }

                if ((cleanAngle > 45 && cleanAngle < 135) || (cleanAngle > 225 && cleanAngle < 315)) {
                    setPositionCameraZ(0.010 * (Math.sin((new Date().getTime()) / 150)) + getPositionCameraZ(this.camera), this.camera);
                } else {
                    setPositionCameraX(0.010 * (Math.sin((new Date().getTime()) / 150)) + getPositionCameraX(this.camera), this.camera);
                }
            }


            if (!canMove && !Config.DEBUG.NO_CLIP) {
                var walls = result.walls;
                var invisibleWallCount = result.invisibleCNT
                var angle = 0;
                for (var i = walls.length - 1; i >= 0; i--) {
                    var raw = this.getAngleWithObject(walls[i]);
                    if (raw < 0) {
                        raw = 360 + raw
                    }
                    angle = angle + raw;
                }
                angle = (angle / walls.length);
                this.step(-(fltXPrime), -(fltZPrime));
                var offset = Config.WALL.WALL_DEPTH / 2 + Config.CHARACTER.WIDTH / 2;

                //Collision sur l'axe horizontal
                if (qtt < 3 || invisibleWallCount > 1) {
                    if (((angle > 135 && angle < 225) || (angle < 45 || angle > 315))) {
                        var diff = getPositionZ(this.transformations) - getPositionZ(walls[0].transformations);
                        var doubleDiff = 0;
                        if (diff < 0) {
                            doubleDiff = -(offset - Math.abs(diff))
                        } else {
                            doubleDiff = offset - diff
                        }
                        this.step(fltXPrime, doubleDiff);
                    } //Collision sur l'axe vertical
                    else if (((angle > 45 && angle < 135) || (angle > 225 && angle < 315))) {
                        var diff = getPositionX(this.transformations) - getPositionX(walls[0].transformations);
                        var doubleDiff = 0;
                        if (diff < 0) {
                            doubleDiff = -(offset - Math.abs(diff))
                        } else {
                            doubleDiff = offset - diff
                        }
                        this.step(doubleDiff, fltZPrime);
                    }
                }
            }
        }
    }

};

Personnage.prototype.step = function (xPrime, zPrime) {
    if(this.stepCount == 0) {
        son.step();
    }

    this.stepCount ++;
    if(this.stepCount == 4) {
        this.stepCount = 0;
    }

    this.walking = true;
    setCibleCameraX(getCibleCameraX(this.camera) + xPrime, this.camera);
    setCibleCameraZ(getCibleCameraZ(this.camera) + zPrime, this.camera);
    setPositionCameraX(getPositionCameraX(this.camera) + xPrime, this.camera);
    setPositionCameraZ(getPositionCameraZ(this.camera) + zPrime, this.camera);
    setPositionsXYZ(getPositionsCameraXYZ(this.camera), this.transformations);
    if (null == this.walkingTime) {
        this.walkingTime = new Date()
    }
    //Faire tourner le crâne
    setAngleY(tresor.getAngleWithObject(this), tresor.transformations)

};

Personnage.prototype.teleport = function () {
    son.teleport();
    var teleportation = Math.floor(Math.random() * (tabTeler.length));
    var ancienneCoords = getPositionsCameraXYZ(this.camera);
    var ancienneCible = getCiblesCameraXYZ(this.camera);
    tabTemp = getPositionsXYZ(tabTeler[teleportation].transformations);
    tabTemp[1] = tabTemp[1] + 1.6; // Fix le problème de hauteur
    setPositionsCameraXYZ(tabTemp, this.camera);
    setPositionsXYZ(tabTemp,this.transformations);
    setCiblesCameraXYZ([ancienneCible[0] + (tabTemp[0] - ancienneCoords[0]),
        ancienneCible[1] + (tabTemp[1] - ancienneCoords[1]),
        ancienneCible[2] + (tabTemp[2] - ancienneCoords[2])
    ], this.camera)
};


Personnage.prototype.checkCollisions = function () {

    var hitboxPersonnage = this.hitbox;
    var binWallCollision = false;
    var collidingWalls = [];
    var count = 0;

    for (var i = tabTelep.length - 1; i >= 0; i--) {
        var teleporteur = tabTelep[i];
        if (hitboxPersonnage.checkCollision(teleporteur.hitbox)) {
            this.teleport();
            break;
        }
    }

    var candidates = sortedHBMap.getCandidates(hitboxPersonnage);

    for (var i = candidates.length - 1; i >= 0; i--) {
        var candidate = candidates[i]
        if (hitboxPersonnage.checkCollision(candidate)) {
            if (candidate.parent.binVisible) {
                binWallCollision = true;
                collidingWalls.push(candidate.parent);
            }
            count++
        }
    }

    if (porte.closing || porte.closed) {
        if (hitboxPersonnage.checkCollision(porte.hitbox)) {
            binWallCollision = true;
            collidingWalls.push(porte);
            count++
        }
    }

    if (hitboxPersonnage.checkCollision(tresor.hitbox)) {
        session.tresorDetecter()
    }

    candidates = sortedArrowMap.getCandidates(hitboxPersonnage);
    for (var i = candidates.length - 1; i >= 0; i--) {
        var candidate = candidates[i]
        if (hitboxPersonnage.checkCollision(candidate)) {
            son.arrow()
        }
    }

    return {collision: binWallCollision, walls: collidingWalls, wallCount: count, invisibleCNT: (count-collidingWalls.length)};
};


Personnage.prototype.getLookingAngle = function () {

    var deltaX = getCibleCameraX(this.camera) - getPositionCameraX(this.camera);
    var deltaZ = getCibleCameraZ(this.camera) - getPositionCameraZ(this.camera);

    return (180 / Math.PI) * Math.atan2(deltaX, deltaZ);
};


Personnage.prototype.getAngleWithObject = function (object) {

    var deltaX = getPositionX(object.transformations) - getPositionCameraX(this.camera);
    var deltaZ = getPositionZ(object.transformations) - getPositionCameraZ(this.camera);

    return (180 / Math.PI) * Math.atan2(deltaX, deltaZ);
};


Personnage.prototype.activateBomb = function () {

    if (this.bombCount >= 1 || Config.DEBUG.UNLIMITED_BOMBS) {
        session.detonateBomb();

        var positionEnAvantSansCible = getPositionsCameraXYZ(this.camera);

        var fltX = getCibleCameraX(this.camera) - getPositionCameraX(this.camera);
        var fltZ = getCibleCameraZ(this.camera) - getPositionCameraZ(this.camera);
        var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

        var fltXPrime = 1.2 * Math.cos(Math.acos(fltX / fltRayon));
        var fltZPrime = 1.2 * Math.sin(Math.asin(fltZ / fltRayon));

        positionEnAvantSansCible[0] = positionEnAvantSansCible[0] + fltXPrime
        positionEnAvantSansCible[2] = positionEnAvantSansCible[2] + fltZPrime

        var fakeObject = new Object()
        fakeObject.transformations = creerTransformations();
        setPositionsXYZ(positionEnAvantSansCible, fakeObject.transformations);

        var hitbox = new Hitbox(fakeObject, 1);

        if (Config.DEBUG.SHOW_BOMB_HITBOXES) {
            objScene3D.tabObjets3D.push(hitbox)
        }
        var candidates = sortedHBMap.getCandidates(hitbox)
        for (var i = candidates.length - 1; i >= 0; i--) {
            var mur = candidates[i].parent;
            if (hitbox.checkCollision(mur.hitbox) && mur.binVisible && mur.destructible) {
                mur.binVisible = false
                break;
            }
        }
        this.bombCount--;
    }
};