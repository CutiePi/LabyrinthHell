/*
 Classe plancher
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */
var Plancher = function (objgl,intPercentageTexture,intLength,intWidth,intAltitute,intX,intY,intTypeFloor) {
    this.intTypeFloor=intTypeFloor;
    this.intY=intY;
    this.intX=intX;
    this.intLength=intLength;
    this.intWidth=intWidth;
    this.intPercentageTexture=intPercentageTexture;
    this.intAltitute=intAltitute;
    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = null;
    this.transformations = creerTransformations();
    setPositionsXYZ([this.intY, this.intAltitute, this.intX=intX], this.transformations);
    this.texels = this.creerTexels();
}

Plancher.prototype.creerTexels = function () {

     var tabTexels = new Array();

        // Texels de la face avant
        tabTexels[0] = [
        0,0,
        this.intLength ,0,
        this.intLength ,this.intWidth ,
        0,this.intWidth 
        ];
        var tabTexelsCube = new Array();
        for (var i = 0; i < 1; i++) {
            tabTexelsCube[i] = objgl.createBuffer();
            objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsCube[i]);
            objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
            tabTexelsCube[i].intNbElems = tabTexels[i].length; tabTexelsCube[i].intTailleElem = 2;
        }
        if(this.intTypeFloor==0)
        {
        tabTexelsCube[0].intNoTexture = TEX_FLOOR; tabTexelsCube[0].pcCouleurTexel = this.intPercentageTexture;
        }
        else 
        {
        tabTexelsCube[0].intNoTexture = TEX_FLOOR1; tabTexelsCube[0].pcCouleurTexel = this.intPercentageTexture;
        }
        return tabTexelsCube;
};


Plancher.prototype.creerVertex = function () {
    var tabVertex = new Array();

    // Face avant pleine
    tabVertex[0] = [
        0.0, 0.0, 0.0,
        this.intLength, 0.0, 0.0,
        this.intLength, 0.0, this.intWidth,
        0.0, 0.0, this.intWidth
    ];

    // Création des tampons
    var tabObjPyramide = new Array();
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


Plancher.prototype.creerCouleurs = function () {
    var tabCouleurs = new Array();
    tabCouleurs[0] = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs[0] = tabCouleurs[0].concat([1.0, 1.0, 1.0, 1.0]);
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