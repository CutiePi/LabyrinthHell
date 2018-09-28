/*
 Classe Pointeur (fleche)
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */

var Bousolle = function (objgl) {

    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = personnage.transformations;
    this.binVisible = session.birdView;
    this.texels = this.creerTexels()
}

Bousolle.prototype.creerTexels = function () {

    var objTexelsMurs = objgl.createBuffer();

    tabTexels = [  // Texels de la face avant
        0, 0,
        0, 0,
        0, 0,
        0, 0,
        
        0, 0,
        0, 0,
        0, 0,
        0, 0,
        0, 0,
        0, 0
    ];
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNbElems = tabTexels.length / 2;
    objTexelsMurs.intTailleElem = 2;
    objTexelsMurs.intNoTexture = TEX_TRANSPARENT;
    objTexelsMurs.pcCouleurTexel = 0.00;

    return objTexelsMurs;
};

Bousolle.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();

    var tabVertex = [

        0.0, 0.0, 1.0, //0: Pointe avant bas
        -0.5, 0.0, 0.5, //1: Devant gauche bas
        -0.5, 0.0, -0.5, //2: Arriere gauche bas
        0.5, 0.0, -0.5, //3: Arriere droit bas
        0.5, 0.0, 0.5, //4: Devant droit bas


        0.0, 0.5, 1.0, //5: Point avant haut
        -0.5, 0.5, 0.5, //6: Devant gauche haut
        -0.5, 0.5, -0.5, //7: Arriere gauche haut
        0.5, 0.5, -0.5, //8: Arriere droit haut
        0.5, 0.5, 0.5 //9: Devant droit haut

    ]

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length / 3;
    objVertex.intTailleElem = 3;
    return objVertex;
};


Bousolle.prototype.creerCouleurs = function (objgl) {
    var objCouleurs = objgl.createBuffer();

    // Face avant
    var tabCouleurs = []
    for (var i = this.vertex.intNbElems; i >= 0; i--) {
        tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0])
    }
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = this.vertex.intNbElems;
    objCouleurs.intTailleElem = 4;

    return objCouleurs;
};

Bousolle.prototype.creerMaillage = function (objgl) {
    var objMaillage = objgl.createBuffer();

    var tabMaillageVertex = [0, 4, 1,
        1, 3, 2,
        1, 3, 4,
        5, 9, 6,
        6, 8, 7,
        6, 8, 9,
        7, 3, 2,
        7, 3, 8,
        6, 2, 1,
        6, 2, 7,
        8, 4, 3,
        8, 4, 9,
        5, 1, 0,
        5, 1, 6,
        9, 0, 4,
        9, 0, 5
    ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    objMaillage.intNbElemsDroites = 0;
    return objMaillage;
};
