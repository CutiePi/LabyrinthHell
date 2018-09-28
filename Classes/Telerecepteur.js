/*
 Classe Telerecepteur (section de 1x1)
 Projet 2 3D
 Jasmin Lapointe
 Avril-Mai 2016
 */

var Telerecepteur = function (objgl, tabCoordonnesXYZ) {

    /*
    Faire en sorte que si le Telerecepteur n'est pas destructible il faut changer les couleurs
    */
    this.vertex = this.creerVertex(objgl);
    this.couleurs = null;
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = creerTransformations();
    setPositionsXYZ(tabCoordonnesXYZ, this.transformations);
    this.texels = this.creerTexels();
    this.binVisible = true;
   // scale(matModeleVue, [-1, 1, 1]);
        //setAngleY(getAngleY(this.transformations)+45, this.transformations);
        //setEchellesXYZ(getEchellesXYZ(this.transformations)+0.1, this.transformations);
}


Telerecepteur.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();
    var tabVertex = [


        0.8, 0.0, 0.8, //0: TOP RIGHT BOTTOM
        0.8, 0.0, 0.6, //1: BOTTOM LEFT BOTTOM
        0.6, 0.0, 0.8, //2: TOP LEFT BOTTOM
        0.6, 0.0, 0.6, //3: BOTTOM RIGHT BOTTOM

        1, 1.0, 1, //4: TOP RIGHT BOTTOM
        1, 1.0, 0.8, //5: BOTTOM LEFT BOTTOM
        0.8, 1.0, 1, //6: TOP LEFT BOTTOM
        0.8, 1.0, 0.8, //7: BOTTOM RIGHT BOTTOM

        0.5,2, 0.5, //8: TOP RIGHT TOP


        -0.8, 0.0, -0.8, //9: TOP RIGHT BOTTOM
        -0.8, 0.0, -0.6, //10: BOTTOM LEFT BOTTOM
        -0.6, 0.0, -0.8, //11: TOP LEFT BOTTOM
        -0.6, 0.0, -0.6, //12: BOTTOM RIGHT BOTTOM

        -1, 1.0, -1, //13: TOP RIGHT BOTTOM
        -1, 1.0, -0.8, //14: BOTTOM LEFT BOTTOM
        -0.8, 1.0, -1, //15: TOP LEFT BOTTOM
        -0.8, 1.0, -0.8, //16: BOTTOM RIGHT BOTTOM

        -0.5,2, -0.5, //17: TOP RIGHT TOP


         0.8, 0.0, -0.8, //18: TOP RIGHT BOTTOM
        0.8, 0.0, -0.6, //19: BOTTOM LEFT BOTTOM
        0.6, 0.0, -0.8, //20: TOP LEFT BOTTOM
        0.6, 0.0, -0.6, //21: BOTTOM RIGHT BOTTOM

        1, 1.0, -1, //22: TOP RIGHT BOTTOM
        1, 1.0, -0.8, //23: BOTTOM LEFT BOTTOM
        0.8, 1.0, -1, //24: TOP LEFT BOTTOM
        0.8, 1.0, -0.8, //25: BOTTOM RIGHT BOTTOM

        0.5,2, -0.5, //26: TOP RIGHT TOP

              -0.8, 0.0, 0.8, //27: TOP RIGHT BOTTOM
        -0.8, 0.0, 0.6, //28: BOTTOM LEFT BOTTOM
        -0.6, 0.0, 0.8, //29: TOP LEFT BOTTOM
        -0.6, 0.0, 0.6, //30: BOTTOM RIGHT BOTTOM

        -1, 1.0, 1, //31: TOP RIGHT BOTTOM
        -1, 1.0, 0.8, //32: BOTTOM LEFT BOTTOM
        -0.8, 1.0, 1, //33: TOP LEFT BOTTOM
        -0.8, 1.0, 0.8, //34: BOTTOM RIGHT BOTTOM

        -0.5,2, 0.5, //35: TOP RIGHT TOP

       
        1, 0.2, 1, //36: TOP RIGHT BOTTOM
        -1, 0.2, 1, //37: TOP LEFT BOTTOM
        -1, 0.2, -1, //38: BOTTOM LEFT BOTTOM//    
         1, 0.2, -1, //39: BOTTOM RIGHT BOTTOM

       

        0.4, 0.5, 0.4, //40: TOP RIGHT BOTTOM
        -0.4, 0.5, 0.4, //41: TOP LEFT BOTTOM
        -0.4, 0.5, -0.4, //42: BOTTOM LEFT BOTTOM
        0.4, 0.5, -0.4, //43: BOTTOM RIGHT BOTTOM



    


    ];
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length;
    objVertex.intTailleElem = 3;
    return objVertex;
};

Telerecepteur.prototype.creerTexels = function () {

    var objTexelsTelerecepteurs = objgl.createBuffer();

    var tabTexels = [];

    for (var i = this.vertex.intNbElems - 1; i >= 0; i--) {
        tabTexels = tabTexels.concat([0.0,0.0])
    }

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTelerecepteurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTelerecepteurs.intNbElems = tabTexels.length;
    objTexelsTelerecepteurs.intTailleElem = 2;
    objTexelsTelerecepteurs.intNoTexture = TEX_MUR;
    objTexelsTelerecepteurs.pcCouleurTexel = 0.00;

    return objTexelsTelerecepteurs;
};


Telerecepteur.prototype.creerCouleurs = function (objgl) {
    var objCouleurs = objgl.createBuffer();

    var tabCouleurs = []
    for (var i = this.vertex.intNbElems; i >= 0; i--) {
        tabCouleurs = tabCouleurs.concat([Math.random()-0.3,Math.random()-0.8, Math.random()-0.9, 0.1])
    }

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = this.vertex.intNbElems;
    objCouleurs.intTailleElem = 4;

    return objCouleurs;
};


Telerecepteur.prototype.creerMaillage = function (objgl) {
    var objMaillage = objgl.createBuffer();

    var tabMaillageVertex = [
 /*
    6,5,1,
    1,2,6,*/

    4,5,1,
    1,0,4,

   4,6,2,
   2,0,4,

   5,7,3,
   3,1,5,

   2,3,7,
   7,6,2,

   6,7,8,
   7,5,8,
   4,8,5,
   6,8,4,

    4+9,5+9,1+9,
    1+9,0+9,4+9,

   4+9,6+9,2+9,
   2+9,0+9,4+9,

   5+9,7+9,3+9,
   3+9,1+9,5+9,

   2+9,3+9,7+9,
   7+9,6+9,2+9,

   6+9,7+9,8+9,
   7+9,5+9,8+9,
   4+9,8+9,5+9,
   6+9,8+9,4+9,

       4+18,5+18,1+18,
    1+18,0+18,4+18,

   4+18,6+18,2+18,
   2+18,0+18,4+18,

   5+18,7+18,3+18,
   3+18,1+18,5+18,

   2+18,3+18,7+18,
   7+18,6+18,2+18,

   6+18,7+18,8+18,
   7+18,5+18,8+18,
   4+18,8+18,5+18,
   6+18,8+18,4+18,

    4+27,5+27,1+27,
    1+27,0+27,4+27,

   4+27,6+27,2+27,
   2+27,0+27,4+27,

   5+27,7+27,3+27,
   3+27,1+27,5+27,

   2+27,3+27,7+27,
   7+27,6+27,2+27,

   6+27,7+27,8+27,
   7+27,5+27,8+27,
   4+27,8+27,5+27,
   6+27,8+27,4+27,

   41,40,43,
   43,42,41,

42,39,38,
42,43,39,

43,40,39,
39,36,40,

40,36,37,
37,41,40,

41,37,38,
38,41,42,

       /* 4, 1, 0,
        4, 1, 5,
        5, 2, 1,
        5, 2, 6,
        6, 3, 2,
        6, 3, 7,
        7, 0, 3,
        7, 0, 4,
        5, 7, 6,
        5, 7, 4,

        4,8,6,
        6,8,5,
        5,8,4,
        4,8,7,*/



        ];
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    objMaillage.intNbElemsDroites = 0;
    return objMaillage;
};
