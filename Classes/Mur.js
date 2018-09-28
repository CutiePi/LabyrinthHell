/*
 Classe Mur (section de 1x1)
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */

var Mur = function (objgl, tabCoordonnesXYZ,destructible,intEfficiency) {

    /*
    Faire en sorte que si le mur n'est pas destructible il faut changer les couleurs
    */
    this.intEfficiency=intEfficiency;
    this.vertex = this.creerVertex(objgl);
    this.couleurs = null;
    if(!destructible) {
        this.couleurs = this.creerCouleursIndestructible(objgl);
    } else {
        this.couleurs = this.creerCouleurs(objgl);
    }
    this.maillage = this.creerMaillage(objgl,intEfficiency);
    this.transformations = creerTransformations();
    setPositionsXYZ(tabCoordonnesXYZ, this.transformations);
    this.hitbox = new Hitbox(this, Config.WALL.WALL_DEPTH);
    this.texels = this.creerTexels(destructible);
    this.destructible = destructible;
   
    this.binVisible = true;

}


Mur.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();

    var tabVertex = [
        1, 0.0, 1, //0: TOP RIGHT BOTTOM
        -1, 0.0, 1, //1: TOP LEFT BOTTOM
        -1, 0.0, -1, //2: BOTTOM LEFT BOTTOM
        1, 0.0, -1, //3: BOTTOM RIGHT BOTTOM

        1, Config.GAME.CEILING_HEIGHT, 1, //4: TOP RIGHT TOP
        -1, Config.GAME.CEILING_HEIGHT, 1, //5: TOP LEFT TOP
        -1, Config.GAME.CEILING_HEIGHT, -1, //6: BOTTOM LEFT TOP
        1, Config.GAME.CEILING_HEIGHT, -1, //7: BOTTOM RIGHT TOP

        1, Config.GAME.CEILING_HEIGHT/2, 1, //8: TOP RIGHT TOP
        -1, Config.GAME.CEILING_HEIGHT/2, 1, //9: TOP LEFT TOP
        -1, Config.GAME.CEILING_HEIGHT/2, -1, //10: BOTTOM LEFT TOP
        1, Config.GAME.CEILING_HEIGHT/2, -1, //11: BOTTOM RIGHT TOP

        0.8, 0.5, 0.8, //12: TOP RIGHT BOTTOM
        -0.8, 0.5, 0.8, //1: TOP LEFT BOTTOM
        -0.8, 0.5, -0.8, //2: BOTTOM LEFT BOTTOM
        0.8, 0.5, -0.8, //3: BOTTOM RIGHT BOTTOM

        1, 5, 1, //0: TOP RIGHT BOTTOM
        -1, 5, 1, //1: TOP LEFT BOTTOM
        -1, 5, -1, //2: BOTTOM LEFT BOTTOM
        1, 5, -1, //3: BOTTOM RIGHT BOTTOM

        1, 0.0, 0, //0: TOP RIGHT BOTTOM
        -0, 0.0, 1, //1: TOP LEFT BOTTOM
        -1, 0.0, 0, //2: BOTTOM LEFT BOTTOM
        0, 0.0, -1, //3: BOTTOM RIGHT BOTTOM

        1, 5.0, 0, //0: TOP RIGHT BOTTOM
        -0, 5.0, 1, //1: TOP LEFT BOTTOM
        -1, 5.0, 0, //2: BOTTOM LEFT BOTTOM
        0, 5.0, -1, //3: BOTTOM RIGHT BOTTOM

        0.8, 4.5, 0.8, //12: TOP RIGHT BOTTOM
        -0.8, 4.5, 0.8, //1: TOP LEFT BOTTOM
        -0.8, 4.5, -0.8, //2: BOTTOM LEFT BOTTOM
        0.8, 4.5, -0.8, //3: BOTTOM RIGHT BOTTOM

    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length / 3;
    objVertex.intTailleElem = 3;
    return objVertex;
};

Mur.prototype.creerTexels = function (destructible) {

    var objTexelsMurs = objgl.createBuffer();

    tabTexels = [  // Texels de la face avant
       2,6,
       0,6,
       2,7,
       0,7,

       2,0,
       0,0,
       2,0,
       0,0,

       2,2.5, //HALF TOP
       0,2.5,
       2,2.5,
       0,2.5,

       2,5, //TOP OF LWOER BASE
       0,5,
       2,6, //
       0,6, //

       0,1, //USELESS?
       2,1,
       2,1,
       0,1,

       2,6,
       0,6,
       2,7,
       0,7,

       2,0,
       0,0,
       2,0,
       0,0,

        2,1, //TOP OF LWOER BASE
       0,1,
       2,1, //
       0,1, //

    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    // 10 texels
    objTexelsMurs.intNbElems = tabTexels.length;
    objTexelsMurs.intTailleElem = 2;
    // 100% de la texture est utilisée
    objTexelsMurs.intNoTexture = TEX_MUR;
    if(destructible) {
        objTexelsMurs.intNoTexture = TEX_FLESH;
        objTexelsMurs.pcCouleurTexel = 0.8;
    }
    else
    {
        objTexelsMurs.pcCouleurTexel = 0.8;
    }

    return objTexelsMurs;
};


Mur.prototype.creerCouleurs = function (objgl) {
    var objCouleurs = objgl.createBuffer();

    var tabCouleurs = []
    for (var i = this.vertex.intNbElems; i >= 0; i--) {
       tabCouleurs = tabCouleurs.concat([Math.random()-0.2, 0.0, 0.0, 1.0])
    }
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = this.vertex.intNbElems;
    objCouleurs.intTailleElem = 4;

    return objCouleurs;
};

Mur.prototype.creerCouleursIndestructible = function(objgl) {
    var objCouleurs = objgl.createBuffer();

    var tabCouleurs = []
    for (var i = this.vertex.intNbElems; i >= 0; i--) {
        tabCouleurs = tabCouleurs.concat([0.0, 0, Math.random(), 1.0])
    }
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = this.vertex.intNbElems;
    objCouleurs.intTailleElem = 4;

    return objCouleurs;
};

Mur.prototype.creerMaillage = function (objgl,intEfficiency) {
    var objMaillage = objgl.createBuffer();
    //alert(intEfficiency);

    if(intEfficiency==5){   //ALL THE WALLS!
    var tabMaillageVertex = [ 

       
        0,1,12,
        1,13,12,

        15,12,0,
        0,3,15,

        2,3,15,
        15,14,2,

        14,2,1,
        1,13,14,

        14,13,12,
        14,15,12,



       /* 16,17,12,
        17,13,12,

        15,12,16,
        16,19,15,

        18,19,15,
        15,14,18,

        14,18,17,
        17,13,14,*/



        22,23,27,
        27,26,22,

        23,27,24,
       24,20,23,

        26,25,21,
        21,22,26,

        24,25,21,
        21,20,24,


        7,4,28,
        28,31,7,

        7,31,30,
        30,6,7,

        30,6,5,
        5,29,30,

        5,29,28,
        28,4,5,

        30,31,28,
        28,29,30,

    ];}

    if(intEfficiency==1){var tabMaillageVertex = [ 4, 1, 0,4, 1, 5,/*5, 2, 1,5, 2, 6,6, 3, 2, 6, 3, 7,7, 0, 3,7, 0, 4,*/5, 7, 6,5, 7, 4];} //south only
    if(intEfficiency==2){var tabMaillageVertex = [ /*4, 1, 0,4, 1, 5,*/5, 2, 1,5, 2, 6/*,6, 3, 2, 6, 3, 7,7, 0, 3,7, 0, 4*/,5, 7, 6,5, 7, 4];} //east only
    if(intEfficiency==3){var tabMaillageVertex = [ /*4, 1, 0,4, 1, 5,5, 2, 1,5, 2, 6,*/6, 3, 2, 6, 3, 7,/*7, 0, 3,7, 0, 4*/5, 7, 6,5, 7, 4];} //north only
    if(intEfficiency==4){var tabMaillageVertex = [ /*4, 1, 0,4, 1, 5,5, 2, 1,5, 2, 6,6, 3, 2, 6, 3, 7,*/7, 0, 3,7, 0, 4,5, 7, 6,5, 7, 4];} //west only


    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    objMaillage.intNbElemsDroites = 0;
    return objMaillage;
};
