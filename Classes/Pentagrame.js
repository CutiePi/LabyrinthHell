/*
 Classe Pointeur (fleche)
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */

var Pentagramme = function (objgl) {

    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = creerTransformations();
    this.texels = this.creerTexels()
}

Pentagramme.prototype.creerTexels = function () {

    var objTexelsMurs = objgl.createBuffer();
    var tabTexels = [0.5, 0.5];
    for(var i = 1; i<=360;i++){
        tabTexels = tabTexels.concat([0.5 +( 0.5 * Math.cos(i * Math.PI /180)), 0.5 + (0.5 * Math.sin(i * Math.PI /180))]);
    }
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNbElems = tabTexels.length;
    objTexelsMurs.intTailleElem = 2;
    objTexelsMurs.intNoTexture = TEX_PENTA;
    objTexelsMurs.pcCouleurTexel = 1.00;

    return objTexelsMurs;
};

Pentagramme.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();
    tabVertex = [0,0,0];
   for(var i = 1; i <=360; i++){
    tabVertex = tabVertex.concat([Math.cos(i*Math.PI/180),0,Math.sin(i * Math.PI/180)]);
   }

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length / 3;
    objVertex.intTailleElem = 3;
    return objVertex;
};


Pentagramme.prototype.creerCouleurs = function (objgl) {
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

Pentagramme.prototype.creerMaillage = function (objgl) {
    var objMaillage = objgl.createBuffer();

    var tabMaillageVertex = [0,0,0];
    for(var i = 1;i < 360;i++){
        tabMaillageVertex = tabMaillageVertex.concat([0, i, i+1]);
    }
    tabMaillageVertex = tabMaillageVertex.concat([0,360,1]);


    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    objMaillage.intNbElemsDroites = 0;
    return objMaillage;
};


Pentagramme.prototype.update = function() {
    if(getAngleY(this.transformations)==360) {
        setAngleY(0, this.transformations);
    }
    setAngleY(getAngleY(this.transformations)+1, this.transformations);
};