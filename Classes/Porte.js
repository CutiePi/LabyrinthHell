/*
 Classe Mur (section de 1x1)
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */

var Porte = function (objgl) {

    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = creerTransformations();
    this.hitbox = new Hitbox(this, Config.WALL.WALL_DEPTH);
    this.texels = this.creerTexels()
    setPositionsXYZ([27, -6, 27], this.transformations);
    this.closed = false;
}

Porte.prototype.creerTexels = function () {

    var objTexelsMurs = objgl.createBuffer();

    tabTexels = [
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

Porte.prototype.close = function () {

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


Porte.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();

    var tabVertex = [
        1, 0.0, 1, //0: TOP RIGHT BOTTOM
        -1, 0.0, 1, //1: TOP LEFT BOTTOM
        -1, 0.0, -1, //2: BOTTOM LEFT BOTTOM
        1, 0.0, -1, //3: BOTTOM RIGHT BOTTOM

        1, Config.GAME.CEILING_HEIGHT, 1, //4: TOP RIGHT TOP
        -1, Config.GAME.CEILING_HEIGHT, 1, //5: TOP LEFT TOP
        -1, Config.GAME.CEILING_HEIGHT, -1, //6: BOTTOM LEFT TOP
        1, Config.GAME.CEILING_HEIGHT, -1 //7: BOTTOM RIGHT TOP
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length / 3;
    objVertex.intTailleElem = 3;
    return objVertex;
};


Porte.prototype.creerCouleurs = function (objgl) {
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

Porte.prototype.creerMaillage = function (objgl) {
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
