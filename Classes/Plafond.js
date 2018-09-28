/*
 Classe plafond
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */
var Plafond = function (objgl) {
    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = null;
    this.transformations = creerTransformations();
    this.binVisible = true;
    this.texels = this.creerTexels();
    setPositionsXYZ([0, 0, 0], this.transformations)
}


Plafond.prototype.creerVertex = function () {
    var tabVertex = [];

    // Face avant pleine
    tabVertex[0] = [
        0.0, Config.GAME.CEILING_HEIGHT, 0.0,
        Config.GAME.GAME_WIDTH, Config.GAME.CEILING_HEIGHT, 0.0,
        Config.GAME.GAME_WIDTH, Config.GAME.CEILING_HEIGHT, Config.GAME.GAME_DEPTH,
        0.0, Config.GAME.CEILING_HEIGHT, Config.GAME.GAME_DEPTH
    ];

    // Création des tampons
    var tabObjPyramide = [];
    for (var i = 0; i < 1; i++) {
        tabObjPyramide[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjPyramide[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjPyramide[i].intNbElems = tabVertex[i].length / 3;
        tabObjPyramide[i].intTailleElem = 3;
        tabObjPyramide[i].typeDessin = objgl.TRIANGLE_FAN
    }

    return tabObjPyramide;
};


Plafond.prototype.creerCouleurs = function () {
    var tabCouleurs = new Array();
    tabCouleurs[0] = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs[0] = tabCouleurs[0].concat([0.0, 1.0, 1.0, 1.0]);
    // Création des tampons
    var tabCouleursPlancher = new Array();
    for (var i = 0; i < 1; i++) {
        tabCouleursPlancher[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabCouleursPlancher[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);

        tabCouleursPlancher[i].intNbElems = tabCouleurs[i].length / 4;
        tabCouleursPlancher[i].intTailleElem = 4;

    }
    return tabCouleursPlancher;
};

Plafond.prototype.update = function() {
    //setPositionY(0.001 * (Math.sin((new Date().getTime()) / 1000)) + getPositionY(this.transformations), this.transformations);
    setPositionX(0.002 * (Math.sin((new Date().getTime()) / 1000)) + getPositionX(this.transformations), this.transformations);
    setPositionZ(0.002 * (Math.sin((new Date().getTime()) / 1000)) + getPositionZ(this.transformations), this.transformations);
};

Plafond.prototype.creerTexels = function () {

    var tabTexels = [];

        // Texels de la face avant
        tabTexels[0] = [
        0,0,
        27,0,
        27,31,
        0,31
        ];
        var tabTexelsCube = [];
        for (var i = 0; i < 1; i++) {
            tabTexelsCube[i] = objgl.createBuffer();
            objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsCube[i]);
            objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
            tabTexelsCube[i].intNbElems = tabTexels[i].length; tabTexelsCube[i].intTailleElem = 2;
        }
        tabTexelsCube[0].intNoTexture = TEX_PLAFOND; tabTexelsCube[0].pcCouleurTexel = 1.0;
        return tabTexelsCube;
};