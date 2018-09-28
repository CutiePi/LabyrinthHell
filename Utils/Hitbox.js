/*
 Classe Mur (section de 1x1)
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */

var Hitbox = function (parent, width) {
    var objgl = session.objgl
    this.parent = parent
    this.width = width
    this.height = Config.GAME.CEILING_HEIGHT
    this.vertex = this.creerVertex(objgl);
    this.couleurs = this.creerCouleurs(objgl);
    this.maillage = this.creerMaillage(objgl);
    this.transformations = parent.transformations
    this.texels = this.creerTexels();
}

Hitbox.prototype.creerVertex = function () {
    var objVertex = objgl.createBuffer();

    var tabVertex = [
        this.width / 2, 0.0, this.width / 2, //0: TOP RIGHT BOTTOM
        -this.width / 2, 0.0, this.width / 2, //1: TOP LEFT BOTTOM
        -this.width / 2, 0.0, -this.width / 2, //2: BOTTOM LEFT BOTTOM
        this.width / 2, 0.0, -this.width / 2, //3: BOTTOM RIGHT BOTTOM

        this.width / 2, this.height, this.width / 2, //4: TOP RIGHT TOP
        -this.width / 2, this.height, this.width / 2, //5: TOP LEFT TOP
        -this.width / 2, this.height, -this.width / 2, //6: BOTTOM LEFT TOP
        this.width / 2, this.height, -this.width / 2 //7: BOTTOM RIGHT TOP
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length / 3;
    objVertex.intTailleElem = 3;
    return objVertex;
};

Hitbox.prototype.creerCouleurs = function (objgl) {
    var objCouleurs = objgl.createBuffer();

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

Hitbox.prototype.creerMaillage = function (objgl) {
    var objMaillage = objgl.createBuffer();

    var tabMaillageVertex = [
        0, 1,
        1, 2,
        2, 3,
        3, 0,
        4, 5,
        5, 6,
        6, 7,
        7, 4,
        0, 4,
        1, 5,
        2, 6,
        7, 4
    ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);
    objMaillage.intNbElemsTriangles = 0;
    objMaillage.intNbElemsDroites = tabMaillageVertex.length;
    return objMaillage;
};

Hitbox.prototype.creerTexels = function () {

    var objTexelsMurs = objgl.createBuffer();

    tabTexels = [  // Texels de la face avant
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

    // 10 texels
    objTexelsMurs.intNbElems = tabTexels.length / 2;
    objTexelsMurs.intTailleElem = 2;
    // 100% de la texture est utilisée
    objTexelsMurs.intNoTexture = TEX_MUR;
    objTexelsMurs.pcCouleurTexel = 0.00;

    return objTexelsMurs;
};
/*
Ancien système de collision utilisé dans Jumpman
Peut grandement être optimisé
@author Samuel Yvon
*/
Hitbox.prototype.checkCollision = function (hitbox) {

    var fltX = getPositionX(this.parent.transformations);
    //var fltY = getPositionY(this.parent.transformations)
    var fltZ = getPositionZ(this.parent.transformations);

    var width = this.width / 2;
    //var height = this.height
    //var depth = width

    var fltXRemote = getPositionX(hitbox.parent.transformations);
    //var fltYRemote = getPositionY(hitbox.parent.transformations);
    var fltZRemove = getPositionZ(hitbox.parent.transformations);

    //var heightRemote = hitbox.height
    var widthRemote = hitbox.width / 2;
    //var depthRemove = widthRemote

    var llX = fltX - width;
    var hlX = fltX + width;
    var llY = fltZ - width;
    var hlY = fltZ + width;

    var llXR = fltXRemote - widthRemote;
    var hlXR = fltXRemote + widthRemote;
    var llYR = fltZRemove - widthRemote;
    var hlYR = fltZRemove + widthRemote;

    var betweenX = between(llX,llXR,hlXR) || between(hlX,llXR,hlXR);
    var betweenY = between(llY,llYR,hlYR) || between(hlY,llYR,hlYR);
    //var booCollide = false

    /*var sideInRange = ((fltX - width / 2 >= fltXRemote - widthRemote / 2 && fltX - width / 2 <= fltXRemote + widthRemote / 2) ||
    (fltX + width / 2 >= fltXRemote - widthRemote / 2 && fltX + width / 2 <= fltXRemote + widthRemote / 2) ||
    (fltX >= fltXRemote - widthRemote / 2 && fltX <= fltXRemote + widthRemote / 2))*/
    
    /*
    var topInRange = ((fltY - height / 2 >= fltYRemote - heightRemote / 2 && fltY - height / 2 <= fltYRemote + heightRemote / 2) ||
    (fltY + height / 2 >= fltYRemote - heightRemote / 2 && fltY + height / 2 <= fltYRemote + heightRemote / 2) ||
    (fltY >= fltYRemote - heightRemote / 2 && fltY <= fltYRemote + heightRemote / 2))
    */

    /*var depthInRange = ((fltZ - depth / 2 >= fltZRemove - depthRemove / 2 && fltZ - depth / 2 <= fltZRemove + depthRemove / 2) ||
    (fltZ + depth / 2 >= fltZRemove - depthRemove / 2 && fltZ + depth / 2 <= fltZRemove + depthRemove / 2) ||
    (fltZ >= fltZRemove - depthRemove / 2 && fltZ <= fltZRemove + depthRemove / 2))*/

    /*
    if (sideInRange && depthInRange) {
        booCollide = true
    }
    */

    //return booCollide


    return betweenX && betweenY
};