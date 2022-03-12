"use strict";
/**
 * Un élément svg générique s'*actualise* quand on modifie
 * l'une de ses propriétés css ou l'un de ses attributs html
 */
class El {
    /**
     *
     * @param sel élément svg à mettre dans le DOM
     * @param attrVals noms et valeurs d'attributs alternés
     */
    constructor (sel, ...attrVals) {
        this.sel = sel;
        this.setAttr(...attrVals);
    }
    adopt (child) {
        this.sel.appendChild(child.sel);
        child.base = this.base;
        return child;
    }
    abandon (child) {
        child.base = undefined;
        this.sel.removeChild(child.sel);
    }
    /**
     * Mise à jour sur modification : implémenter chez les enfants
     * en veillant à ne pas créer de boucle infinie
     */
    update () {
    }
    /**
     * Renvoie la valeur d'une propriété de style css ou une chaîne vide
     * @param id identifiant de la propriété css
     */
    getCss (id) {
        return this.sel.style.getPropertyValue(id) || "";
    }
    /**
     * Définit une suite de propriétés de style css
     * @param vals suite alternant noms et valeurs css
     */
    setCss (...vals) {
        for (var i = 0; i < vals.length; i += 2)
            this.sel.style.setProperty(vals[i], vals[i + 1]);
        this.update();
    }
    /**
     * Supprime une propriété de style css
     * @param id identifiant de la propriété css à supprimer
     */
    delCss (id) {
        this.sel.style.removeProperty(id);
        this.update();
    }
    /**
     * Renvoie la valeur d'un attribut ou une chaîne vide
     * @param id identifiant de l'attribut
     */
    getAttr (id) {
        return this.sel.getAttribute(id) || "";
    }
    /**
     * Définit une suite d'attributs
     * @param vals suite alternant noms et valeurs d'attributs
     */
    setAttr (...vals) {
        for (var i = 0; i < vals.length; i += 2) {
            let [n, v] = [vals[i], vals[i + 1]];
            if (v.toString().length) {
                this.sel.setAttribute(n, v);
            }
            else {
                this.sel.removeAttribute(n);
            }
        }
        this.update();
    }
    /**
     * Supprime un attribut
     * @param id identifiant de l'attribut à supprimer
     */
    delAttr (id) {
        this.sel.removeAttribute(id);
        this.update();
    }
    /**
     * Valeur booléenne correspondant à un attribut ou à son existence
     * @param id identifiant de l'attribut
     * @param valSiVrai si l'attribut a cette valeur, renvoie vrai
     */
    getAttrB (id, valSiVrai) {
        if (valSiVrai && this.sel.getAttribute(id) === valSiVrai)
            return true;
        return this.sel.hasAttribute(id);
    }
    /**
     * Valeur numérique correspondant à un attribut
     * @param id identifiant de l'attribut
     */
    getAttrN (id) {
        return parseInt(this.getAttr(id));
    }
}
class SvgEl extends El {
    constructor (type, ...attrVals) {
        super(document.createElementNS("http://www.w3.org/2000/svg", type), ...attrVals);
    }
    createChild (type, ...attrs) {
        return this.adopt(new SvgEl(type, ...attrs));
    }
    get mouseEnabled () {
        return !this.getAttrB("pointer-events");
    }
    set mouseEnabled (value) {
        value ? this.delAttr("pointer-events") : this.setAttr("pointer-events", "none");
    }
    get cursor () {
        return this.getCss("cursor");
    }
    set cursor (value) {
        this.setCss("cursor", value);
    }
    get visible () {
        return this.getCss("display") !== "none";
    }
    set visible (value) {
        this.setCss("display", value ? "block" : "none");
    }
}
class SvgBase extends SvgEl {
    constructor (target) {
        super("svg");
        this.filters = [];
        this.svg = this.sel;
        this.defs = new SvgEl("defs");
        this.base = this;
        this.adopt(this.defs);
        target.appendChild(this.sel);
    }
}
class SVGSprite extends SvgBase {
    constructor () {
        super(document.body);
        this.viewport = [0, 0, 0, 0];
        this.graphics = new Graphics(this);
        this.setCss("position", "absolute");
    }
    rect (...attrVals) {
        return this.adopt(new SvgEl("rect", ...attrVals));
    }
    text (content, x, y, font, size, color = "black", ...attrVals) {
        let el = new SvgEl("text", "x", x, "y", y, "font-family", font, "font-size", size, "fill", color, ...attrVals);
        el.sel.textContent = content;
        return this.adopt(el);
    }
    update () {
        if (this.viewport) {
            this.sel.setAttribute("viewport", this.viewport.join(" "));
        }
        // implémenter chez les enfants !
    }
    /**
     * Définit la position d'affichage
     * @param x gauche
     * @param y haut
     */
    setPos (x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Définit la zone d'affichage
     * @param x gauche
     * @param y haut
     * @param w largeur
     * @param h hauteur
     */
    setBounds (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    /**
     * Définit la taille d'affichage
     * @param w largeur
     * @param h hauteur
     */
    setSize (w, h) {
        this.width = w;
        this.height = h;
    }
    /**
     * Gauche du Sprite
     */
    get x () {
        return this.viewport[0];
    }
    set x (value) {
        this.viewport[0] = value;
        this.setCss("left", value + "px");
    }
    /**
     * Haut du Sprite
     */
    get y () {
        return this.viewport[1];
    }
    set y (value) {
        this.viewport[1] = value;
        this.setCss("top", value + "px");
    }
    /**
     * Centre horizontal du Sprite
     */
    get cx () {
        return this.x + this.rx;
    }
    set cx (value) {
        this.x = value - this.rx;
    }
    /**
     * Centre vertical du Sprite
     */
    get cy () {
        return this.y + this.ry;
    }
    set cy (value) {
        this.y = value - this.ry;
    }
    /**
     * Droite du Sprite
     */
    get fx () {
        return this.x + this.width;
    }
    set fx (value) {
        this.x = value - this.width;
    }
    /**
     * Bas du Sprite
     */
    get fy () {
        return this.y + this.height;
    }
    set fy (value) {
        this.y = value - this.height;
    }
    /**
     * Largeur du Sprite
     */
    get width () {
        return this.viewport[2];
    }
    set width (value) {
        this.viewport[2] = value;
        this.setAttr("width", `${value}`);
    }
    /**
     * Hauteur du Sprite
     */
    get height () {
        return this.viewport[3];
    }
    set height (value) {
        this.viewport[3] = value;
        this.setAttr("height", `${value}`);
    }
    /**
     * Rayon horizontal du Sprite
     * (moitié de la largeur)
     */
    get rx () {
        return this.viewport[2] / 2;
    }
    set rx (value) {
        this.width = value * 2;
    }
    /**
     * Rayon vertical du Sprite
     * (moitié de la hauteur)
     */
    get ry () {
        return this.viewport[3] / 2;
    }
    set ry (value) {
        this.height = value * 2;
    }
}
class Fill {
    constructor (color, alpha) {
        this.color = color;
        this.alpha = alpha;
    }
    style (color, alpha) {
        this.color = color;
        this.alpha = alpha;
    }
}
/**
 * fill-rule            :   spécifie la règle de remplissage pour les formes où des chemins se chevauchent.
 * stroke-miterlimit    :   détermine à partir de quel angle une liaison de segment de type 'miter' sera affichée.
 * stroke-dashoffset    :   définit à partir d'où commencer les pointillés sur la ligne.
 */
class Stroke extends Fill {
    constructor (thickness, color, alpha, cap, join, dash = []) {
        super(color, alpha);
        this.thickness = thickness;
        this.cap = cap;
        this.join = join;
        this.dash = dash;
    }
    strokeStyle (thickness, color, alpha, caps, join, dash) {
        this.style(color, alpha);
        this.thickness = thickness;
        this.cap = caps;
        this.join = join;
        this.dash = dash;
    }
}

class Graphics {
    constructor (sprite) {
        this.sprite = sprite;
        this.pos = { x: 0, y: 0 };
        this.fill = new Fill("white", 1);
        this.stroke = new Stroke(1, "none", 1, "butt", "miter", []);
    }
    addToPath (letter, ...coords) {
        if (this.path == undefined)
            this.path = new SvgEl("path");
        let data = this.path.getAttr("d").concat(letter, " ", coords.join(" "));
        this.path.setAttr("d", data);
        return this;
    }
    _addGrad (grad, col, alf, pos) {
        for (let c = 0; c < col.length; c++) {
            grad.adopt(new SvgEl("stop", "stop-color", col[c], "stop-opacity", alf[c], "offset", (pos[c] * 100) + "%"));
        }
        this.sprite.defs.adopt(grad);
        return this;
    }
    _draw (el, fill = true) {
        if (this.stroke.color !== "none") {
            el.setAttr("stroke", this.stroke.color);
            if (this.stroke.thickness !== 1)
                el.setAttr("stroke-width", this.stroke.thickness);
            if (this.stroke.alpha !== 1)
                el.setAttr("stroke-opacity", this.stroke.alpha);
            if (this.stroke.cap !== "butt")
                el.setAttr("stroke-linecap", this.stroke.cap);
            if (this.stroke.join !== "miter")
                el.setAttr("stroke-linejoin", this.stroke.join);
            if (this.stroke.dash.length > 0)
                el.setAttr("stroke-dasharray", this.stroke.dash.join(","));
        }
        if (fill) {
            el.setAttr("fill", this.fill.color);
            if (this.fill.alpha !== 1)
                el.setAttr("fill-opacity", this.fill.alpha);
        }
        this.sprite.adopt(el);
        return this;
    }
    /**
     * Crée et mémorise un dégradé linéaire
     * @param name identifiant du dégradé
     * @param colors liste des noms de couleurs
     * @param alphas liste des alphas entre 0 et 1
     * @param pos liste des positions entre 0 et 1
     * @param x1 début horzontal du dégradé
     * @param y1 début vertical du dégradé
     * @param x2 fin horizontale du dégradé
     * @param y2 fon verticale du dégradé
     */
    createLinearGradient (name, colors, alphas, pos, x1, y1, x2, y2) {
        let grad = new SvgEl("linearGradient", "id", name, "x1", x1, "x2", x2, "y1", y1, "y2", y2);
        return this._addGrad(grad, colors, alphas, pos);
    }
    /**
     * Crée et mémorise un dégradé radial
     * @param name identifiant du dégradé
     * @param colors liste des noms de couleurs
     * @param alphas liste des alphas entre 0 et 1
     * @param pos liste des positions entre 0 et 1
     * @param cx centre x du dégradé
     * @param cy centre y du dégradé
     * @param radius rayon du dégradé
     */
    createRadialGradient (name, colors, alphas, pos, cx, cy, radius) {
        let grad = new SvgEl("radialGradient", "id", name, "cx", cx, "cy", cy, "r", radius);
        return this._addGrad(grad, colors, alphas, pos);
    }
    /**
     * Définit l'apparence du remplissage
     * @param color couleur du fond
     * @param alpha transparence du fond
     */
    beginFill (color = "none", alpha = 1) {
        this.fill.style(color, alpha);
        return this;
    }
    /**
     * Choisit un dégradé de remplissage
     * @param gradientName identifiant du dégradé
     */
    beginGradientFill (gradientName) {
        this.fill.style("url(#" + gradientName + ")", 1);
        return this;
    }
    /**
     * Définit le style de bordure du dessin en cours
     * @param thickness épaisseur du trait
     * @param color couleur du trait
     * @param alpha transparence du trait
     * @param caps bout du trait ("butt" = ras | "square" = carré | "round" = rond)
     * @param join coin du trait ("miter" =pointu | "round"=arrondi | "bevel" = biseauté)
     * @param dash longueurs des pointillés
     */
    lineStyle (thickness = 1, color = "none", alpha = 1, caps = "butt", join = "miter", dash = []) {
        this.stroke.strokeStyle(thickness, color, alpha, caps, join, dash);
        return this;
    }
    /**
     * Choisit un dégradé de bordure
     * @param thickness épaisseur de la bordure
     * @param gradientName identifiant du dégradé
     */
    lineGradientStyle (thickness = 1, gradientName) {
        this.stroke.strokeStyle(thickness, "url(#" + gradientName + ")", 1, "butt", "miter", []);
        return this;
    }
    /**
     * Déplace le curseur de dessin
     * @param x position horizontale
     * @param y position verticale
     */
    moveTo (x, y) {
        return this.addToPath("M", x, y);
    }
    /**
     * Courbe de bezier quadratique
     * @param ax ancre x
     * @param ay ancre y
     * @param x position horizontale
     * @param y position verticale
     */
    curveTo (ax, ay, x, y) {
        return this.addToPath("Q", ax, ay, x, y);
    }
    /**
     *
     * @param ax ancre x
     * @param ay ancre y
     * @param bx seconde ancre x
     * @param by seconde ancre y
     * @param x position de fin horizontale
     * @param y position de fin verticale
     */
    cubicCurveTo (ax, ay, bx, by, x, y) {
        return this.addToPath("C", ax, ay, bx, by, x, y);
    }
    /**
     * Définit une suite de segments dans un chemin
     * @param coords coordonnées par couple x,y
     */
    lineTo (x, y, ...coords) {
        return this.addToPath("L", ...coords);
    }
    /**
     * Termine le circuit du chemin (en revenant au point de départ)
     */
    closePath () {
        if (this.path !== undefined) {
            this.addToPath("Z");
            this._draw(this.path);
        }
        this.path = undefined;
        return this;
    }
    /**
     * Affiche le chemin en cours (sans revenir au point de départ)
     */
    drawPath () {
        if (this.path !== undefined) {
            this._draw(this.path);
        }
        this.path = undefined;
        return this;
    }
    /**
     *
     * @param cx
     * @param cy
     * @param radius
     */
    drawCircle (cx, cy, radius) {
        let el = new SvgEl("circle", "cx", cx, "cy", cy, "r", radius);
        return this._draw(el);
    }
    /**
     *
     * @param cx
     * @param cy
     * @param rx
     * @param ry
     */
    drawEllipse (cx, cy, rx, ry) {
        let el = new SvgEl("circle", "cx", cx, "cy", cy, "rx", rx, "ry", ry);
        return this._draw(el);
    }
    /**
     *
     * @param x position horizontale
     * @param y position verticale
     * @param width
     * @param height
     */
    drawRect (x, y, width, height) {
        let el = new SvgEl("rect", "x", x, "y", y, "width", width, "height", height);
        return this._draw(el);
    }
    /**
     *
     * @param x position horizontale
     * @param y position verticale
     * @param width
     * @param height
     * @param rx
     * @param ry
     */
    drawRoundRect (x, y, width, height, rx, ry) {
        let el = new SvgEl("rect", "x", x, "y", y, "width", width, "height", height, "rx", rx, "ry", ry || rx);
        return this._draw(el);
    }
    /**
     *
     * @param coords
     */
    drawPolygon (...coords) {
        let el = new SvgEl("polygon", "points", coords.join(" "));
        return this._draw(el);
    }
    /**
     *
     * @param coords
     */
    drawSegments (...coords) {
        let el = new SvgEl("polyline", "points", coords.join(" "));
        return this._draw(el, false);
    }
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    drawLine (x1, y1, x2, y2) {
        let el = new SvgEl("line", "x1", x1, "y1", y1, "x2", x2, "y2", y2);
        return this._draw(el, false);
    }
}

// ============================= filter.js ==================================

class SvgFilter extends SvgEl {
    constructor (id, type, ...attrs) {
        super("filter", "id", id, "filterUnits", "objectBoundingBox", "width", "1.4", "height", "1.4");
        this.id = id;
        this.createChild(type, ...attrs);
    }
    specularLight (input, result, lightColor, exponent = 10, constant = 1, scale = 1) {
        let sl = new SpecularLight(input, result, lightColor, exponent, constant, scale);
        this.adopt(sl);
        return sl;
    }
    /**
     * feBlend
     * @param input1
     * @param input2
     * @param result
     * @param mode
     */
    blend (input1, input2, result = "", mode = "normal") {
        return this.createChild("feBlend", "in", input1, "in2", input2, "mode", mode, "result", result);
    }
    blur (distance, input = "", ...params) {
        return this.createChild("feGaussianBlur", "stdDeviation", distance, "in", input, ...params);
    }
    color (input, result, type, ...values) {
        return this.createChild("feColorMatrix", "input", input, "result", result, "type", type, "values", values);
    }
    /**
     * feComposite
     * @param input
     * @param input2
     * @param result
     * @param operator
     * @param params
     */
    composite (input, input2, result, operator, ...params) {
        return this.createChild("feComposite", "in", input, "in2", input2, "result", result, "operator", operator, ...params);
    }
    /**
     * feComposite arithmetic
     * @param input
     * @param input2
     * @param result
     * @param k1
     * @param k2
     * @param k3
     * @param k4
     */
    composeArithmetic (input, input2, result, k1, k2, k3, k4) {
        return this.createChild("feComposite", "in", input, "in2", input2, "result", result, "operator", "arithmetic", "k1", k1, "k2", k2, "k3", k3, "k4", k4);
    }
    /**
     * feFlood
     * @param color
     * @param params
     */
    flood (color, ...params) {
        return this.createChild("feFlood", "flood-color", color, ...params);
    }
    /**
     * feMerge
     * @param layer1
     * @param layer2
     */
    merge (layer1, layer2) {
        let mg = new SvgEl("feMerge");
        mg.createChild("feMergeNode", "in", layer1);
        mg.createChild("feMergeNode", "in", layer2);
        this.adopt(mg);
        return mg;
    }
    /**
     * feMorphology
     * @param input
     * @param result
     * @param operator
     * @param radius
     */
    morphology (input, result, operator, radius) {
        return this.createChild("feMorphology", "in", input, "operator", operator, "radius", radius, "result", result);
    }
    /**
     * feOffset
     * @param dx
     * @param dy
     * @param result
     * @param input
     */
    offset (dx, dy, result, input = "") {
        return this.createChild("feOffset", "dx", dx, "dy", dy, "in", input, "result", result);
    }
    specularLightning () {
    }
    applyOn (el) {
        if (el.base == undefined)
            return;
        el.base.defs.adopt(this);
        el.setAttr("filter", "url(#" + this.id + ")");
        return this;
    }
    remove (el) {
        if (el.base == undefined)
            return;
        el.base.defs.abandon(this);
        el.delAttr("filter");
    }
}
class BlurFilter extends SvgFilter {
    constructor (distance, ...params) {
        super("blur", "feGaussianBlur", "stdDeviation", distance, ...params);
    }
    get distance () { return this.getAttrN("stdDeviation"); }
    set distance (value) { this.setAttr("stdDeviation", value); }
}
class SvgLight extends SvgEl {
    constructor (type, input, result, color) {
        super(type, 'in', input, "result", result, "lighting-color", color);
    }
    /**
     * https://vanseodesign.com/web-design/svg-lighting-filters-light-sources/ : voir schéma !
     * Exemple : le soleil qui brille et éclaire tout
     * @param azimuth direction angle on the XY plane (0°-360°) (direction de la lumière)
     * @param elevation hauteur de la source lumineuse (0°= au sol - 90°= à la verticale)
     */
    addDistantLight (azimuth, elevation) {
        return this.adopt(new SvgEl("feDistantLight", "azimuth", azimuth, "elevation", elevation));
    }
    /**
     * Ampoule de lumière qui iradie autout d'elle
     * @param x position x de la source lumineuse
     * @param y position y de la source lumineuse
     * @param z position z de la source lumineuse (z positif = vers l'observateur - négatif vers le fond de l'écran)
     */
    addPointLight (x, y, z) {
        return this.adopt(new SvgEl("fePointLight", "x", x, "y", y, "z", z));
    }
    /**
     * Spot lumineux sur une scène non éclairée
     * @param x position x de la source lumineuse
     * @param y position y de la source lumineuse
     * @param z position z de la source lumineuse (z positif = vers l'observateur - négatif vers le fond de l'écran)
     * @param x direction x de la source lumineuse
     * @param y direction y de la source lumineuse
     * @param z direction z de la source lumineuse
     * @param angle largeur du cone de diffusion de la lumère en degrés
     * @param focus concentration du point lumineux (1 par défaut ou plus)
     */
    addSpotLight (x, y, z, dx, dy, dz, angle, focus) {
        this.setAttr("specularExponent", focus); // paramètre du filtre (et non du spot)
        return this.adopt(new SvgEl("feSpotLight", "x", x, "y", y, "z", z, "pointsAtX", dx, "pointsAtY", dy, "pointsAtZ", dz, "limitingConeAngle", angle));
    }
}
class DiffuseLight extends SvgLight {
    /**
     * Le spectateur voit le reflet réparti sur la surface touchée. Surface rugueuse.
     * @param input
     * @param result
     * @param color
     * @param constant the final RGB value of a given pixel and the brighter your lighting-color, the smaller you want this number to be.
     * @param scale The height of the surface for an alpha value of 1. It’s a factor that is multiplied by the alpha value. The default value is 1.
     */
    constructor (input, result, color, constant = 1, scale = 1) {
        super("feDiffuseLighting", input, result, color);
        this.setAttr("surfaceScale", scale, "diffuseConstant", constant);
    }
}
class SpecularLight extends SvgLight {
    /**
     * Le spectateur voit le reflet de la lumière concentré sur un point. Surface lisse.
     * @param input
     * @param result
     * @param lightColor
     * @param exponent
     * @param constant
     * @param scale
     */
    constructor (input, result, lightColor, exponent = 10, constant = 1, scale = 1) {
        super("feSpecularLighting", input, result, lightColor);
        this.setAttr("surfaceScale", scale, "specularConstant", constant, "specularExponent", exponent);
    }
}
class BevelFilter extends SvgFilter {
    constructor (color, azimuth, blurX, blurY, elevation, erosion, sharpeness, k1, k2, k3, k4) {
        super("bevel", "feGaussianBlur", "stdDeviation", `${blurX} ${blurY}`, "in", "SourceAlpha", "result", "BLURED");
        this.setAttr("id", "bevel");
        this.specularLight("BLURED", "LIGHTED", color, erosion, sharpeness).addDistantLight(azimuth, elevation);
        this.composeArithmetic("SourceAlpha", "LIGHTED", "COMPOSITE", k1, k2, k3, k4);
        this.merge("SourceGraphic", "COMPOSITE");
    }
}
class BevelLightFilter extends SvgFilter {
    constructor (blur = 4, color = "white", x = 20, y = 20, z = 20, exponent = 30, constant = 0.75, k1 = 1, k2 = 1, k3 = 0, k4 = 0) {
        super("bvl1", "feGaussianBlur", "stdDeviation", blur, "result", "blur");
        this.specularLight("blur", "specOut", color, exponent, constant).addPointLight(x, y, z);
        this.composite("specOut", "SourceAlpha", "specOut", "in");
        this.composeArithmetic("SourceGraphic", "specOut", "", k1, k2, k3, k4);
    }
}
class DropShadowFilter extends SvgFilter {
    /**
     * Définit une ombre portée sous le dessin
     * @param dx décalage horizontal
     * @param dy décalage vertical
     * @param color couleur (avec transparence !)
     * @param blur amplitude du flou
     */
    constructor (dx = 3, dy = 3, color = "#0006", blur = 2) {
        super("drop-shadow", "feGaussianBlur", "stdDeviation", blur, "in", "SourceAlpha");
        this.offset(dx, dy, "offsetblur");
        this.flood(color, "result", "colored");
        this.composite("colored", "offsetblur", "shadowed", "in");
        this.merge("shadowed", "SourceGraphic");
    }
}
class EmbossFilter extends SvgFilter {
    constructor (blur, azimuth = 45, elevation = 45) {
        super("emboss", "feGaussianBlur", "stdDeviation", blur, "in", "SourceAlpha", "result", "blur");
        this.specularLight("blur", "spec", "white", 16, 1, -3).addDistantLight(azimuth, elevation);
        this.composite("SourceGraphic", "spec", "specOut", "out");
    }
}
class MorphFilter extends SvgFilter {
    constructor (operator, radius) {
        super("feMorphology", "operator", operator, "radius", radius);
    }
}
class OutlineFilter extends SvgFilter {
    constructor (strokeColor, strokeWidth) {
        super("outine", "feFlood", "flood-color", strokeColor, "result", "floodRect");
        this.morphology("SourceAlpha", "expandedMask", "dilate", strokeWidth);
        this.composite("floodRect", "expandedMask", "expandedColored", "in");
        this.blend("SourceGraphic", "expandedColored");
    }
}

// ======================================= textfield.js ===================================

/**
 * Classe de formatage
 * indépendante de l'élément sur lequel elle s'applique
 */
class SVGFormat {
    constructor () {
        this.font = "verdana";
        this.size = 14;
        this.color = "black";
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.smallCaps = false;
        // Paragraphe
        this.align = "left";
        this.lineHeight = 20;
        this.padLeft = 4;
        this.padTop = 2;
        this.padRight = 4;
        this.padBottom = 4;
    }
    applyOn (el) {
        el.setAttr("font-family", this.font, "font-size", this.size, "fill", this.color);
        this.bold ? el.setAttr("font-weight", "bold") : el.delAttr("font-weight");
        this.italic ? el.setAttr("font-style", "italic") : el.delAttr("font-style");
        this.underline ? el.setAttr("text-decoration", "underline") : el.delAttr("text-decoration");
        this.smallCaps ? el.setAttr("font-variant", "small-caps") : el.delAttr("font-variant");
    }
    change (prop, value, el) {
        switch (prop) {
            case "font":
                this.font = value;
                break;
            case "size":
                this.size = value;
                break;
            case "color":
                this.color = value;
                break;
            case "bold":
                this.bold = value;
                break;
            case "italic":
                this.italic = value;
                break;
            case "underline":
                this.underline = value;
                break;
            case "smallCaps":
                this.smallCaps = value;
                break;
            case "lineHeight":
                this.lineHeight = value;
                break;
            case "padLeft":
                this.padLeft = value;
                break;
            case "padTop":
                this.padTop = value;
                break;
            case "padRight":
                this.padRight = value;
                break;
            case "padBottom":
                this.padBottom = value;
                break;
            case "align":
                this.align = value;
                break;
        }
        this.applyOn(el);
    }
}
/**
 * TextField (zone d'affichage du texte)
 * contenant un SVGBlock
 */
class SVGField extends SvgBase {
    constructor () {
        super(document.body);
        this.viewBox = [0, 0, 0, 0];
        this.multiline = false;
        this.wordwrap = false;
        /**
         * Longueur maximale (-1 = pas de limites)
         */
        this.maxLength = -1;
        this.format = new SVGFormat();
        this.block = new SVGBlock(this);
        this.setCss("position", "absolute");
    }
    update () {
        if (this.viewBox)
            this.sel.setAttribute("viewBox", this.viewBox.join(" "));
        if (this.block)
            this.text = this.block.content;
    }
    write (x, y, txt) {
    }
    /**
     * Modifie la couleur du [fond|bord|texte] suivant la position du curseur
     * @param type changer quoi ? bg = fond | bdr = bord | txt = text
     * @param out couleur de sortie du champ (souris ailleurs)
     * @param over couleur de survol du champ (souris relâchée)
     * @param down couleur de souris enfoncée dans le champ
     */
    changeColor (type, out, over, down) {
        const ev = ["out", "over", "down", "up"], coul = [out, over, down, over];
        ev.forEach((e, i) => this.sel.addEventListener("mouse" + e, () => changer(this, i)));
        changer(this); // la souris est out !
        function changer (f, i = 0) {
            switch (type) {
                case "bdr":
                    f.borderColor = coul[i];
                    break;
                case "bg":
                    f.backgroundColor = coul[i];
                    break;
                case "txt": f.color = coul[i];
            }
        }
    }
    /**
     * Sélectionne une partie du texte (s'il est multiligne)
     * @param line index de la ligne (première = 0)
     * @param index indice du caractère de début de la sélection
     * @param nbCars nombre de caractères à sélectionner
     */
    selectChars (line, index, nbCars) {
        this.block.spans[line].metrics.selectChars(index, nbCars);
    }
    /**
     * Sélectionne une partie du texte
     * @param index indice du caractère de début de la sélection
     * @param nbCars nombre de caractères à sélectionner
     */
    select (index, nbCars) {
        this.block.metrics.selectChars(index, nbCars);
    }
    /**
     * Définit le format simple du texte
     * @param fontName nom de la police
     * @param size taille des caractères
     * @param color couleur du texte
     * @param align alignement en anglais
     */
    setTextFormat (fontName, size, color, align) {
        this.font = fontName;
        this.size = size;
        this.color = color;
        this.align = align;
    }
    /**
     * Définit la zone d'affichage
     * @param x gauche
     * @param y haut
     * @param w largeur
     * @param h hauteur
     */
    setRect (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    get x () {
        return this.viewBox[0];
    }
    set x (value) {
        this.viewBox[0] = value;
        this.setCss("left", value + "px");
    }
    get y () {
        return this.viewBox[1];
    }
    set y (value) {
        this.viewBox[1] = value;
        this.setCss("top", value + "px");
    }
    get width () {
        return this.viewBox[2];
    }
    set width (value) {
        this.viewBox[2] = value;
        this.setAttr("width", `${value}`);
    }
    get height () {
        return this.viewBox[3];
    }
    set height (value) {
        this.viewBox[3] = value;
        this.setAttr("height", `${value}`);
    }
    get backgroundColor () {
        return this.getCss("background-color");
    }
    set backgroundColor (value) {
        this.setCss("background-color", value);
    }
    get borderColor () {
        return window.getComputedStyle(this.sel).borderColor || "";
    }
    set borderColor (value) {
        this.setCss("border", "1px solid " + value);
    }
    get font () {
        return this.format.font;
    }
    set font (value) {
        this.format.change("font", value, this);
    }
    get size () {
        return this.format.size;
    }
    set size (value) {
        this.format.change("size", value, this);
    }
    get color () {
        return this.format.color;
    }
    set color (value) {
        this.format.change("color", value, this);
    }
    get align () {
        return this.format.align;
    }
    set align (value) {
        this.format.change("align", value, this);
    }
    get bold () {
        return this.format.bold;
    }
    set bold (value) {
        this.format.change("bold", value, this);
    }
    get italic () {
        return this.format.italic;
    }
    set italic (value) {
        this.format.change("italic", value, this);
    }
    get underline () {
        return this.format.underline;
    }
    set underline (value) {
        this.format.change("underline", value, this);
    }
    get smallCaps () {
        return this.format.smallCaps;
    }
    set smallCaps (value) {
        this.format.change("smallCaps", value, this);
    }
    get lineHeight () {
        return this.format.lineHeight;
    }
    set lineHeight (value) {
        this.format.change("lineHeight", value, this);
    }
    get padLeft () {
        return this.format.padLeft;
    }
    set padLeft (value) {
        this.format.change("padLeft", value, this);
    }
    get padRight () {
        return this.format.padRight;
    }
    set padRight (value) {
        this.format.change("padRight", value, this);
    }
    get padTop () {
        return this.format.padTop;
    }
    set padTop (value) {
        this.format.change("padTop", value, this);
    }
    get padBottom () {
        return this.format.padBottom;
    }
    set padBottom (value) {
        this.format.change("padBottom", value, this);
    }
    get text () {
        return this.block.text;
    }
    set text (value) {
        value = this.maxLength > -1 ? value.substring(0, this.maxLength) : value;
        this.block.text = value;
    }
    get selectable () {
        return this.block.getCss("user-select") !== "none";
    }
    set selectable (value) {
        value ? this.block.delCss("user-select") : this.block.setCss("user-select", "none");
    }
    get editable () {
        return this.cursor == "text" && this.selectable == true;
    }
    set editable (value) {
        const tf = this, svg = tf.svg;
        if (value) {
            this.selectable = true;
            this.mouseEnabled = true;
            this.cursor = "text";
            svg.addEventListener("mousedown", startEdit);
        }
        else {
            this.selectable = false;
            this.cursor = "";
            svg.removeEventListener("mousedown", startEdit);
        }
        function startEdit (e) {
            if (tf.editable)
                new Edition(tf, e);
        }
    }
}
/**
 * Zone du SvgField contenant le texte et associé à :
 * - un groupe de textes (spans) ou un texte seul : SVGTextElement
 * - des informations de paragraphe : LineMetrics (marges, interlignes,...)
 */
class SVGBlock extends SvgEl {
    constructor (field) {
        super("text");
        this.field = field;
        this.spans = [];
        this.content = "";
        this.group = this.sel;
        this.group.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
        this.field.adopt(this);
        this.metrics = new LineMetrics(this.group, this.field.svg);
    }
    /**
     * Nombre de lignes maximum en fonction de la hauteur et des marges
     */
    get numMaxLines () {
        let fm = this.field.format;
        return Math.floor((this.field.height - (fm.padTop + fm.padBottom)) / fm.lineHeight);
    }
    /**
     * Texte à afficher
     */
    get text () {
        return this.content;
    }
    set text (value) {
        this.content = value;
        if (this.field.multiline === false) { // Le texte n'est pas multiligne :
            this.group.textContent = this.content; // on ne crée pas de spans.
            this.setAttr("y", this.field.viewBox[1] + this.field.format.lineHeight + this.field.format.padTop);
        }
        else { // Le texte est multiligne : on crée des spans 
            this.field.wordwrap ? this.breakText(this.content) : this.createLines(this.content);
        }
        this.align(this.field.align); // une fois le texte affiché, on l'aligne horizontalement
    }
    /**
     * Affiche des lignes texte où les retours sont forcés dans le texte
     * @param t texte à découper en lignes terminées par \n
     */
    createLines (t) {
        let lgnText = t.split('\n'), max = this.numMaxLines;
        this.group.innerHTML = "", this.spans = [];
        for (let i = 0; i < Math.min(lgnText.length, max); i++) {
            new SVGSpan(this, lgnText[i], i);
        }
    }
    /**
     * Coupe un texte long en tranches(lignes) de la bonne largeur
     * @param t texte à découper en lignes
     */
    breakText (t) {
        /**
         * availableWidth
         */
        const aw = this.availableWidth;
        // avec retour automatique la longueur est fixée par la taille disponible
        this.group.innerHTML = "", this.spans = [];
        // construit et remplit une ligne, la formate, l'ajoute au groupe (pour la mesurer)
        const testLine = new SvgEl("tspan"), testSpan = testLine.sel;
        testSpan.textContent = t;
        this.field.format.applyOn(testLine);
        this.group.appendChild(testSpan); // est-ce utile ? oui ! sinon pas de mesure !
        // La Métrique, la Métrique, je veux l'avoir, et je l'aurai... 
        const metrics = new LineMetrics(testSpan, this.field.svg), slices = metrics.slices(aw);
        if (metrics.textWidth <= this.availableWidth) {
            this.group.textContent = t; // une seule ligne ?
            this.setAttr("y", this.field.viewBox[1] + this.field.format.lineHeight + this.field.format.padTop);
        }
        else {
            for (let i = 0; i < Math.min(slices.length, this.numMaxLines); i++) {
                new SVGSpan(this, slices[i], i);
            }
        }
        this.group.removeChild(testSpan);
    }
    align (side) {
        if (this.spans.length) {
            this.spans.forEach(s => s.align(side));
        }
        else {
            let f = this.field, fmt = f.format, dx = f.viewBox[0], cx = dx + f.width / 2, fx = dx + f.width;
            switch (side) {
                case "left":
                    this.setAttr("x", dx + fmt.padLeft);
                    break;
                case "center":
                    this.setAttr("x", cx - (this.lineWidth / 2));
                    break;
                case "right":
                    this.setAttr("x", fx - (fmt.padRight + this.lineWidth));
                    break;
            }
        }
    }
    /**
     * Longueur réelle de la ligne en pixels
     */
    get lineWidth () {
        return this.group.getComputedTextLength();
    }
    /**
     * Longueur maximum de la ligne en pixels
     */
    get availableWidth () {
        return this.field.width - this.field.padLeft + this.field.padRight;
    }
}
/**
 * Ligne d'affichage (SVGTSpanElement) dans un SVGBlock
 */
class SVGSpan extends SvgEl {
    constructor (block, texte, num) {
        super("tspan");
        this.block = block;
        this.num = num;
        this.content = "";
        this.tspan = this.sel;
        this.block.group.appendChild(this.tspan);
        block.spans.push(this);
        this.text = texte;
        this.metrics = new LineMetrics(this.tspan, this.block.field.svg);
    }
    /**
     * Aligne chaque ligne par rapport à un côté
     * @param side définit le côté sur lequel on aligne le texte
     */
    align (side) {
        let f = this.block.field, fmt = f.format, dx = f.viewBox[0], cx = dx + f.width / 2, fx = dx + f.width;
        switch (side) {
            case "left":
                this.setAttr("x", dx + fmt.padLeft);
                break;
            case "center":
                this.setAttr("x", cx - (this.lineWidth / 2));
                break;
            case "right":
                this.setAttr("x", fx - (fmt.padRight + this.lineWidth));
                break;
        }
        this.setAttr("y", f.viewBox[1] + fmt.padTop + ((this.num + 1) * fmt.lineHeight));
    }
    /**
     * Longueur de la ligne en pixels
     */
    get lineWidth () {
        return this.tspan.getComputedTextLength();
    }
    /**
     * Texte de la ligne
     */
    get text () { return this.tspan.textContent || ""; }
    set text (value) { this.tspan.textContent = value; }
}
class LineMetrics {
    constructor (el, svg) {
        this.el = el;
        this.svg = svg;
    }
    /**
     * l'index du caractère à un point précis
     * @param x position horizontale du caractère
     * @param y position verticale du caractère
     */
    charIndexAt (x, y) {
        return this.el.getCharNumAtPosition(this.pt(x, y));
    }
    pt (x, y) {
        const p = this.svg.createSVGPoint();
        p.x = x, p.y = y;
        return p;
    }
    /**
     * Position de la gauche d'un caractère
     * @param index index du caractère choisi
     */
    charDx (index) {
        if (index < 0)
            return 0;
        return this.el.getStartPositionOfChar(index).x;
    }
    /**
     * Position du haut d'un caractère
     * @param index index du caractère choisi
     */
    charDy (index) {
        if (index < 0)
            return 0;
        return this.el.getStartPositionOfChar(index).y;
    }
    /**
     * Position de la droite d'un caractère
     * @param index index du caractère choisi
     */
    charFx (index) {
        if (index < 0)
            return 0;
        return this.el.getEndPositionOfChar(index).x;
    }
    /**
     * Position du bas d'un caractère
     * @param index index du caractère choisi
     */
    charFy (index) {
        if (index < 0)
            return 0;
        return this.el.getEndPositionOfChar(index).y;
    }
    /**
     * Rectangle de délimitation d'un caractère
     * @param index index du caractère choisi
     */
    charRect (index) {
        return this.el.getExtentOfChar(index);
    }
    /**
     * Angle de rotation d'un caractère
     * @param index index du caractère
     */
    charRotation (index) {
        return this.el.getRotationOfChar(index);
    }
    /**
     * Longueur en pixels d'une sous-chaîne
     * @param index index du caractère de départ
     * @param nbCars nombre de caractères à prendre
     */
    substringWidth (index, nbCars) {
        return this.el.getSubStringLength(index, nbCars);
    }
    /**
     * Sélectionne une partie de la chaîne
     * @param index index du caractère de départ
     * @param nbCars nombre de caractères à prendre
     */
    selectChars (index, nbCars) {
        this.el.selectSubString(index, nbCars);
    }
    /**
     * Découpe le texte formaté en tranches et renvoie les chaînes
     * @param availableWidth largeur max de chaque tranche de texte
     */
    slices (availableWidth) {
        let cut = [], debut = 0, fin = 0, premier = 0, lg = 0, t = this.content, spc = [];
        for (let i = 0; i < t.length; i++) {
            if (t.charCodeAt(i) === 32) {
                fin = this.charFx(i);
                lg = fin - debut;
                spc.push({ index: i, apres: fin });
                if (lg > availableWidth) {
                    let prec = spc[spc.length - 2];
                    cut.push(t.substring(premier, prec.index));
                    debut = prec.apres;
                    premier = prec.index + 1;
                }
            }
        }
        cut.push(t.substr(premier, t.length - premier)); // la dernière ligne...
        return cut;
    }
    /**
     * Index du dernier caractère (minimum =0)
     */
    get last () {
        return this.el.getNumberOfChars() - 1;
    }
    /**
     * Longueur du texte en pixels
     */
    get textWidth () {
        return this.el.getComputedTextLength();
    }
    /**
     * Texte contenu dans l'élément
     */
    get content () {
        return this.el.textContent || "";
    }
}

class SvgMenu extends SVGField {
    constructor (text, x, y, lg, charSize, callback) {
        super();
        this.callback = callback;
        this.children = [];
        this.siblings = [];
        this.setRect(x, y, lg, charSize + 10);
        this.setTextFormat("calibri", charSize, "#66F", "left");
        this.text = text;
        this.lineHeight = charSize;
        this.block.mouseEnabled = false;
        this.selectable = false;
        this.padLeft = 15;
        this.cursor = "pointer";
        this.changeColor("bg", "#CCE", "#EEE", "#66E");
        this.changeColor("txt", "#66E", "#55E", "#DDE");
        this.siblings.push(this);
        this.sel.addEventListener("click", e => this.onClick(e));
        this.sel.addEventListener("mouseover", e => this.show());
        this.sel.addEventListener("mouseout", e => this.hide());
        
        new DropShadowFilter(2, 2, "#0078", 2).applyOn(this);
    }
    show () {
        if (this.parent) {
            // je suis un enfant : on affiche mes frères et moi
            this.parent.show();
        }
        else {
            // je suis un parent : on affiche mes enfants mais pas les autres
            this.children.forEach(item => item.visible = true);
            this.siblings.filter(b => b !== this).forEach(brother => brother.hide());
        }
    }
    hide () {
        if (this.parent) {
            // je suis un enfant : on cache mes frères et moi
            this.parent.hide();
        }
        else {
            // je suis un parent : on cache mes enfants
            this.children.forEach(item => item.visible = false);
        }
    }
    onClick (e) {
        if (this.parent) {
            // je suis un enfant : on exécute et on ferme
            this.callback(e, this);
            this.parent.hide();
        }
        else {
            // je suis un parent : on inverse l'affichage
            this.children.forEach(item => item.visible = !item.visible);
        }
    }
    addSibling (idBrother, ...children) {
        let brother = new SvgMenu(idBrother, this.x + this.width, this.y, this.width, this.height - 10, this.callback);
        brother.addItems(...children);
        this.siblings.push(brother);
        this.siblings.forEach(bro => bro.siblings = this.siblings);
        return brother;
    }
    addItems (...children) {
        children.forEach((t, i) => {
            let item = new SvgMenu(t, this.x, this.y + ((i + 1) * this.height), this.width, this.height - 10, this.callback);
            item.parent = this;
            this.children.push(item);
            item.visible = false;
        });
        this.padLeft = 5;
        this.align = "left";
        this.changeColor("bg", "#AAE", "#DDE", "#88E");
    }
}
class SvgButton extends SVGField {
    constructor (txt, x, y, lg, charSize, callback) {
        super();
        this.setRect(x, y, lg, charSize * 1.5);
        this.setTextFormat("cambria", charSize, "#66F9", "center");
        this.text = txt;
        this.lineHeight = charSize;
        this.selectable = false;
        this.cursor = "pointer";
        this.borderColor = "#66F9";
        this.changeColor("bg", "#CCE9", "#EEE9", "#66E9");
        this.changeColor("txt", "#66E9", "#55E9", "#DDE9");
        this.sel.addEventListener("click", e => callback(e, this));
    }
}

// ======================================= ligne.js ======================================

window.onload = () => {

    let titre = new SVGField();
    titre.x = 2;
    titre.y = 2;
    titre.width = 930;
    titre.height = 55;
    titre.lineHeight = 42;
    titre.font = "cambria";
    titre.size = 50;
    titre.color = "#66F";
    titre.italic = true;
    titre.smallCaps = true;
    titre.align = "center";
    titre.padRight = 12;
    titre.backgroundColor = "#CCF";
    titre.text = "SVGField for ever !";
    titre.selectable = false;

    let chanson = new SVGField();
    chanson.setRect(600, 88, 300, 200);
    chanson.setTextFormat("calibri", 18, "#CCCCFF", "right");
    chanson.text = "Je suis venu te dire\nQue je m'en vais\nEt tes larmes\nN'y pourront rien changer...\nComme dit si bien Verlaine\nAu vent mauvais :\nJe suis venu te dire\nQue je m'en vais...";
    chanson.padBottom = 22;
    chanson.lineHeight = 22;
    chanson.backgroundColor = "black";
    chanson.borderColor = "#66F";
    chanson.multiline = true;
    chanson.italic = true;
    chanson.selectable = false;

    const btn = new SvgButton("Sommaire", 15, 550, 269, 56, () => { });
    const dx = 290, dy = 550, lgBtn = 155, charSiz = 25;
    let btns = ["Button", "Menu", "InputText", "Counter", "SelectList", "ComboList", "CheckBox", "RadioButtons"];
    btns.forEach((t, i) => new SvgButton(t, dx + (i % 4 * 160), dy + Math.floor(i / 4) * 46, lgBtn, charSiz, (e, b) => titre.text = b.text));
    
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const loremInfo = "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte.";
    let info = new SVGField();
    info.setRect(14, 90, 550, 450);
    info.setTextFormat("calibri", 17, "blue", "left");
    info.backgroundColor = "#FFCC99";
    info.lineHeight = 25;
    info.multiline = true;
    info.wordwrap = true;
    info.text = lorem + " ----------- " + loremInfo;
    info.align = "left";

    let dessin = new SVGSprite();
    dessin.x = 950;
    dessin.y = 100;
    dessin.setSize(350, 200);
    let gr = dessin.graphics;
    gr.createLinearGradient("drawBorder", ["brown", "white", "black"], [1, 0.5, 1], [0.0, 0.25, 1.0], 0, 0, 0, 1);
    gr.createLinearGradient("ital",
        ["green", "green", "white", "white", "red", "red"],
        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        [0, 0.34, 0.34, 0.66, 0.66, 1],
        0, 0.5, 1, 0.5);
    gr.lineStyle(1, "black")
        .drawRect(0, 0, 350, 200)
        .lineStyle()
        .beginGradientFill("drawBorder")
        .drawRect(0, 0, 350, 25)
        .drawRect(0, 25, 350, 100);

    gr.beginGradientFill("ital").lineStyle(1, "brown", 1).drawRect(290, 170, 50, 20);
    let black = { x: 120, y: 80 }, white = { x: 100, y: 180 }, red = { x: 200, y: 180 }, green = { x: 150, y: 100 }, blue = { x: 260, y: 160 }, cyan = { x: 250, y: 100 };
    gr.moveTo(black.x, black.y)
        .curveTo(white.x, white.y, red.x, red.y)
        .cubicCurveTo(green.x, green.y, blue.x, blue.y, cyan.x, cyan.y)
        .closePath()
        .beginFill("black", 1)
        .drawCircle(black.x, black.y, 4)
        .beginFill("white", 1)
        .drawCircle(white.x, white.y, 4)
        .beginFill("red", 1)
        .drawCircle(red.x, red.y, 4)
        .beginFill("green", 1)
        .drawCircle(green.x, green.y, 4)
        .beginFill("blue", 1)
        .drawCircle(blue.x, blue.y, 4)
        .beginFill("cyan", 1)
        .drawCircle(cyan.x, cyan.y, 4);


    let sprite = new SVGSprite();
    sprite.setBounds(15, 650, 1024, 120);
    sprite.rect("width", 1024, "height", 40, "fill", "#000");
    sprite.rect("y", 40, "width", 1024, "height", 20, "fill", "#FF3");
    let phrase = sprite.text("Svg fields forever", 20, 96, "calibri", 140, "#F39", "font-weight", "bold");
    phrase.editable = false;
    
    let entree = new SVGField();
    entree.setRect(580, 400, 340, 36);
    entree.backgroundColor = "#FFFFCC";
    entree.borderColor = "black";
    entree.lineHeight = 25;
    entree.setTextFormat("verdana", 25, "blue", "left");
    entree.text = "ce champ pas encore éditable du tout !";
    entree.editable = false;

    let pages = new SvgMenu("Fichier", 934, 2, 120, 18, (e, m) => { titre.text = m.text; });
    pages.addItems("Nouveau", "Ouvrir", "Enregistrer", "Quitter");

    let mEdit = pages.addSibling("Édition", "Couper", "Copier", "Coller");
    mEdit.addSibling("Afficher", "Page", "Groupe", "Unité", "Détails", "Aide");
    
    new BevelLightFilter(2, "white", 5, 5, 1500, 30, 0.5, 1, 1, 0, 0).applyOn(titre);
    new BevelFilter("white", 45, 2, 2, 1, 11, 5, 3, 0, 0, 0).applyOn(btn);
    new BlurFilter(1.2).applyOn(chanson);
    new EmbossFilter(1, 45, 65).applyOn(phrase);
};


