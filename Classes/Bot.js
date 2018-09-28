/*
Classe Bot
Fait fonctionner le Bot
Samuel Yvon
Mai 2016
 */

var Bot = function (objgl) {

    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = creerTransformations();
    this.hitbox = new Hitbox(this, 0.5);
    this.texels = this.creerTexels();

    var x = 3
    var y = 3
    //---------------------Est normalement 'Z'
    setPositionsXYZ([x, 0, y], this.transformations);



    this.closed = false;
    this.binUpdate = 5
};


Bot.prototype.update = function() {

    if(this.binUpdate >=5) {
        var target = personnage.transformations

        var tX = getPositionX(target)
        var tZ = getPositionZ(target)

        var pX = getPositionX(this.transformations)
        var pZ = getPositionZ(this.transformations)

        var fltXPrime = 0
        var fltZPrime = 0

        if(tX != pX && tZ != pZ) {
            fltXPrime = ((tX-2) - pX) / 50;
            fltZPrime = ((tZ-2) - pZ) / 50;
            //log(fltXPrime +" "+ fltZPrime)
            this.step(fltXPrime,fltZPrime)
        }

        
        var result = this.checkCollisions();
        var canMove = !result.collision;
        var qtt = result.wallCount;

        if (!canMove && !Config.DEBUG.NO_CLIP) {
            var walls = result.walls;
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
            if (qtt != 3) {
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

    this.binUpdate = this.binUpdate + 1;
    

    if(this.binUpdate > 5) {
        this.binUpdate = 0
    }

};

Bot.prototype.creerTexels = function () {

    var objTexelsMurs = objgl.createBuffer();

    tabTexels = [  // Texels de la face avant
       1*5,6*5,
       0,6*5,
       1*5,6*5,
       0,6*5,

       1*5,0,
       0,0,
       1*5,0,
       0,0
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objTexelsMurs.intNbElems = tabTexels.length;
    objTexelsMurs.intTailleElem = 2;
    objTexelsMurs.intNoTexture = TEX_PORTE;
    objTexelsMurs.pcCouleurTexel = 1.00;

    return objTexelsMurs;
};

Bot.prototype.close = function () {

    if(getPositionY(this.transformations) < 0) {
        this.closing = true;
        var newPosition = (getPositionY(this.transformations) - Config.DOOR.SPEED)
        if (newPosition > 0) {
            newPosition = 0;
            this.closed = true;
        }
        setPositionY(newPosition, this.transformations);
    }
};


Bot.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();

    var tabVertex = [
        0.5, 0.0, 0.5, //0: TOP RIGHT BOTTOM
        -0.5, 0.0, 0.5, //1: TOP LEFT BOTTOM
        -0.5, 0.0, -0.5, //2: BOTTOM LEFT BOTTOM
        0.5, 0.0, -0.5, //3: BOTTOM RIGHT BOTTOM

        0.5, 1, 0.5, //4: TOP RIGHT TOP
        -0.5, 1, 0.5, //5: TOP LEFT TOP
        -0.5, 1, -0.5, //6: BOTTOM LEFT TOP
        0.5, 1, -0.5 //7: BOTTOM RIGHT TOP
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length / 3;
    objVertex.intTailleElem = 3;
    return objVertex;
};


Bot.prototype.creerCouleurs = function (objgl) {
    var objCouleurs = objgl.createBuffer();

    var tabCouleurs = [];
    for (var i = this.vertex.intNbElems; i >= 0; i--) {
        tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0])
    }
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = this.vertex.intNbElems;
    objCouleurs.intTailleElem = 4;

    return objCouleurs;
};

Bot.prototype.creerMaillage = function (objgl) {
    var objMaillage = objgl.createBuffer();

    var tabMaillageVertex = [
        4, 1, 0,
        4, 1, 5,
        5, 2, 1,
        5, 2, 6,
        6, 3, 2,
        6, 3, 7,
        7, 0, 3,
        7, 0, 4,
        5, 7, 6,
        5, 7, 4
    ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    objMaillage.intNbElemsDroites = 0;
    return objMaillage;
};


Bot.prototype.checkCollisions = function () {

    var hitboxPersonnage = this.hitbox;
    var binWallCollision = false;
    var collidingWalls = [];
    var count = 0;

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

    return {collision: binWallCollision, walls: collidingWalls, wallCount: count};
};

Bot.prototype.getAngleWithObject = function (object) {

    var deltaX = getPositionX(object.transformations) - getPositionX(this.transformations);
    var deltaZ = getPositionZ(object.transformations) - getPositionZ(this.transformations);

    return (180 / Math.PI) * Math.atan2(deltaX, deltaZ);
};


Bot.prototype.step = function (xPrime, zPrime) {

    setPositionX(getPositionX(this.transformations) + xPrime, this.transformations);
    setPositionZ(getPositionZ(this.transformations) + zPrime, this.transformations);

    //Faire tourner le crâne
    //setAngleY(tresor.getAngleWithObject(this), tresor.transformations)
};