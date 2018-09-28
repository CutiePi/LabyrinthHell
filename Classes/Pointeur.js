/*
 Classe Pointeur (fleche)
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */

var Pointeur = function (objgl, tabCoordonnesXYZ) {

    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = creerTransformations();
    setPositionsXYZ(tabCoordonnesXYZ, this.transformations);
    this.targetTreasure();
    this.texels = this.creerTexels();
    this.binVisible = true;
    this.hitbox = new Hitbox(this,0.4);

}

Pointeur.prototype.creerTexels = function () {

    var objTexelsMurs = objgl.createBuffer();

    tabTexels = [  // Texels de la face avant
        0.5, 0,
        1, 1,
        0.5, 0.5,
        0, 1,
        0.5, 0,
        1, 1,
        0.5, 0.5,
        0, 1,
        0.0, 0.0,
        1, 1,
        0.0, 1.0,
        0.0, 0.0
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    // 10 texels
    objTexelsMurs.intNbElems = tabTexels.length / 2;
    objTexelsMurs.intTailleElem = 2;
    // 100% de la texture est utilisée
    objTexelsMurs.intNoTexture = TEX_FLECHE;
    objTexelsMurs.pcCouleurTexel = 1.00;

    return objTexelsMurs;
};


Pointeur.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();

    var tabVertex = [

        0.0, 0.0, 0.7, //0: Pointe avant bas
        -0.7, 0.0, -0.7, //1: Devant gauche bas
        0.0, 0.0, 0.0, //2: milieu
        0.7, 0.0, -0.7, //3: Arriere droit bas


        0.0, 0.5, 0.7, //4: Point avant haut
        -0.7, 0.5, -0.7, //5: Devant gauche haut
        0.0, 0.5, 0.0, //6: Arriere gauche haut
        0.7, 0.5, -0.7 //7: Arriere droit hau

    ]

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length / 3;
    objVertex.intTailleElem = 3;
    return objVertex;
};


Pointeur.prototype.creerCouleurs = function (objgl) {
    var objCouleurs = objgl.createBuffer();

    // Face avant
    var tabCouleurs = []
    for (var i = this.vertex.intNbElems; i >= 0; i--) {
        if (i % 2 == 0) {
            tabCouleurs = tabCouleurs.concat([1.0, 0, 0.0, 1.0])
        } else {
            tabCouleurs = tabCouleurs.concat([0.0, 0.0, 0.0, 1.0])
        }
    }
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = this.vertex.intNbElems;
    objCouleurs.intTailleElem = 4;

    return objCouleurs;
};

Pointeur.prototype.creerMaillage = function (objgl) {
    var objMaillage = objgl.createBuffer();

    var tabMaillageVertex = [0, 1, 2,
        2, 3, 0,
        4, 5, 6,
        6, 7, 4,
        0, 4, 5,
        5, 1, 0,
        1, 5, 6,
        6, 2, 1,
        6, 7, 3,
        3, 2, 6,
        7, 4, 0,
        0, 3, 7
    ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    objMaillage.intNbElemsDroites = 0;
    return objMaillage;
};


Pointeur.prototype.targetTreasure = function () {
    var deltaX = getPositionX(tresor.transformations) - getPositionX(this.transformations);
    var deltaZ = getPositionZ(tresor.transformations) - getPositionZ(this.transformations);
    setAngleY((180 / Math.PI) * Math.atan2(deltaX, deltaZ), this.transformations)
};
