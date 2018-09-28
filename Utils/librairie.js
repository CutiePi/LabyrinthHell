/*
 Librairie Javascript par Samuel Yvon
 2016-01-30
 */
function dansCellule(texte, className) {
    if (className) {
        return '<td class=\'' + className + '\'>' + texte + '</td>'
    } else {
        return '<td>' + texte + '</td>'
    }
}
function ajoutBoutton(texte, functionToCall, parameters) {
    return '<button type="button" onclick=\"' + functionToCall + '(' + parameters + ')\">' + texte + '</button>'
}

function ajoutTrace(key, value, sectionID, binAppend) {
    var objSection = document.getElementById(sectionID)
    if (null == objSection) {
        alert("Aucune section");
        return;
    } else {
        if (binAppend) {
            objSection.innerHTML = objSection.innerHTML + dansTag('tr', dansCellule(key) + dansCellule(value), null) + dansTagUnidir('br', null, null, null, null, null, null)
        } else {
            objSection.innerHTML = dansTag('tr', dansCellule(key) + dansCellule(value), null) + dansTagUnidir('br', null, null, null, null, null, null)
        }
    }
}
function dansTag(tag, texte, id, action, type, className) {
    return '<' +
        tag +
        ((null != className) ? (' class=\'' + className + '\'') : ("")) +
        ((null != id) ? (' id=\"' + id + '\"') : ("")) +
        ((null != action) ? (' action=\'' + action + '\'') : ("")) +
        ((null != type) ? (' type=\"' + type + '\"') : ("")) +
        '>' +
        texte +
        '</' +
        tag + '>';
}

function dansTagUnidir(tag, value, id, action, type, style, className) {
    return ('<' +
    tag +
    ((null != className) ? (' class=\'' + className + '\'') : ("")) +
    ((null != id) ? (' id=\"' + id + '\"') : ("")) +
    ((null != action) ? (' action=\'' + action + '\'') : ("")) +
    ((null != type) ? (' type=\"' + type + '\"') : ("")) +
    ((null != value) ? (' value=\"' + value + '\"') : ("")) +
    ((null != style) ? (' style=\"' + style + '\"') : ("")) +
    '>');
}
function parseTrueFalse(valeur) {
    return (valeur) ? "Oui" : "Non"
}

function o(obj, strValue) {
    var objOriginal = obj
    if (null != obj) {
        if (!estElem(obj)) {
            obj = document.getElementById(obj)
            if (null == obj) {
                alert("L'élément n'existe pas " + objOriginal)
                return null
            }
        }
    } else {
        alert("L'élément obj ne doit pas être null (function O)")
    }
    if (null != strValue)
        setValue(obj, strValue)
    return obj
}

function setValue(obj, strValue) {
    if (null == obj.value) {
        obj.innerHTML = (strValue) ? strValue : strValue
    } else {
        obj.value = (strValue) ? strValue : strValue
    }
}

function c(obj) {
    return obtContenu(obj);
}

function obtContenu(obj) {
    obj = o(obj)
    if (null != obj) {
        if (null == obj.value) {
            return obj.innerHTML
        } else {
            return obj.value
        }
    }
}

function estElem(obj) {
    if (null != obj) {
        try {
            return obj instanceof HTMLElement
        } catch (e) {
            return typeof obj === "object" && typeof obj.ownerDocument === "object"
        }
    } else {
        alert("Paramètre obj est null (function estElem)")
    }
    return obj
}
/**
 * Function style (st)
 * @param obj objet dont le style sera modifié
 * @param className
 * @returns {*}
 */
function st(obj, className, binAppend) {
    if (null != obj) {
        if (estElem(obj)) {
            setClassName()
        } else {
            obj = o(obj)
            if (null != obj) {
                setClassName()
            }
        }
    } else {
        alert("Paramètre obj est null (function st)")
    }
    function setClassName() {
        if (null != setClassName && typeof className === "string") {
            if (binAppend) {
                obj.className += className
            } else {
                obj.className = className
            }
        }
    }

    return obj;
}

function estUnNombre(intNombre) {
    return !isNaN(parseFloat(intNombre)) && isFinite(intNombre)
}

function empty(val) {
    var binEmpty = false;

    if (val == null) {
        binEmpty = true;
    }

    val = val.trim();

    if (val == '') {
        binEmpty = true;
    }

    return binEmpty;
}