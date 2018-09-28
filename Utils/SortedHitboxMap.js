/**
 * Hitbox tree
 * Le hitbox tree est un quadtree avec deux niveaux de profondeur
 * Permet de réduire le nombre de candidats lors d'une recherche de collision,
 * ce qui permet de réduire la grosseur du scan
 * Il est créé à l'initialisation de la partie, ce qui crée un très faible ralentissement
 * Il peut retourner plus d'un noeud dans le cas ou la position du hitbox est entre 2 noeuds, ce qui permet de garder
 * la même force qu'un scan intégral sur toute la carte
 * @author Samuel Yvon
 * May 2016
 */


var HitboxTree = function (maxX, maxY) {

    this.root = new Node(0, 0, maxX, maxY);
    this.root.subDivise();
    for (var i = 0; i < this.root.elements.length; i++) {
        this.root.elements[i].subDivise();
        if(Config.DEBUG.ENABLE_THIRD_DIVISION_ROUND_IN_HITBOX_MAP) {
            for(var j = 0;j < this.root.elements[i].elements.length;j++) {
                this.root.elements[i].elements[j].subDivise();
            }
        }
    }
};


HitboxTree.prototype.fill = function (array) {
    for (var i = 0; i < array.length; i++) {
        this.root.insert(array[i]);
    }
};

HitboxTree.prototype.getCandidates = function (hitbox) {
    var width = hitbox.width * 2;
    var x1 = Math.floor(getPositionX(hitbox.parent.transformations)) - width;
    var y1 = Math.floor(getPositionZ(hitbox.parent.transformations)) - width;
    var x2 = Math.floor(getPositionX(hitbox.parent.transformations)) + width;
    var y2 = Math.floor(getPositionZ(hitbox.parent.transformations)) + width;
    var nodes = [];
    nodes.uPush(this.root.getNodeForElementAt(x1, y1));
    nodes.uPush(this.root.getNodeForElementAt(x1, y2));
    nodes.uPush(this.root.getNodeForElementAt(x2, y1));
    nodes.uPush(this.root.getNodeForElementAt(x2, y2));
    //log(nodes)
    var elems = [];
    for (var i = nodes.length - 1; i >= 0; i--) {
        elems = elems.concat(nodes[i].elements)
    }
    ;

    //var node = this.root.getNodeForElementAt(x, y);
    //return node.elements;
    return elems;
}


var Node = function (sX, sY, eX, eY) {
    this.name = "SYNODE";
    this.uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }));
    this.sX = sX;
    this.sY = sY;
    this.eX = eX;
    this.eY = eY;
    this.elements = [];
};

Node.prototype.getNodeForElementAt = function (x, y) {
    if (this.elements.length > 0 && this.elements[0].name === "SYNODE") {
        for (var i = 0; i < this.elements.length; i++) {
            var node = this.elements[i];
            if (between(x, node.sX, node.eX) && between(y, node.sY, node.eY)) {
                return node.getNodeForElementAt(x, y);
            }
        }
    } else {
        return this;
    }
}

Node.prototype.subDivise = function () {
    this.elements = [];
    this.elements.push(new Node(this.sX, this.sY, 1 / 2 * (this.eX - this.sX) + (this.sX), 1 / 2 * (this.eY - this.sY) + this.sY));
    this.elements.push(new Node(1 / 2 * (this.eX - this.sX), this.sY, this.eX + (this.sX), 1 / 2 * (this.eY - this.sY) + this.sY));
    this.elements.push(new Node(this.sX, 1 / 2 * (this.eY - this.sY), 1 / 2 * (this.eX - this.sX) + (this.sX), this.eY + this.sY));
    this.elements.push(new Node(1 / 2 * (this.eX - this.sX), 1 / 2 * (this.eY - this.sY), this.eX + (this.sX), this.eY + this.sY))
};

Node.prototype.insert = function (element) {
    if (this.elements.length > 0 && this.elements[0].name === "SYNODE") {
        var x = getPositionX(element.parent.transformations);
        var y = getPositionZ(element.parent.transformations);
        for (var i = 0; i < this.elements.length; i++) {
            var node = this.elements[i];
            if (between(x, node.sX, node.eX) && between(y, node.sY, node.eY)) {
                node.insert(element);
                break;
            }
        }
    } else {
        this.elements.push(element)
    }
};

function between(c, ll, hl) {
    return c >= ll && c <= hl;
}

Array.prototype.uPush = function (data) {
    if (typeof data !== "undefined") {
        var binOk = true;
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i].uuid == data.uuid) {
                binOk = false;
                break;
            }
        }
        if (binOk) {
            this.push(data)
        }
    }
};