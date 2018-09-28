// Textures.js
var TEX_TRANSPARENT = 0;
var TEX_TRESOR = 1;
var TEX_PENTA = 2;
var TEX_FLOOR = 3;
var TEX_MUR = 4;
var TEX_MUR_1 = 5;
var TEX_PLAFOND = 6;
var TEX_PORTE = 7;
var TEX_FLOOR1 = 8;
var TEX_FLECHE = 9;
var TEX_FLESH = 10;
function creerTextures(objgl) {
    var tabImages = ['Textures/Transparent.gif','Textures/TEX_TRESOR.png','Textures/TEX_PENTA.png','Textures/TEX_FLOOR.jpg','Textures/TEX_MUR.jpg','Textures/TEX_MUR_1.jpg','Textures/TEX_TOP.jpg','Textures/TEX_PORTE.jpg','Textures/TEX_FLOOR1.jpg', 'Textures/TEX_FLECHE.jpg','Textures/TEX_FLESH.jpg'];
    var tabObjTextures = new Array();
    var i = 0;
    loadImage(tabObjTextures,i,tabImages,objgl);
    return tabObjTextures;
}

function loadImage(tabObjTextures,i,tabImages,objgl) {
        var objImage = new Image();
        objImage.src = tabImages[i];

        objImage.onload = function () {
            var objTexture = objgl.createTexture();

            objgl.bindTexture(objgl.TEXTURE_2D, objTexture);

            objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA,
                objgl.UNSIGNED_BYTE, objImage);

            objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.LINEAR);
            objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.LINEAR_MIPMAP_LINEAR);
            objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.MIRRORED_REPEAT);
            objgl.texParameteri(objgl.TEXTURE_D2, objgl.TEXTURE_WRAP_T, objgl.MIRRORED_REPEAT);
            objgl.generateMipmap(objgl.TEXTURE_2D);

            tabObjTextures.push(objTexture);
            if(i < (tabImages.length -1)) {
                loadImage(tabObjTextures,i+1,tabImages,objgl)
            }
        }
}
