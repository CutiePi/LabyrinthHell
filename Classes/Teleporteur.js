/*
 Classe Teleporteur (section de 1x1)
 Projet 2 3D
 Jasmin Lapointe
 Avril-Mai 2016
 */

var Teleporteur = function (objgl, tabCoordonnesXYZ) {
    
    this.vertex = this.creerVertex(objgl);
    this.couleurs = null;
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = creerTransformations();
    setPositionsXYZ(tabCoordonnesXYZ, this.transformations);
    this.hitbox = new Hitbox(this, Config.WALL.WALL_DEPTH);
    this.texels = this.creerTexels();
    this.binVisible = true;
}


Teleporteur.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();
    var tabVertex = [
        -0.4, 0.0, 0.4, //0: 
        -0.6, 0.0, 0.4, //1: 
        -0.6, 0.0, 0.4, //2: 
        -0.6, 1.5, 0.4, //3: 

        -1, 1.5, 0.4, //4: 
        -0.4, 2.1, 0.4, //5: 
        -0.6, 2.5, 0.4, //6: 


        0.4, 0.0, 0.4, //7: 
        0.6, 0.0, 0.4, //8: 
        0.6, 0.0, 0.4, //9: 
        0.6, 1.5, 0.4, //10: 

        1, 1.5, 0.4, //11: 
        0.4, 2.1, 0.4, //12: 
        0.6, 2.5, 0.4, //13: 



         -0.4, 0.0, 0.6, //0: 
        -0.6, 0.0, 0.6, //1: 
        -0.6, 0.0, 0.6, //2: 
        -0.6, 1.5, 0.6, //3: 

        -1, 1.5, 0.6, //4: 
        -0.4, 2.1, 0.6, //5: 
        -0.6, 2.5, 0.6, //6: 


        0.4, 0.0, 0.6, //7: 
        0.6, 0.0, 0.6, //8: 
        0.6, 0.0, 0.6, //9: 
        0.6, 1.5, 0.6, //10: 

        1, 1.5, 0.6, //11: 
        0.4, 2.1, 0.6, //12: 
        0.6, 2.5, 0.6, //13: 
        /*
         -0.4, 0.0, 0.4, //0: 
        -0.6, 0.0, 0.4, //1: 
        -0.4, 0.0, 0.4, //2: 
        -0.4, 1.5, 0.4, //3: 

        -1, 1.5, 0.4, //4: 
        -0.4, 2, 0.4, //5: 
        -0.6, 2.5, 0.4, //6: 


        0.4, 0.0, 0.4, //7: 
        0.6, 0.0, 0.4, //8: 
        0.4, 0.0, 0.4, //9: 
        0.4, 1.5, 0.4, //10: 

        1, 1.5, 0.4, //11: 
        0.4, 2, 0.4, //12: 
        0.6, 2.5, 0.4, //13: 



         -0.4, 0.0, 0.6, //0: 
        -0.6, 0.0, 0.6, //1: 
        -0.4, 0.0, 0.6, //2: 
        -0.4, 1.5, 0.6, //3: 

        -1, 1.5, 0.6, //4: 
        -0.4, 2, 0.6, //5: 
        -0.6, 2.5, 0.6, //6: 


        0.4, 0.0, 0.6, //7: 
        0.6, 0.0, 0.6, //8: 
        0.4, 0.0, 0.6, //9: 
        0.4, 1.5, 0.6, //10: 

        1, 1.5, 0.6, //11: 
        0.4, 2, 0.6, //12: 
        0.6, 2.5, 0.6, //13: */

    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length;
    objVertex.intTailleElem = 3;
    return objVertex;
};

Teleporteur.prototype.creerTexels = function () {

    var objTexelsTeleporteurs = objgl.createBuffer();

    tabTexels = [  // Texels de la face avant
        0,0,
        0,0,
        0,0,
        1,0,
        1,1,
        2,1,
        3,3,
        0,0,
        0,0,
        0,0,
        1,0,
        1,1,
        1,2,
        2,2,
        0,0,
        0,0,
        0,0,
        1,0,
        1,1,
        2,1,
        2,2,
        0,0,
        0,0,
        0,0,
        1,0,
        1,1,
        1,2,
        3,3
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTeleporteurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    // 10 texels
    objTexelsTeleporteurs.intNbElems = tabTexels.length;
    objTexelsTeleporteurs.intTailleElem = 2;
    // 100% de la texture est utilisée
    objTexelsTeleporteurs.intNoTexture = TEX_MUR;
    objTexelsTeleporteurs.pcCouleurTexel = 1;

    return objTexelsTeleporteurs;
};


Teleporteur.prototype.creerCouleurs = function (objgl) {
    var objCouleurs = objgl.createBuffer();

    var tabCouleurs = []
    for (var i = this.vertex.intNbElems; i >= 0; i--) {
        tabCouleurs = tabCouleurs.concat([Math.random()-0.3, 0.2, 0.2, 0.1])
    }
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = this.vertex.intNbElems;
    objCouleurs.intTailleElem = 4;

    return objCouleurs;
};

Teleporteur.prototype.creerMaillage = function (objgl) {
    var objMaillage = objgl.createBuffer();

    var tabMaillageVertex = [
        //BACK PANEL
        4,1,0,
        4,0,3,
        4,3,6,
        3,6,5,

        4+7,1+7,0+7,
        4+7,0+7,3+7,
        4+7,3+7,6+7,
        3+7,6+7,5+7,

        6,5,6+7,
        5,5+7,6+7,


        //FRONT PANEL
        4+14,1+14,0+14,
        4+14,0+14,3+14,
        4+14,3+14,6+14,
        3+14,6+14,5+14,

        4+7+14,1+7+14,0+7+14,
        4+7+14,0+7+14,3+7+14,
        4+7+14,3+7+14,6+7+14,
        3+7+14,6+7+14,5+7+14,

        6+14,5+14,6+7+14,
        5+14,5+7+14,6+7+14,


        1,4,18,  //lower left outside arc
        18,15,1,

        6,4,18, //upper left outside arc
        18,20,6,

       3,0,14, //lower inside top arc
       14,17,3,

       3,17,19, //upper right inside arc
       19,5,3,

 
       1+7,4+7,18+7, //lower Right outside arc
       18+7,15+7,1+7,

        6+7,4+7,18+7, //upper Right outside arc
        18+7,20+7,6+7,

       3+7,0+7,14+7, //lower inside Right arc
       14+7,17+7,3+7,

       3+7,17+7,19+7, //upper Right inside arc
       19+7,5+7,3+7,

       5,12,26, //upper inside top arc
       26,19,5,

       6,13,27, //upper outside top arc
       27,20,6,


    ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    objMaillage.intNbElemsDroites = 0;
    return objMaillage;
};