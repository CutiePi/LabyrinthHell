/*
 Classe HomeAABB : Home Axis Align Bounding Box -> Permet de détecter si le personnage est à l'intérieur
 de l'enclos
 Projet 2 3D
 Samuel Yvon
 Avril-Mai 2016
 */

var HomeAABB = function (objgl) {
    this.transformations = creerTransformations();
    this.hitbox = new Hitbox(this, Config.HOMEAABB.WIDTH);
    setPositionsXYZ([27, 0, 31], this.transformations);
    this.closed = false;
}