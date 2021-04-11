"use strict";
/**
 * Script n°1 ::: OBJETS ::: en français
 *
 * FeuilleStyle :   Feuille de style générique
 * Prop         :   Propriété (réactive) d'un Obj
 * Obj          :   Gestionnaire de Prop_s (extends Map<string, Prop>)
 * Chrono       :   Gestionnaire d'événements temporisés répétitifs
 * Echelle      :   Valeur numérique bornée avec .reaction(.params)
 * Actif        :   Objet interactif avec .scene et .ecoutes[]
 * Visuel       :   Actif visualisable avec .parent et .css
 * Conteneur    :   Visuel de type .div avec .enfants[]
 * Scene        :   Arrière-plan avec visuel .enCours, .feuille de style et .suiviSouris
 * Format       :   Propriétés attribuables à une zone affichant du texte
 * Champ        :   Zone affichant du texte
 */
/**
 * Feuille de style générique
 */
class FeuilleStyle {
    /**
     * Feuille de style générique de la page
     */
    constructor() {
        this.nbRegles = 0;
        this.sheet = document.styleSheets.item(0);
        this.reguler("*", "position: absolute; box-sizing: border-box; margin: 0; padding: 0; pointer-events:auto");
        this.reguler("span", "pointer-events: none; user-select: none"); // reactif = false
        this.reguler("div", "user-select: none; overflow-hidden; scrollbar-width:20px;"); // selectionnable = false
    }
    /**
     * Définit une règle CSS
     * @param selecteur quel(s) sékecteur(s) concerné(s) par la règle ?
     * @param regle quelle règle
     * @param rang quel ordre dans la liste (les règles css dépendent d'un ordre)
     */
    reguler(selecteur, regle) {
        this.sheet.insertRule(`${selecteur} { ${regle}}`, this.nbRegles++);
    }
    /**
     * Crée une règle CSS à appliquer pour une classe : .classe
     * @param classe nom de la classe d'éléments (sans préfixe .)
     * @param regle règle à appliquer
     */
    siClasse(classe, regle) {
        this.reguler("." + classe, regle);
    }
    /**
     * Crée une règle CSS valable pour un identifiant : #nom
     * @param nom identifiant pour cette règle (sans préfixe #)
     * @param regle règle à appliquer
     */
    siId(nom, regle) {
        this.reguler("#" + nom, regle);
    }
    /**
     * Crée une règle CSS si un attribut existe : [attribut]
     * @param attrNom nom de l'attribut recherché
     * @param regle règle à appliquer si l'attribut existe
     */
    siAttribut(attrNom, regle) {
        this.reguler("[" + attrNom + "]", regle);
    }
    /**
     * Crée une règle CSS si un attribut a une valeur : [attr=val]
     * @param attrNom nom de l'attribut recherché
     * @param attrVal valeur de l'attribut
     * @param regle règle à appliquer si l'attribut existe
     */
    siAttrVaut(attrNom, attrVal, regle) {
        this.reguler(`[${attrNom}=${attrVal}]`, regle);
    }
    /**
     * Crée une règle CSS si un attribut commence par une valeur : [attr^=val]
     * @param attrNom nom de l'attribut recherché
     * @param attrVal valeur du début d'attribut
     * @param regle règle à appliquer si l'attribut existe
     */
    siAttrCommence(attrNom, attrVal, regle) {
        this.reguler(`[${attrNom}^=${attrVal}]`, regle);
    }
    /**
     * Crée une règle CSS si un attribut se termine par une valeur : [attr$=val]
     * @param attrNom nom de l'attribut recherché
     * @param attrVal valeur de la fin d'attribut
     * @param regle règle à appliquer si l'attribut existe
     */
    siAttrFinit(attrNom, attrVal, regle) {
        this.reguler(`[${attrNom}$=${attrVal}]`, regle);
    }
    /**
     * Crée une règle CSS si un attribut se termine par une valeur : [attr*=val]
     * @param attrNom nom de l'attribut recherché
     * @param attrVal valeur de l'attribut
     * @param regle règle à appliquer si l'attribut existe
     */
    siAttrContient(attrNom, attrVal, regle) {
        this.reguler(`[${attrNom}*=${attrVal}]`, regle);
    }
}
/**
 * Propriété (réactive) d'un Obj
 */
class Prop extends EventTarget {
    /**
     * Propriété active (et actualisée) d'un objet
     * @param obj objet auquel on rattache la propriété
     * @param id identifiant de la propriété
     * @param valeurDefaut valeur par défaut
     */
    constructor(obj, id, valeurDefaut) {
        super();
        this.obj = obj;
        this.id = id;
        this.val = valeurDefaut;
    }
    /**
     * valeur stockée : l'objet est actualisé à chaque changement
     */
    get valeur() {
        return this.val;
    }
    set valeur(value) {
        if (value != this.val) {
            this.val = value;
            this.dispatchEvent(new CustomEvent(this.id, { detail: this.obj }));
            this.obj.actualiser();
        }
    }
}
/**
 * Gestionnaire de Prop_s.
 * La méthode .actualiser() est appliquée à chaque changement
 */
class Obj extends Map {
    /**
     * Groupe de propriétés
     * @param id identifiant de l'objet
     */
    constructor(id) {
        super();
        this.id = id;
    }
    /**
     * Chaque fois qu'une Prop a changé, le contenu
     * de la fonction actualiser() est exécuté
     */
    actualiser() {
        // adapter à chaque situation
    }
    /**
     * Crée et ajoute une nouvelle Prop à l'objet
     * @param id identifiant de la propriété à ajouter
     * @param valeurDefaut valeur par défaut pour cette propriété
     */
    creerProp(id, valeurDefaut) {
        this.set(id, new Prop(this, id, valeurDefaut));
    }
    /**
     * renvoie l'existence d'une propriété
     * @param prop propriété à tester
     */
    a(prop) {
        return this.has(prop);
    }
    /**
     * Renvoie l'une des Prop_s si elle existe. Sinon erreur !
     * @param id identifiant de la propriété désirée
     */
    prop(id) {
        const p = this.get(id);
        if (p)
            return p;
        throw new RangeError(`La propriété ${id} n'existe pas dans ${this.id}.`);
    }
    /**
     * Modifie la valeur d'une Prop existante
     * @param id identifiant de propriété à définir
     * @param valeur
     */
    met(id, valeur) {
        this.prop(id).valeur = valeur;
    }
    /**
     * Renvoie la valeur d'une Prop existante
     * @param id identifiant de la valeur désirée
     */
    lit(id) {
        return this.prop(id).valeur;
    }
}
/**
 * Gestionnaire d'événements avec .delai, .nbRepet et .boucle(tic)
 */
class Chrono extends Obj {
    /**
     * Définit un Chrono
     * @param delai durée en millisecondes entre chaque répétition
     * @param nbRepet nombre de répétitions
     * @param boucle action à effectuer à chaque itération
     */
    constructor(delai, nbRepet, boucle) {
        super("chrono");
        this.delai = delai;
        this.nbRepet = nbRepet;
        this.boucle = boucle;
        this.creerProp("tic", 0);
        this.creerProp("attente", 0);
    }
    /**
     * itération (appelée à chaque nouveau tic)
     */
    actualiser() {
        this.boucle(this.tic);
        if (this.tic == this.nbRepet)
            this.arreter();
    }
    /**
     * début de l'exécution
     */
    lancer() {
        this.attente = setInterval(() => { this.tic++; }, this.delai);
    }
    /**
     * fin de l'exécution
     */
    arreter() {
        clearInterval(this.attente);
    }
    /**
     * fin de l'exécution et remise à zéro
     */
    aZero() {
        this.arreter();
        this.tic = 0;
    }
    /**
     * nombre d'itérations
     */
    get tic() { return this.lit("tic"); }
    set tic(value) { this.met("tic", value); }
    /**
     * handler de répétion d'intervalle
     */
    get attente() { return this.lit("attente"); }
    set attente(value) { this.met("attente", value); }
}
/**
 * Valeur numérique bornée avec .reaction(.params)
 */
class Echelle extends Obj {
    /**
     * Définit une valeur scalaire
     * @param min valeur plancher
     * @param max valeur plafond
     * @param val valeur en cours
     * @param reaction fonction recevant en premier l'échelle et exécutée à chaque changement
     * @param params autres paramètres à transporter
     */
    constructor(min, max, val, reaction, ...params) {
        super("echelle");
        this.reaction = reaction;
        this.params = params;
        this.creerProp("min", min);
        this.creerProp("max", max);
        this.creerProp("val", val);
    }
    /**
     * Chaque fois que l'on modifie l'échelle on provoque la réaction...
     */
    actualiser() {
        this.reaction.apply(this, [this, ...this.params]);
    }
    /**
     * valeur plancher
     */
    get min() { return this.lit("val"); }
    set min(value) {
        this.met("min", value);
        this.val = this.val;
    }
    /**
     * valeur plafond
     */
    get max() { return this.lit("max"); }
    set max(value) {
        this.met("max", value);
        this.val = this.val;
    }
    /**
     *  valeur en cours
     */
    get val() { return this.lit("val"); }
    set val(value) {
        this.met("val", Math.min(Math.max(value, this.min), this.max));
    }
    /**
     * pourcentage en cours
     */
    get pcent() { return (this.val - this.min) / (this.max - this.min); }
    set pcent(value) {
        value = Math.min(Math.max(value, 0), 1.0);
        this.val = this.min + ((this.max - this.min) * value);
    }
}
/**
 * Objet interactif avec .scene et .ecoutes[]
 */
class Actif extends Obj {
    constructor(el, id) {
        super(id);
        this.el = el;
        this.ecoutes = new Map();
        this.creerProp("nom", id);
        this.el.id = id;
    }
    /**
     * Avant de mourir, un actif le dit...
     */
    detruire() {
        this.diffuser("fin");
        this.ecoutes.clear();
    }
    /**
     * Gestionnaire d'événement
     * @param e événement à gérer
     */
    handleEvent(e) {
        this.ecoutes.forEach((evType, callback) => {
            if (evType == e.type)
                callback.apply(this, [e]);
        });
    }
    /**
     * Surveiller un type d'événements
     * @param evType type de l'événement
     * @param callback réaction à l'événement
     */
    ecouter(evType, callback) {
        this.ecoutes.set(callback, evType);
        this.el.addEventListener(evType, this);
    }
    /**
     * Cesser de surveiller un type d'événements
     * @param evType type de l'événement
     * @param callback réaction à l'événement
     */
    oublier(evType, callback) {
        this.ecoutes.delete(callback);
        this.el.removeEventListener(evType, this);
    }
    /**
     * Diffuse un événement ayant comme propriété 'détail' l'actif diffuseur
     * @param evType type de l'événement à diffuser
     */
    diffuser(evType) {
        this.el.dispatchEvent(new CustomEvent(evType, { detail: this }));
    }
    /**
     * identifiant de l'actif
     */
    get nom() { return this.lit("nom"); }
    set nom(value) {
        this.el.id = value;
        this.met("nom", value);
    }
}
/**
 * Actif visualisable avec .parent et .css
 */
class Visuel extends Actif {
    /**
     * Crée un élément affichable
     * @param type type d'élément html (div, span, textarea, canvas...)
     * @param id identifiant du visuel et de l'élément html
     */
    constructor(type, id) {
        super(document.createElement(type), id);
        this.type = type;
        this.css = this.el.style;
        this.creerProp("x", 0);
        this.creerProp("y", 0);
        this.creerProp("sx", 0);
        this.creerProp("sy", 0);
        this.creerProp("lg", 0);
        this.creerProp("ht", 0);
        this.creerProp("arrondi", 0);
        this.creerProp("epaisseur", 1);
        this.creerProp("alpha", 100);
        this.creerProp("coulFond", "#FFF");
        this.creerProp("coulBord", "#000");
        this.creerProp("bordure", "solid");
        this.creerProp("visible", true);
        this.creerProp("ordre", 0); // z-order 
        this.creerProp("tab", 0); // tabulation
    }
    /**
     * Actualise la position, la visibilité et la couleur du Visuel
     */
    actualiser() {
        this.css.left = this.x + "px";
        this.css.top = this.y + "px";
        this.css.width = this.lg + "px";
        this.css.height = this.ht + "px";
        this.css.borderRadius = this.arrondi == 0 ? "" : this.arrondi + "px";
        this.css.backgroundColor = this.coulFond;
        if (this.alpha != 100)
            this.css.opacity = `${this.alpha / 100}`;
        this.css.border = `${this.epaisseur}px ${this.bordure} ${this.coulBord}`;
        this.css.display = this.visible ? "block" : "none";
    }
    /**
     * Définit le rectangle de délimitation du Visuel
     * @param x gauche du Visuel
     * @param y haut du Visuel
     * @param lg largeur du Visuel
     * @param ht hauteur du Visuel
     * @param rond arrondi des coins du Visuel
     */
    cadrer(px, py, lg, ht, rond) {
        this.x = px;
        this.y = py;
        this.lg = lg;
        this.ht = ht;
        this.arrondi = rond;
        return this;
    }
    /**
     * Définit la position du centre Visuel
     * @param cx centre horizontal du Visuel
     * @param cy centre vertical du Visuel
     */
    centrer(cx, cy) {
        this.cx = cx;
        this.cy = cy;
        return this;
    }
    /**
     * Supprime le visuel de l'affichage
     */
    detruire() {
        if (this.parent) {
            this.parent.exclure(this);
            // le visuel n'a plus ni parent ni scène
        }
        if (this.el.parentElement) { // ni support dans le DOM
            this.el.parentElement.removeChild(this.el);
        }
        super.detruire(); // ni écouteurs
    }
    /**
     * Met le Visuel au premier plan
     */
    mettreDevant() {
        if (this.scene == undefined)
            return;
        let pere = this.parent, fils = this;
        while (pere instanceof Conteneur) {
            fils.ordre = pere.nbEnfants - 1;
            fils = pere;
            pere = pere.parent;
        }
    }
    /**
     * Met le Visuel à l'arrière-plan
     */
    mettreDerriere() {
        if (this.scene == undefined)
            return;
        let pere = this.parent, fils = this;
        while (pere instanceof Conteneur) {
            fils.ordre = 0;
            fils = pere;
            pere = pere.parent;
        }
    }
    /**
     * Définit la position du Visuel
     * @param x gauche du Visuel
     * @param y haut du Visuel
     */
    placer(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Définit les dimensions du Visuel
     * @param lg largeur du Visuel
     * @param ht hauteur du Visuel
     * @param rond arrondi des coins du Visuel
     */
    tailler(lg, ht, rond) {
        this.lg = lg;
        this.ht = ht;
        this.arrondi = rond;
        return this;
    }
    /**
     *  gauche du Visuel
     */
    get x() { return this.lit("x"); }
    set x(value) { this.met("x", value); }
    /**
     * haut du Visuel
     */
    get y() { return this.lit("y"); }
    set y(value) { this.met("y", value); }
    /**
     * largeur du Visuel
     */
    get lg() { return this.lit("lg"); }
    set lg(value) { this.met("lg", Math.max(value, 0)); }
    /**
     *  hauteur du Visuel
     */
    get ht() { return this.lit("ht"); }
    set ht(value) { this.met("ht", Math.max(value, 0)); }
    /**
     *  arrondi des coins du Visuel
     */
    get arrondi() { return this.lit("arrondi"); }
    set arrondi(value) { this.met("arrondi", value); }
    /**
     *  transparence du Visuel (entre 0 et 100)
     */
    get alpha() { return this.lit("alpha"); }
    set alpha(value) { this.met("alpha", value); }
    /**
     * position horizontale de la souris relative au Visuel
     */
    get sourisX() { return this.lit("sx"); }
    set sourisX(value) { this.met("sx", value); }
    /**
     * position verticale de la souris relative au Visuel
     */
    get sourisY() { return this.lit("sy"); }
    set sourisY(value) { this.met("sy", value); }
    /**
     * centre horizontal du Visuel
     */
    get cx() { return this.lit("x") + (this.lg / 2); }
    set cx(value) { this.met("x", value - (this.lg / 2)); }
    /**
     * centre vertical du Visuel
     */
    get cy() { return this.lit("y") + (this.ht / 2); }
    set cy(value) { this.met("y", value - (this.ht / 2)); }
    /**
     * droite du Visuel
     */
    get fx() { return this.lit("x") + this.lg; }
    set fx(value) { this.met("x", value - this.lg); }
    /**
     * bas du Visuel
     */
    get fy() { return this.lit("y") + this.ht; }
    set fy(value) { this.met("y", value - this.ht); }
    /**
     * épaisseur de la bordure en pixels
    */
    get epaisseur() { return this.lit("epaisseur"); }
    set epaisseur(value) { this.met("epaisseur", value); }
    /**
     * couleur du fond
     */
    get coulFond() { return this.lit("coulFond"); }
    set coulFond(value) { this.met("coulFond", value); }
    /**
     * couleur de la bordure
     */
    get coulBord() { return this.lit("coulBord"); }
    set coulBord(value) { this.met("coulBord", value); }
    /**
     * style de la bordure ("solid|dotted|dashed|inset|outsed|ridge|groove|none")
     */
    get bordure() { return this.lit("bordure"); }
    set bordure(value) { this.met("bordure", value); }
    /**
     * Index de l'enfant sur son parent :
     * l'index le plus grand est devant
     */
    get ordre() { return this.parent ? this.parent.enfantIndex(this) : -1; }
    set ordre(value) { if (this.parent)
        this.parent.ordonner(this, value); }
    /**
     * Ordre de tabulation (0 par défaut);
     */
    get tab() { return this.lit("tab"); }
    set tab(value) { this.met("tab", value); this.el.tabIndex = value; }
    /**
     * Visibilité du Visuel (=> display : block|none)
     */
    get visible() { return this.lit("visible"); }
    set visible(value) { this.met("visible", value); }
    /**
     * Le Visuel doit-il réagir au survol à la souris ?
     * Si oui, le curseur devient un pointeur
     */
    get reactif() { return this.css.pointerEvents !== "none"; }
    set reactif(value) {
        this.css.pointerEvents = value ? "auto" : "none";
        this.css.cursor = value ? "pointer" : "auto";
    }
    /**
     * Le texte est-il sélectionnable à la souris ?
     * Si oui, le curseur devient automatiquement un séparateur de texte.
     */
    get selectionnable() { return this.css.userSelect !== "none"; }
    set selectionnable(value) {
        this.css.userSelect = value ? "text" : "none";
    }
}
/**
 * Visuel de type .div avec .enfants[]
 */
class Conteneur extends Visuel {
    /**
     * Définit un élément comme un Visuel conteneur d'autres visuels (avec div:HTMLDivElement)
     * @param cible Support du Conteneur
     * @param id identifiant du conteneur
     * @param couleur couleur de fond du conteneur
     */
    constructor(cible, id, fond, bord) {
        super("div", id);
        this.enfants = [];
        this.div = this.el;
        (cible instanceof Conteneur) ? cible.accueillir(this) : cible.appendChild(this.div);
        this.coulFond = fond;
        this.coulBord = bord;
        this.css.overflow = "hidden";
    }
    /**
     * Adopte un Visuel et le met dans la liste d'enfants à afficher
     * @param v visuel à adopter
     */
    accueillir(v) {
        if (v.parent != undefined)
            v.parent.exclure(v);
        this.enfants.push(v);
        this.div.appendChild(v.el);
        v.parent = this;
        v.scene = this.scene;
        return v;
    }
    /**
     * Supprime un visuel de la liste d'enfants à afficher
     * @param v visuel à enlever de l'affichage
     */
    exclure(v) {
        if (v.parent == this) {
            this.enfants.splice(this.enfants.indexOf(v), 1);
            this.el.removeChild(v.el);
            v.parent = undefined;
            v.scene = undefined;
        }
        else {
            throw new RangeError(`${v.nom} n'est pas un enfant de ${this.nom}`);
        }
        return v;
    }
    /**
     * Position d'un enfant dans la liste
     * @param v enfant dont on veut la position dans la liste d'enfants
     */
    enfantIndex(v) { return this.enfants.indexOf(v); }
    /**
     * Modifie l'ordre d'un enfant du Conteneur
     * @param fils enfant existant dans la liste
     * @param index index désiré
     */
    ordonner(fils, index) {
        const enfants = this.enfants, nbEnfants = enfants.length, vieilIndex = this.enfantIndex(fils);
        if ((nbEnfants < 2) || (vieilIndex == -1) || (index > nbEnfants - 1))
            return;
        enfants.splice(vieilIndex, 1);
        enfants.splice(index, 0, fils);
        enfants.forEach((e, n) => e.el.style.zIndex = n + ""); // ordre appliqué
    }
    /**
     * Recherche un enfant ou un petit-enfant
     * @param el élément html de l'enfant
     */
    enfantAvec(el) {
        let e = this.enfants.find(v => v.el == el);
        if (e)
            return e;
        this.enfants.forEach(v => { if (v instanceof Conteneur)
            return v.enfantAvec(el); });
    }
    /**
     * Nombre de visuels enfants
     */
    get nbEnfants() { return this.enfants.length; }
}
/**
 * Arrière-plan avec visuel .enCours, .feuille de style et .suiviSouris
 */
class Scene extends Conteneur {
    constructor(couleur) {
        super(document.body, "stage", couleur, couleur);
        this.scene = this;
        this.creerProp("mouseX", 0);
        this.creerProp("mouseY", 0);
        this.feuille = new FeuilleStyle();
        window.addEventListener("resize", e => this.etendre());
        this.suiviSouris(true);
        this.etendre();
    }
    suiviSouris(act) {
        const suivi = (m) => this.placerSouris(m);
        if (act) {
            this.ecouter("mousemove", suivi);
        }
        else {
            this.oublier("mousemove", suivi);
        }
    }
    /**
     * Redessine l'ecran quand sa taille est redéfinie et diffuse un événement "redim"
     */
    etendre() {
        this.cadrer(1, 1, window.innerWidth - 2, window.innerHeight - 3, 0);
        this.diffuser("redim");
    }
    /**
     * Observe la souris et diffuse un événement "souris" au mouvement
     * @param m
     */
    placerSouris(m) {
        if (m.currentTarget == m.target) {
            this.met("mouseX", m.pageX);
            this.met("mouseY", m.pageY);
            this.diffuser("souris");
        }
        else {
            const enCours = this.enfantAvec(m.target);
            if (enCours && this.enCours !== enCours) {
                this.enCours = enCours;
                this.diffuser("enCours");
            }
        }
    }
    /**
     * position x de la souris sur la scène
     */
    get sceneX() { return this.lit("mouseX"); }
    /**
     * position y de la souris sur la scène
     */
    get sceneY() { return this.lit("mouseY"); }
}
/**
 * Visuel affichant du texte
 */
class Champ extends Visuel {
    /**
     * Crée un visuel affichable
     * @param cible support du champ
     * @param type type de zone de texte (div, textarea, span, input, h1,...)
     * @param id identifiant de la zone
     */
    constructor(cible, type, id) {
        super(type, id);
        this.actif = false;
        cible.accueillir(this);
        this.creerProp("police", "verdana");
        this.creerProp("taillePts", 10);
        this.creerProp("coulTxt", "#0000FF");
        this.creerProp("align", "left");
        this.creerProp("gras", false);
        this.creerProp("italique", false);
        this.creerProp("souligne", false);
        this.creerProp("capitales", false);
        this.creerProp("mgGauche", 0);
        this.creerProp("mgDroite", 0);
        this.creerProp("interligne", 0);
        this.creerProp("ecart", 0);
    }
    actualiser() {
        super.actualiser();
        this.css.fontFamily = this.police;
        this.css.fontSize = this.taillePts + "pt";
        this.css.color = this.coulTexte;
        this.css.textAlign = this.align;
        if (this.gras)
            this.css.fontWeight = "bold";
        if (this.italiques)
            this.css.fontStyle = "italic";
        if (this.souligne)
            this.css.textDecoration = "underline";
        if (this.capitales)
            this.css.fontVariant = "small-caps";
        if (this.mgGauche > 0)
            this.css.paddingLeft = this.mgGauche + "px";
        if (this.mgDroite > 0)
            this.css.paddingRight = this.mgDroite + "px";
        if (this.interligne)
            this.css.lineHeight = this.interligne + "px";
        if (this.ecart != 0)
            this.css.letterSpacing = this.ecart + "px";
    }
    /**
     * Définit les trois couleurs normales du Textfield
     * @param fond couleur du fond
     * @param bord couleur de la bordure
     * @param texte couleur du texte
     */
    colorier(fond, bord, texte) {
        this.coulFond = fond;
        this.coulBord = bord;
        this.coulTexte = texte;
        return this;
    }
    /**
     * Définit la police de caractères
     * @param police nom de la police de caractères
     * @param taille taille de la police de caractères en points
     * @param couleur couleur de la police de caractères
     * @param align alignement du texte ("left|center|right|justify")
     */
    formater(police, taille, couleur, align) {
        this.police = police;
        this.taillePts = taille;
        this.coulTexte = couleur;
        this.align = align;
        return this;
    }
    /**
     * Définit le style du texte
     * @param gras mettre en gras ?
     * @param ital mettre en italiques ?
     * @param soulign souligner ?
     * @param petitesMaj mettre en petites majuscules ?
     */
    styliser(gras = false, ital = false, soulign = false, petitesMaj = false) {
        this.gras = gras;
        this.italiques = ital;
        this.souligne = soulign;
        this.capitales = petitesMaj;
        return this;
    }
    /**
     * Définit la position du texte dans le Textfield
     * @param mgGauche marge de gauche en pixels
     * @param mgDroite marge de droite en pixels
     * @param interligne espacement vertical (entre les lignes) en pixels
     * @param espace espacement horizontal (entre les caractères) en pixels
     */
    regler(mgGauche, mgDroite, interligne, espace) {
        this.mgGauche = mgGauche;
        this.mgDroite = mgDroite;
        this.interligne = interligne;
        this.ecart = espace;
        return this;
    }
    /**
     * nom de la police de caractères
     */
    get police() { return this.lit("police"); }
    set police(value) { this.met("police", value); }
    /**
     * taille de la police de caractères en points
     */
    get taillePts() { return this.lit("taillePts"); }
    set taillePts(value) { this.met("taillePts", value); }
    /**
     * couleur actuelle de la police de caractères
     */
    get coulTexte() { return this.lit("coulTxt"); }
    set coulTexte(value) { this.met("coulTxt", value); }
    /**
     * alignement du texte ("left|center|right|justify")
     */
    get align() { return this.lit("align"); }
    set align(value) { this.met("align", value); }
    /**
     * mettre en gras ?
     */
    get gras() { return this.lit("gras"); }
    set gras(value) { this.met("gras", value); }
    /**
     * mettre en italiques ?
     */
    get italiques() { return this.lit("italique"); }
    set italiques(value) { this.met("italique", value); }
    /**
     * souligner ?
     */
    get souligne() { return this.lit("souligne"); }
    set souligne(value) { this.met("souligne", value); }
    /**
     * mettre en petites majuscules ?
     */
    get capitales() { return this.lit("capitales"); }
    set capitales(value) { this.met("capitales", value); }
    /**
     * marge de gauche en pixels
     */
    get mgGauche() { return this.lit("mgGauche"); }
    set mgGauche(value) { this.met("mgGauche", value); }
    /**
     * marge de droite en pixels
     */
    get mgDroite() { return this.lit("mgDroite"); }
    set mgDroite(value) { this.met("mgDroite", value); }
    /**
     * espacement vertical (entre les lignes) en pixels
     */
    get interligne() { return this.lit("interligne"); }
    set interligne(value) { this.met("interligne", value); }
    /**
     * espacement horizontal (entre les caractères) en pixels
     */
    get ecart() { return this.lit("ecart"); }
    set ecart(value) { this.met("ecart", value); }
}

/**
 * Script n°2   ::: SVG ::: en français !
 */
 const SVG_NS = "http://www.w3.org/2000/svg";
 const XLINK_NS = "http://www.w3.org/1999/xlink"; //<script>, <a>, <use>, <image>
 /**
  * élément svg générique
  */
 class FormeSvg extends Obj {
     constructor(type, id, ...propVals) {
         super(id);
         this.el = document.createElementNS(SVG_NS, type);
         this.creerProp("nom", "");
         this.creerProp("coulFond", "none");
         this.creerProp("coulBord", "none");
         this.creerProp("bordure", 1);
         this.creerProp("alpha", 1.0);
         this.creerProp("tirets", []);
         this.creerProp("fin", "round");
         this.creerProp("joint", "miter");
         this.creerProp("pointe", 4);
         this.creerProp("transfo", "");
         this.nom = id;
         this.attrs(...propVals);
     }
     actualiser() {
         if (this.coulFond.length)
             this.attr("fill", this.coulFond);
         if (this.coulBord.length)
             this.attr("stroke", this.coulBord);
         if (this.bordure !== 1)
             this.attrs("stroke-width", this.bordure + '');
         if (this.alpha != 1) {
             if (this.coulFond.length)
                 this.attr("fill-opacity", this.alpha + "");
             if (this.coulBord.length)
                 this.attr("stroke-opacity", this.alpha + "");
         }
         if (this.tirets.length)
             this.attr("stroke-dasharray", this.tirets.join(" "));
         if (this.fin !== "round")
             this.attr("stroke-linecap", this.fin);
         if (this.joint !== "miter")
             this.attr("stroke-linejoin", this.joint);
         if (this.pointe != 4)
             this.attr("stroke-miterlimit", this.pointe + "");
         if (this.transfo.length > 0)
             this.attr("transform", this.transfo);
     }
     /**
      * Ajoute une translation à la forme
      * @param tx translation horizontale
      * @param ty translation verticale
      */
     deplacer(tx, ty) {
         this.transfo = this.transfo + `translate(${tx},${ty}) `;
         return this;
     }
     /**
      * Ajoute un redimensionnement à la forme
      * @param sx échelle horizontale
      * @param sy échelle verticale
      */
     etirer(sx, sy) {
         this.transfo = this.transfo + `scale(${sx},${sy}) `;
         return this;
     }
     /**
      * Ajoute une rotation à la forme
      * @param angle angle de rotation en degrés
      */
     tourner(angle) {
         this.transfo = this.transfo + `rotate(${angle}) `;
         return this;
     }
     /**
      * Ajoute une torsion à la forme
      * @param sk cisaillement
      */
     tordre(skx) {
         this.transfo = this.transfo + `skewX(${skx}) `;
         return this;
     }
     /**
      * Crée / modifie un attribut pour un élément svg
      * @param el élement auquel on ajoute/modifie un attribut
      * @param attr nom de l'attribut à modifier/ajouter
      * @param value valeur de l'attribut nouvelle valeur
      */
     attrs(...propVals) {
         for (let i = 0; i < propVals.length; i++)
             this.attr(propVals[i], propVals[++i]);
     }
     /**
      * Crée / modifie un attribut pour un élément svg
      * @param el élement auquel on ajoute/modifie un attribut
      * @param attr nom de l'attribut à modifier/ajouter
      * @param value valeur de l'attribut nouvelle valeur
      */
     attr(attr, value) {
         this.el.setAttribute(attr, value);
     }
     /**
      * Définit le format du texte
      * @param police nom de la police
      * @param taille taille des caractères en pixels
      * @param cfond couleur du fond
      * @param cbord couleur de la bordure
      * @param ancre ancrage du texte (start=gauche, middle=centre, end=droite) sur la position choisie
      */
     formater(police, taille, cfond, cbord = "none", ancre = "middle") {
         this.el.setAttribute("style", `font-family:${police}; size:${taille}px; fill:${cfond}; stroke:${cbord}; text-anchor:${ancre};`);
     }
     /**
      * Définit l'aspect du fond et de la bordure
      * @param fond couleur du fond
      * @param bord couleur de la bordure
      * @param epaisseur épaisseur de la bordure
      * @param alpha transparence entre 0.0 et 1.0
      */
     styler(fond, bord = "", epaisseur = 1, alpha = 1.0) {
         this.coulFond = fond;
         this.coulBord = bord;
         this.bordure = epaisseur;
         this.alpha = alpha;
         return this;
     }
     /**
      * attribut name de la forme
      */
     get nom() { return this.lit("nom"); }
     set nom(value) {
         this.met("nom", value);
         this.el.id = value;
     }
     /**
      * couleur de fond
      */
     get coulFond() { return this.lit("coulFond"); }
     set coulFond(value) { this.met("coulFond", value); }
     /**
      * couleur de la bordure
      */
     get coulBord() { return this.lit("coulBord"); }
     set coulBord(value) { this.met("coulBord", value); }
     /**
      * épaisseur de la bordure
      */
     get bordure() { return this.lit("bordure"); }
     set bordure(value) { this.met("bordure", value); }
     /**
      * transparence du fond (0= transparent | 1 = opaque)
      */
     get alpha() { return this.lit("alpha"); }
     set alpha(value) { this.met("alpha", value); }
     /**
      * alternance de traits sur une bordure en pointillés
      */
     get tirets() { return this.lit("tirets"); }
     set tirets(value) { this.met("tirets", value); }
     /**
      * forme du bout du segment (butt|round|square : rase|arrondie|carrée)
      */
     get fin() { return this.lit("fin"); }
     set fin(value) { this.met("fin", value); }
     /**
      * liaison entre deux segments (miter|round|bevel : pointue|arrondie|rabotée)
      */
     get joint() { return this.lit("joint"); }
     set joint(value) { this.met("joint", value); }
     /**
      * longueur de la pointe si le bout est pointu (miter)
      */
     get pointe() { return this.lit("pointe"); }
     set pointe(value) { this.met("pointe", value); }
     /**
      * transformations
      */
     get transfo() { return this.lit("transfo"); }
     set transfo(value) { this.met("transfo", value); }
 }
 /**
  * élément svg de type path (suite de commandes)
  */
 class CheminSvg extends FormeSvg {
     constructor(id, ...propVals) {
         super("path", id, ...propVals);
         this.curs = { x: 0, y: 0 };
         this.creerProp("path", "");
     }
     /**
      * Ajoute une commande au chemin
      * @param idCmd identifiant de la commande
      * @param pts positions (x, y, x, y, ...)
      */
     insererCmd(idCmd, ...pts) {
         let p = this.lit("path");
         this.met("path", p + " " + idCmd + " " + pts.join(","));
         this.curs = { x: pts[pts.length - 2], y: pts[pts.length - 1] };
         this.attr("d", this.lit("path"));
         return this;
     }
     /**
      * Dessiner un arc de cercle (rx == ry) ou d'ellipse (rx =/= ry)
      * @param x1 début horizontal
      * @param y1 début vertical
      * @param rx rayon horizontal
      * @param ry rayon vertical
      * @param x2 fin horizontale
      * @param y2 fin verticale
      * @param rot angle de rotation en degrés
      * @param grand dessiner la partie la plus longue ?
      * @param horaire dessiner dans le sens horaire ?
      */
     arc(x1, y1, rx, ry, x2, y2, rot, grand = 1, horaire = 1) {
         if (this.curs.x !== x1 || this.curs.y !== y1)
             this.aller(x1, y1);
         this.insererCmd("A", rx, ry, rot, grand, horaire, x2, y2);
         return this;
     }
     /**
      * Dessiner une courbe avec un point d'inflexion
      * @param x1 début horizontal
      * @param y1 début vertical
      * @param xa point d'ancrage horizontal
      * @param ya point d'ancrage vertical
      * @param x2 fin horizontale
      * @param y2 fin verticale
      */
     courbe(x1, y1, xa, ya, x2, y2) {
         if (this.curs.x !== x1 || this.curs.y !== y1)
             this.aller(x1, y1);
         this.courber(xa, ya, x2, y2);
         return this;
     }
     /**
      * Dessiner une courbe avec deux points d'inflexion
      * @param x1 début horizontal
      * @param y1 début vertical
      * @param xa point d'ancrage horizontal
      * @param ya point d'ancrage vertical
      * @param xb point d'inflexion horizontal
      * @param yb point d'inflexion vertical
      * @param x2 fin horizontale
      * @param y2 fin verticale
      */
     courbure(x1, y1, xa, ya, xb, yb, x2, y2) {
         if (this.curs.x !== x1 || this.curs.y !== y1)
             this.aller(x1, y1);
         this.incurver(xa, ya, xb, yb, x2, y2);
         return this;
     }
     /**
      * Dessine une droite
      * @param x1 début horizontal
      * @param y1 début vertical
      * @param x2 fin horizontale
      * @param y2 fin verticale
      */
     trait(x1, y1, x2, y2) { this.aller(x1, y1, x2, y2); return this; }
     /**
      * Se déplacer vers une position et tracer des segments
      * @param nb suite de positions à relier
      */
     aller(...nb) { this.insererCmd("M", ...nb); return this; }
     /**
      * Tracer une ligne (à partir de la position en cours)
      * @param x gauche
      * @param y haut
      */
     aligner(x, y) { this.insererCmd("L", x, y); return this; }
     /**
      * Tracer une courbe avec un point d'ancrage (à partir de la position en cours)
      * @param xa point d'ancrage horizontal
      * @param ya point d'ancrage vertical
      * @param x2 fin horizontale
      * @param y2 fin verticale
      */
     courber(xa, ya, x2, y2) { this.insererCmd("Q", xa, ya, x2, y2); return this; }
     /**
      * Tracer une courbe avec deux points d'ancrage (à partir de la position en cours)
      * @param xa point d'ancrage horizontal
      * @param ya point d'ancrage vertical
      * @param xb point d'inflexion horizontal
      * @param yb point d'inflexion vertical
      * @param x2 fin horizontale
      * @param y2 fin verticale
      */
     incurver(xa, ya, xb, yb, x2, y2) {
         this.insererCmd("C", xa, ya, xb, yb, x2, y2);
         return this;
     }
     /**
      * Fermer un chemin ouvert en revenant au début
      */
     fermer() { this.insererCmd("Z", 0, 0); return this; }
 }
 /**
  * Parent des deux types de dégradés
  */
 class Degrade {
     /**
      * Définit le parent des deux types de dégradés
      * @param dessin dessin auquel on ajoute un dégradé
      * @param linear est-ce un dégradé linéaire ?
      * @param id identifiant du dessin
      */
     constructor(dessin, linear, id, alt) {
         this.gradient = document.createElementNS(SVG_NS, linear ? "linearGradient" : "radialGradient");
         this.gradient.id = id;
         dessin.defs.appendChild(this.gradient);
         this.colorier(...alt);
     }
     /**
      * Définit les couleurs, alphas et positions du dégradé par séries
      * @param alt suite alternant : couleur, alpha entre 0.0 et 1.0, position entre 0 et 100 (%)
      */
     colorier(...alt) {
         for (let i = 0; i < alt.length; i++) {
             var stop = document.createElementNS(SVG_NS, 'stop');
             stop.setAttribute("stop-color", alt[i]);
             stop.setAttribute("stop-opacity", alt[++i]);
             stop.setAttribute('offset', alt[++i] + "%");
             this.gradient.appendChild(stop);
         }
         return this;
     }
     /**
      * Compléter ce dégradé par quelle méthode (pad, reflect ou repeat) ?
      * @param methode : pad = étaler la dernière couleur | reflect = revenir en arrière | repeat = recommencer
      */
     completer(methode) {
         this.gradient.setAttribute("spreadMethod", methode);
         return this;
     }
 }
 /**
  * Dégradé linéaire
  */
 class DegradeLineaire extends Degrade {
     /**
      * Définition d'un dégradé
      * @param dessin
      * @param id identifiant du dégradé
      * @param x1 gauche de la ligne de direction entre 0 et 1
      * @param x2 droite de la ligne de direction entre 0 et 1
      * @param y1 haut de la ligne de direction entre 0 et 1
      * @param y2 bas de la ligne de direction entre 0 et 1
      * @param alt alternance c,a,p,c,a,p : Couleur, Alpha (entre 0.0 et 1.0), Position (entre 0 et 100)
      */
     constructor(dessin, id, x1, x2, y1, y2, alt) {
         super(dessin, true, id, alt);
         const grad = this.gradient;
         grad.setAttribute("x1", `${x1}`);
         grad.setAttribute("x2", `${x2}`);
         grad.setAttribute("y1", `${y1}`);
         grad.setAttribute("y2", `${y2}`);
     }
 }
 /**
  * Dégradé circulaire
  */
 class DegradeRadial extends Degrade {
     /**
      * Définition d'un dégradé radial
      * @param id identifiant du dégradé
      * @param cx centre du dégradé en % de la largeur de la forme (entre 0 et 1)
      * @param cy centre du dégradé en % de la hauteur de la forme (entre 0 et 1)
      * @param r longueur du rayon du dégradé en pourcentage
      * @param fx fin du dégradé horizontal
      * @param fy fin du dégradé vertical
      * @param alt alternance dans l'ordre de : 1)- couleur 2)- alpha entre 0 et 100 3)- position entre 0 et 100
      */
     constructor(dessin, id, cx, cy, r, fx, fy, alt) {
         super(dessin, false, id, alt);
         const grad = this.gradient;
         grad.setAttribute("cx", `${cx}`);
         grad.setAttribute("cy", `${cy}`);
         grad.setAttribute("r", `${r}`);
         grad.setAttribute("fx", `${fx}`);
         grad.setAttribute("fy", `${fy}`);
     }
 }
 /**
  * groupe de formes affichables sur un visuel
  */
 class Dessin extends FormeSvg {
     constructor(v, id) {
         super("svg", id);
         this.enfants = [];
         this.svg = this.el;
         this.defs = document.createElementNS(SVG_NS, "defs");
         this.svg.appendChild(this.defs);
         v.el.appendChild(this.svg);
         // ratio : concatène deux mots-clefs : {xMin|xMid|xMax} + {YMin|YMid|YMax}
         this.attrs("xmlns:xlink", XLINK_NS, "width", "100%", "height", "100%");
         this.creerProp("x", 0);
         this.creerProp("y", 0);
         this.creerProp("lg", 0);
         this.creerProp("ht", 0);
     }
     /**
      * ajoute un dégradé linéaire aux définitions
      * @param id identifiant du dégradé
      * @param x1 gauche de la ligne de direction entre 0 et 1
      * @param x2 droite de la ligne de direction entre 0 et 1
      * @param y1 haut de la ligne de direction entre 0 et 1
      * @param y2 bas de la ligne de direction entre 0 et 1
      * @param alt alternance dans l'ordre de : 1)- couleur 2)- alpha entre 0 et 100 3)- position entre 0 et 100
      */
     lineaire(id, x1, x2, y1, y2, alt) {
         new DegradeLineaire(this, id, x1, x2, y1, y2, alt);
         return this;
     }
     /**
      * ajoute un dégradé radial aux définitions
      * @param id identifiant du dégradé radial
      * @param cx centre du dégradé en % de la largeur de la forme (entre 0 et 1)
      * @param cy centre du dégradé en % de la hauteur de la forme (entre 0 et 1)
      * @param r longueur du rayon du dégradé en pourcentage
      * @param fx fin du dégradé horizontal
      * @param fy fin du dégradé vertical
      * @param alt alternance dans l'ordre de : 1)- couleur 2)- alpha entre 0 et 100 3)- position entre 0 et 100
      */
     radial(id, cx, cy, r, fx, fy, alt) {
         new DegradeRadial(this, id, cx, cy, r, fx, fy, alt);
         return this;
     }
     /**
      * Définit le rectangle de délimitation
      * @param x gauche du dessin sur son support
      * @param y haut du dessin sur son support
      * @param lg largeur du dessin
      * @param ht hauteur du dessin
      */
     cadrer(x, y, lg, ht) {
         this.x = x;
         this.y = y;
         this.lg = lg;
         this.ht = ht;
         this.attrs("style", `top:${y}px; left:${x}px; width:${lg}px; height:${ht}px;`, "preserveAspectRatio", "xMidYMid meet", "viewBox", `0 0 ${lg} ${ht}`);
         return this;
     }
     /**
      * gauche du dessin sur son support
      */
     get x() { return this.lit("x"); }
     set x(value) { this.met("x", value); }
     /**
      * haut du dessin sur son support
      */
     get y() { return this.lit("y"); }
     set y(value) { this.met("y", value); }
     /**
      * largeur du dessin
      */
     get lg() { return this.lit("lg"); }
     set lg(value) { this.met("lg", value); }
     /**
      * hauteur du dessin
      */
     get ht() { return this.lit("ht"); }
     set ht(value) { this.met("ht", value); }
     /**
      * Ajoute un élément et ses attributs au svg
      * @param type type de l'élément svg à ajouter
      * @param propVals propriétés et valeurs alternées
      */
     creerForme(type, id, ...propVals) {
         let el = this.enfants.find(e => e.nom == id);
         if (el == undefined) {
             el = new FormeSvg(type, id, ...propVals);
             this.dessiner(el);
         }
         else {
             el.attrs(...propVals);
         }
         return el;
     }
     /**
      * Ajoute une forme au dessin
      * @param f forme à ajouter au dessin
      */
     dessiner(f) {
         this.svg.appendChild(f.el);
         this.enfants.push(f);
         return f;
     }
     /**
      * Ajoute et dessine une forme circulaire
      * @param id identifiant du cercle
      * @param cx centre horizontal
      * @param cy centre vertical
      * @param rayon longueur du rayon
      */
     cercle(id, cx, cy, rayon) {
         return this.creerForme("circle", id, "cx", `${cx}`, "cy", `${cy}`, "r", `${rayon}`);
     }
     /**
      * Ajoute et renvoie un chemin dont le style est défini (on peut y ajouter des commandes)
      * @param id identifiant du path
      * @param fond couleur de fond
      * @param bord couleur de bordure
      * @param epaisseur épaisseur de bordure
      * @param alpha transparence des couleurs
      */
     chemin(id, fond = "", bord = "", epaisseur = 1, alpha = 1.0) {
         let s = new CheminSvg(id);
         this.dessiner(s.styler(fond, bord, epaisseur, alpha));
         return s;
     }
     /**
      * Ajoute et dessine une ellipse
      * @param id identifiant de l'ellipse
      * @param cx centre horizontal
      * @param cy centre vertical
      * @param rx rayon horizontal
      * @param ry rayon vertical
      */
     ellipse(id, cx, cy, rx, ry) {
         return this.creerForme("ellipse", id, 'cx', `${cx}`, 'cy', `${cy}`, 'rx', `${rx}`, 'ry', `${ry}`);
     }
     /**
      * Ajoute et dessine une ligne
      * @param id identifiant de la droite
      * @param x1 début x
      * @param y1 début y
      * @param x2 fin x
      * @param y2 fin y
      */
     ligne(id, x1, y1, x2, y2) {
         return this.creerForme("line", id, 'x1', `${x1}`, 'y1', `${y1}`, 'x2', `${x2}`, 'y2', `${y2}`);
     }
     /**
      * Ajoute et dessine un polygone
      * @param id identifiant du polygone
      * @param coords suite des points du contour du polygone
      */
     polygone(id, coords) {
         return this.creerForme("polygon", id, "points", coords.join(" "));
     }
     /**
      * Ajoute et dessine un rectangle
      * @param id identifiant du rectangle
      * @param x gauche du rectangle
      * @param y haut du rectangle
      * @param lg largeur du rectangle
      * @param ht hauteur du rectangle
      */
     rectangle(id, x, y, lg, ht) {
         return this.creerForme("rect", id, 'x', `${x}`, 'y', `${y}`, 'width', `${lg}`, 'height', `${ht}`);
     }
     /**
      * Ajoute et dessine un rectangle aux coins arrondi
      * @param id identifiant du rectangle
      * @param x gauche du rectangle
      * @param y haut du rectangle
      * @param lg largeur du rectangle
      * @param ht hauteur du rectangle
      * @param rx arrondi horizontal
      * @param ry arrondi vertical
      */
     rectRond(id, x, y, lg, ht, rx, ry) {
         return this.creerForme("rect", id, "x", `${x}`, 'y', `${y}`, "", "width", lg + "", "height", ht + "", "rx", rx + "", "ry", ry + "");
     }
     /**
      * Ajoute et dessine une série de lignes consécutives
      * @param id identifiant du groupe de lignes
      * @param coords suite de points du contour
      */
     segments(id, coords) {
         return this.creerForme("polyline", id, "points", coords.join(" "));
     }
     texte(id, x, y, police, taille, cFond, txt) {
         let f = this.creerForme("text", id, "x", `${x}`, 'y', `${y}`, "", `${y}`);
         f.el.appendChild(document.createTextNode(txt));
         f.formater(police, taille, cFond);
    }
}
 
/**
 * Script n°3 ::: LIAISON ::: en français
 * Liaison entre les données des visuels
 *
 * TODO :
 * 01. OK = Gestion de l'événement de fermeture de fenêtre/visuel (VuePropriétés : vider les valeurs, masquer la fenêtre)
 * 02. OK - Calendrier : gestion des modifications de l'année et du mois : affichage du mois et du jour en cours.
 * 03. OK - Saisie : gestion des événements + entrées/sorties.
 * 04. PageWeb : boutons de navigations, adresses stockées, modification du titre, de la liste et de l'affichage
 * 05. YouTube : gestion du changement de code et de titre. Gestion du départ différé.
 * 06. Menu contextuel dans la fenêtre pure
 * 07. Base de données - sauvegarde de la page affichée, du répertoire, de l'agenda...
 * 08. Dessin dans la fenêtre SVG : édition à la souris + bouton de droite. Modification des commandes. Sauvegarde automatisée
 * 09. Écriture dans la fenêtre Document : édition clavier, souris, copier, coller. Enregistrement automatisée
 * 10. Stations de radio & balado-diffusion (mp3).
 * 11. Interface téléphone (Maps, mp3, adresses, emploi du temps)
 * 12. Saisie de type CheckBox (valeur = true/false) et ListeChoix
 * 13. Fenêtre modale avec < Confirmer(invite, surConfirm) >,  < Saisir(invite, valeur, surEntree) > < ChoisirParmi (items) >
 */
 const ANNEE = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
 const SEMAINE = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
 const voyelleInitiale = (txt) => ["a", "e", "i", "o", "u", "y"].find(t => txt.toLowerCase().startsWith(t));
 class JeuCouleurs extends Obj {
     /**
      * Jeu de couleurs pour élément interactif
      * @param a fond survolé
      * @param b fond enfoncé
      * @param c font normal
      * @param d bord survolé
      * @param e bord enfoncé
      * @param f bord normal
      * @param g texte survolé
      * @param h texte enfoncé
      * @param i texte normal
      */
     constructor(a, b, c, d, e, f, g, h, i) {
         super("coul");
         this.cibles = [];
         this.creerProp("fondNorm", a);
         this.creerProp("bordNorm", b);
         this.creerProp("texteNorm", c);
         this.creerProp("fondBas", d);
         this.creerProp("bordBas", e);
         this.creerProp("texteBas", f);
         this.creerProp("fondHaut", g);
         this.creerProp("bordHaut", h);
         this.creerProp("texteHaut", i);
     }
     actualiser() {
         this.cibles.forEach(cible => cible.actualiser());
     }
     cibler(v, bCibler = true) {
         const index = this.cibles.indexOf(v);
         if (bCibler) {
             if (index == -1)
                 this.cibles.push(v);
         }
         else {
             if (index > -1)
                 this.cibles.splice(index, 1);
         }
         v.actualiser();
     }
     copier(jeu) {
         this.fondHaut = jeu.fondHaut;
         this.fondBas = jeu.fondBas;
         this.fondNorm = jeu.fondNorm;
         this.bordHaut = jeu.bordHaut;
         this.bordBas = jeu.bordBas;
         this.bordNorm = jeu.bordNorm;
         this.texteHaut = jeu.texteHaut;
         this.texteBas = jeu.texteBas;
         this.texteNorm = jeu.texteNorm;
     }
     /**
      * Définit la liste des couleurs
      * @param a fond survolé
      * @param b fond enfoncé
      * @param c font normal
      * @param d bord survolé
      * @param e bord enfoncé
      * @param f bord normal
      * @param g texte survolé
      * @param h texte enfoncé
      * @param i texte normal
      */
     definir(a, b, c, d, e, f, g, h, i) {
         this.fondHaut = a;
         this.fondBas = b;
         this.fondNorm = c;
         this.bordHaut = d;
         this.bordBas = e;
         this.bordNorm = f;
         this.texteHaut = g;
         this.texteBas = h;
         this.texteNorm = i;
     }
     get fondHaut() { return this.lit("fondHaut"); }
     set fondHaut(value) { this.met("fondHaut", value); }
     get fondBas() { return this.lit("fondBas"); }
     set fondBas(value) { this.met("fondBas", value); }
     get fondNorm() { return this.lit("fondNorm"); }
     set fondNorm(value) { this.met("fondNorm", value); }
     get bordHaut() { return this.lit("bordHaut"); }
     set bordHaut(value) { this.met("bordHaut", value); }
     get bordBas() { return this.lit("bordBas"); }
     set bordBas(value) { this.met("bordBas", value); }
     get bordNorm() { return this.lit("bordNorm"); }
     set bordNorm(value) { this.met("bordNorm", value); }
     get texteHaut() { return this.lit("texteHaut"); }
     set texteHaut(value) { this.met("texteHaut", value); }
     get texteBas() { return this.lit("texteBas"); }
     set texteBas(value) { this.met("texteBas", value); }
     get texteNorm() { return this.lit("texteNorm"); }
     set texteNorm(value) { this.met("texteNorm", value); }
 }
 class Btn extends Champ {
     constructor(cible, id, x, y, lg, ht, arrondi, texte) {
         super(cible, "span", id);
         this.span = this.el;
         this.css.overflow = "hidden";
         this.cadrer(x, y, lg, ht, arrondi);
         this.texte = texte;
         this.interligne = ht - 3;
         this.css.cursor = "pointer";
         this.jeu = new JeuCouleurs("#CCCCFF", "#9999FF", "#6666FF", "#9999FF", "#6666FF", "#CCCCFF", "#EEEEFF", "#AAAAFF", "#9999FF");
         this.selectionnable = false;
         this.reactif = true;
         this.creerProp("action", (b) => { });
         this.ecouter("mouseover", () => this.montrer("haut"));
         this.ecouter("mouseup", () => this.montrer("haut"));
         this.ecouter("mouseout", () => this.montrer("norm"));
         this.formater("arial", 11, this.jeu.texteNorm, "center");
         this.montrer("norm");
     }
     montrer(position) {
         switch (position) {
             case "haut":
                 this.colorier(this.jeu.fondHaut, this.jeu.bordHaut, this.jeu.texteHaut);
                 break;
             case "bas":
                 this.colorier(this.jeu.fondBas, this.jeu.bordBas, this.jeu.texteBas);
                 break;
             case "norm":
                 this.colorier(this.jeu.fondNorm, this.jeu.bordNorm, this.jeu.texteNorm);
                 break;
         }
     }
     get texte() { return this.el.textContent || ""; }
     set texte(value) { this.el.textContent = value; }
     get action() { return this.lit("action"); }
     set action(value) { this.met("action", value); }
 }
 class Bouton extends Btn {
     constructor(cible, id, x, y, lg, ht, arrondi, texte, action = () => { }) {
         super(cible, id, x, y, lg, ht, arrondi, texte);
         this.action = action;
         this.ecouter("mousedown", () => { this.montrer("bas"); this.action(this); });
     }
 }
 class Ligne extends Bouton {
     constructor(cible, id, x, y, lg, texte) {
         super(cible, id, x, y, lg, 20, 0, texte);
         this.bordure = "none";
         this.interligne = 18;
         this.align = "left";
         this.mgGauche = 4;
         this.jeu.definir("#CCCCFF", "#9999FF", "#FFFFFF", "", "", "", "#000000", "#FFFFFF", "#3333CC");
         this.montrer("norm");
     }
 }
 class BtnPression extends Btn {
     constructor(cible, id, x, y, lg, ht, arrondi, texte) {
         super(cible, id, x, y, lg, ht, arrondi, texte);
         this.ecouter("mousedown", () => {
             const btn = this, chrono = new Chrono(30, -1, () => btn.action(btn));
             btn.montrer("bas");
             btn.action(btn);
             chrono.lancer();
             window.addEventListener("mouseup", arreter);
             function arreter(e) {
                 window.removeEventListener("mouseup", arreter);
                 btn.montrer("norm");
                 chrono.arreter();
             }
         });
     }
 }
 class Etiquette extends Champ {
     /**
      * Zone d'affichage de texte simple
      * @param cible support
      * @param id identifiant
      * @param x gauche
      * @param y haut
      * @param lg largeur
      * @param ht hauteur
      * @param arrondi arrondi (0 par défaut)
      * @param texte texte
      * @param ctexte couleur du texte (fond transparent par défaut)
      */
     constructor(cible, id, x, y, lg, ht, texte, ctexte, arrondi = 0) {
         super(cible, "span", id);
         this.span = this.el;
         this.cadrer(x, y, lg, ht, arrondi);
         this.texte = texte;
         this.colorier("transparent", "transparent", ctexte);
     }
     get texte() { return this.el.textContent || ""; }
     set texte(value) { this.el.textContent = value; }
 }
 class Saisie extends Champ {
     constructor(cible, id, type, x, y, lg, ht, arrondi) {
         super(cible, "input", id);
         this.input = this.el;
         this.input.type = type;
         this.cadrer(x, y, lg, ht, arrondi);
         this.creerProp("action", (s) => { });
         this.ecouter("change", () => this.action(this));
         this.colorier("#DDF", "#FFF", "#009");
     }
     limiter(min, max, val) {
         this.input.min = `${min}`;
         this.input.max = `${max}`;
         this.texte = `${val}`;
         this.formater("verdana", 10, "#00F", "center");
     }
     get texte() { return this.input.value || ""; }
     set texte(value) { this.input.value = value; }
     get valeur() { return parseFloat(this.input.value); }
     set valeur(value) { this.input.value = value.toString(); }
     get action() { return this.lit("action"); }
     set action(value) { this.met("action", value); }
 }
 class Liste extends Conteneur {
     constructor(cible, id, x, y, lg, item, nbLignes) {
         super(cible, id, "#9999FF", "#6666FF");
         this.item = item;
         this.nbLignes = nbLignes;
         this.lignes = [];
         this.creerProp("index", 0);
         this.cadrer(x, y, lg, 2 + (this.nbLignes * 20), 0);
         this.css.overflow = "hidden";
         this.css.overflowY = "scroll";
         this.creerProp("action", (n) => { });
         for (let i = 0; i < item.length; i++) {
             this.ajouterLigne(i, item[i]);
         }
     }
     actualiser() {
         super.actualiser();
         if (this.lignes && this.lignes.length)
             this.lignes.forEach(ligne => ligne.lg = this.lg);
     }
     ajouterLigne(index, texte) {
         let ligne = new Ligne(this, "itm_" + index, 0, index * 20, this.lg, texte);
         ligne.ecouter("mousedown", () => {
             this.index = index;
             this.action(this.index, 0);
         });
         this.lignes.push(ligne);
     }
     modifierLigne(index, valeur) {
         this.lignes[index].texte = valeur;
     }
     get index() { return this.lit("index"); }
     set index(value) {
         this.met("index", Math.max(Math.min(value, this.item.length - 1), 0));
         this.valeur = this.item[value];
     }
     get action() { return this.lit("action"); }
     set action(value) { this.met("action", value); }
     get valeur() { return this.item[this.index]; }
     set valeur(value) {
         if (this.index !== this.item.indexOf(value)) {
             this.index = this.item.indexOf(value);
         }
     }
 }
 class ComboListe extends Liste {
     constructor(cible, id, x, y, lg, item) {
         super(cible, id, x + 40, y, lg - 40, item, 1);
         this.item = item;
         this.lignes.forEach(l => l.align = "center");
         this.prev = new Bouton(cible, "prev", x, y, 19, 22, 0, "⏴", () => this.changer(-1));
         this.suiv = new Bouton(cible, "suiv", x + 20, y, 19, 22, 0, "⏵", () => this.changer(+1));
     }
     changer(sens) {
         if (this.index + sens < 0) {
             this.boucler(-1);
         }
         else if (this.index + sens == this.item.length) {
             this.boucler(1);
         }
         else {
             this.index += sens;
             this.action(this.index, 0);
         }
     }
     boucler(sens) {
         this.index = sens == -1 ? this.item.length - 1 : 0;
         this.action(this.index, sens);
     }
     actualiser() {
         super.actualiser();
         if (this.lignes && this.lignes.length) {
             this.el.scrollTop = this.index * 20;
         }
     }
 }
 class Combo extends Conteneur {
     constructor(cible, id, x, y, lg, item, nbLignes) {
         super(cible, id, "#BBBBFF", "#000000");
         this.item = item;
         this.nbLignes = nbLignes;
         this.cadrer(x, y, lg, 24, 0);
         this.liste = new Liste(this, "liste", -1, 23, lg, item, nbLignes);
         this.saisie = new Saisie(this, "saisie", "text", 0, 0, lg - 20, 20, 0);
         this.saisie.ecouter("focus", () => this.deplier());
         this.saisie.bordure = "inset";
         this.saisie.epaisseur = 2;
         this.saisie.mgGauche = 2;
         this.bouton = new Bouton(this, "btn", lg - 19, 1, 16, 20, 0, "⏷");
         this.index = 0;
         let cl = this;
         // on a cliqué n'importe où ailleurs et la liste est ouverte : on la referme
         window.addEventListener("mousedown", (e) => { if (cl.ht > 24)
             cl.forcerFermeture(cl, e); });
         this.bouton.action = () => { cl.inverserPli(); };
     }
     actualiser() {
         super.actualiser();
         if (this.liste)
             this.liste.lg = this.lg;
         if (this.saisie)
             this.saisie.lg = this.lg - 20;
         if (this.bouton)
             this.bouton.x = this.lg - 19;
     }
     inverserPli() {
         this.ht == 24 ? this.deplier() : this.replier();
     }
     gestionClavier(c, e) {
         console.log("Combo : time", e.timeStamp, "clavier", e.code);
         if (e.code == "Escape")
             c.replier();
         if (e.code == "Enter")
             choisir(c.valeur);
         if (e.code == "ArrowDown")
             c.index++;
         if (e.code == "ArrowUp")
             c.index--;
         const t = c.saisie.texte;
         if (t.length <= 4) {
             let reg = new RegExp(c.saisie.texte, "i");
             let items = c.item.filter(it => reg.test(it));
             if (items.length === 1)
                 choisir(items[0]);
         }
         function choisir(valeur) {
             c.valeur = valeur;
             c.action(c.index, 0);
         }
     }
     deplier() {
         const c = this;
         c.bouton.texte = "⏶";
         c.ht = this.liste.fy + 2;
         c.mettreDevant();
         c.saisie.input.addEventListener("blur", () => c.replier());
         c.saisie.input.addEventListener('keydown', (k) => c.gestionClavier(c, k));
     }
     replier() {
         const c = this;
         c.bouton.texte = "⏷";
         c.ht = 24;
         c.saisie.el.blur();
         c.saisie.input.removeEventListener("blur", () => c.replier());
         c.saisie.input.removeEventListener('keydown', (k) => c.gestionClavier(c, k));
     }
     forcerFermeture(cl, e) {
         let t = e.target;
         if (cl.el.contains(t))
             return;
         if (cl.el == t)
             return;
         cl.replier(); // fermé sans callback
     }
     get action() { return this.liste.action; }
     set action(value) {
         this.liste.action = (n, n2) => {
             this.saisie.texte = this.item[n];
             this.replier();
             value(n, n2);
         };
     }
     get nbItems() { return this.item.length; }
     get index() { return this.liste.index; }
     set index(value) {
         this.liste.index = value;
         this.valeur = this.liste.valeur;
     }
     get valeur() { return this.liste.valeur; }
     set valeur(value) {
         if (this.liste.valeur != value) {
             this.liste.valeur = value;
             this.action(this.liste.index, 0);
         }
         this.saisie.texte = this.liste.valeur;
     }
 }
 class Deplacement {
     constructor(fen) {
         const barre = fen.barre;
         barre.ecouter("mousedown", (b) => {
             fen.mettreDevant();
             if (!fen.portable)
                 return;
             barre.montrer("bas");
             window.addEventListener("mousemove", drag);
             window.addEventListener("mouseup", endDrag);
             function drag(e) {
                 if (e.buttons !== 1) {
                     endDrag(e);
                     return; // 1= gauche 2= droite 0=aucun
                 }
                 e.stopImmediatePropagation();
                 e.stopPropagation();
                 fen.placer(fen.x + e.movementX, fen.y + e.movementY);
                 fen.ecrire(`x:${fen.x} - y:${fen.y}`);
             }
             function endDrag(e) {
                 e.stopImmediatePropagation();
                 e.stopPropagation();
                 window.removeEventListener("mousemove", drag);
                 window.removeEventListener("mouseup", endDrag);
                 fen.ecrire(fen.titre);
             }
         });
     }
 }
 class Redimensionnement {
     constructor(fen) {
         fen.tail.action = (b) => {
             window.addEventListener("mousemove", drag);
             window.addEventListener("mouseup", endDrag);
             fen.mettreDevant();
             function drag(e) {
                 if (e.buttons !== 1) {
                     endDrag(e);
                     return;
                 }
                 e.stopImmediatePropagation();
                 e.stopPropagation();
                 const lg = Math.max(fen.lg + e.movementX, 100) | 0;
                 const ht = Math.max(fen.ht + e.movementY, 100) | 0;
                 fen.tailler(lg, ht, fen.arrondi);
                 fen.ecrire(`${lg} x ${ht}`);
             }
             function endDrag(e) {
                 e.stopImmediatePropagation();
                 e.stopPropagation();
                 window.removeEventListener("mousemove", drag);
                 window.removeEventListener("mouseup", endDrag);
                 fen.ecrire(fen.titre);
             }
         };
     }
 }
 class Survol {
     constructor(c, coulSurvol, coulSortie, coulActif) {
         c.reactif = true;
         c.ecouter("mouseover", () => { c.coulFond = coulSurvol; });
         c.ecouter("mouseout", () => { c.coulFond = c.actif ? coulActif : coulSortie; });
         c.coulFond = c.actif ? coulActif : coulSortie;
     }
 }
 class Fenetre extends Conteneur {
     constructor(cible, id, info, x, y, lg, ht, fond, bord) {
         super(cible, id, fond, bord);
         this.creerProp("titre", info);
         this.creerProp("fermable", true);
         this.creerProp("portable", true);
         this.creerProp("taillable", true);
         this.barre = new Bouton(this, "barre", 0, 0, 0, 20, 0, info);
         this.ferm = new Bouton(this, "ferm", 0, 0, 19, 20, 0, "🗙");
         this.tail = new Bouton(this, "tail", 0, 0, 19, 20, 0, "◢");
         this.tail.taillePts = 10; // un peu plus petit...
         new Deplacement(this);
         new Redimensionnement(this);
         this.ferm.action = () => { this.detruire(); };
         this.cadrer(x, y, lg, ht, 0);
         this.mettreDevant();
     }
     creerMenu(items, onMenu) {
         let cmb = new Combo(this, "menu", 0, 20, 100, items, items.length);
         cmb.action = (n) => onMenu(n);
     }
     actualiser() {
         super.actualiser();
         if (this.tail == undefined)
             return;
         const x2 = this.lg - 21, y2 = this.ht - 22;
         this.barre.lg = this.fermable ? x2 : this.lg - 2;
         this.ferm.x = x2;
         this.tail.x = x2;
         this.tail.y = y2;
         this.ferm.visible = this.fermable;
         this.tail.visible = this.taillable;
         this.ecrire(this.titre);
     }
     ecrire(...contenu) { this.barre.texte = contenu.join(" "); }
     get fermable() { return this.lit("fermable"); }
     set fermable(value) { this.met("fermable", value); }
     get portable() { return this.lit("portable"); }
     set portable(value) { this.met("portable", value); }
     get taillable() { return this.lit("taillable"); }
     set taillable(value) { this.met("taillable", value); }
     get titre() { return this.lit("titre"); }
     set titre(value) { this.met("titre", value); }
 }
 class PropVue extends Conteneur {
     constructor(p, alias, type, v) {
         super(p, alias, "#666699", "#333366");
         this.v = v;
         p.vues.push(this);
         this.cadrer(0, p.vues.length * 20, p.lg - 2, 22, 0);
         p.ht = this.fy + 2;
         this.label = new Etiquette(this, "lbl", 0, 0, 145, 19, alias, "#CCCCFF");
         this.label.mgDroite = 5;
         this.label.align = "right";
         this.saisie = new Saisie(this, "inpt", type, 147, 0, this.lg - 154, 19, 0);
         this.input = this.saisie.input;
         type == "checkbox" ? this.input.checked = this.v.valeur : this.input.value = this.v.valeur;
         this.saisie.ecouter("input", (e) => {
             switch (type) {
                 case "number":
                     v.valeur = parseFloat(this.input.value);
                     break;
                 case "checkbox":
                     v.valeur = this.input.checked;
                     break;
                 default:
                     v.valeur = this.input.value;
                     break; // "text" | "color"
             }
             if (p.choisi instanceof Fenetre) {
                 p.choisi.ferm.jeu.copier(p.choisi.barre.jeu);
                 p.choisi.tail.jeu.copier(p.choisi.barre.jeu);
                 p.choisi.barre.montrer("norm");
                 p.choisi.ferm.montrer("norm");
                 p.choisi.tail.montrer("norm");
             }
         });
         this.v.addEventListener(v.id, () => {
             if (this.input.type == "checkbox") {
                 this.input.checked = this.v.valeur;
             }
             else if (this.v.valeur != this.input.value) {
                 this.input.value = this.v.valeur;
             }
         });
     }
 }
 class VueProprietes extends Fenetre {
     constructor(cible, id, x, y, lg, fond, bord) {
         super(cible, "propriétés", id, x, y, lg, 24, fond, bord);
         this.vues = [];
         this.taillable = false;
         this.fermable = false;
     }
     afficherVisuel(v) {
         if (this.choisi == v)
             return;
         v.ecouter("fin", (e) => this.vider());
         if (v instanceof PageWeb) {
             this.titre = "Propriétés de la page web";
         }
         else if (v instanceof VideoYouTube) {
             this.titre = "Propriétés de la vidéo";
         }
         else if (v instanceof Calendrier) {
             this.titre = "Propriétés du calendrier";
         }
         else if (v instanceof FeuilleDessin) {
             this.titre = "Propriété du Dessin";
         }
         else if (v instanceof Fenetre) {
             this.titre = "Propriétés de la fenêtre";
         }
         else if (v instanceof Visuel) {
             this.titre = "Propriétés du visuel";
         }
         this.vider();
         this.ajouterTxt(v, "identifiant", "nom");
         if (v instanceof VideoYouTube)
             this.ajouterTxt(v, "code vidéo", "code");
         this.ajouterNum(v, "gauche", "x");
         this.ajouterNum(v, "haut", "y");
         this.ajouterNum(v, "largeur", "lg");
         this.ajouterNum(v, "hauteur", "ht");
         this.ajouterNum(v, "arrondi", "arrondi");
         this.ajouterNum(v, "épaisseur", "epaisseur");
         this.ajouterCol(v, "couleur fond", "coulFond");
         this.ajouterCol(v, "couleur bord", "coulBord");
         if (v instanceof Fenetre) {
             this.ajouterCol(v.barre.jeu, "fond barre", "fondNorm");
             this.ajouterCol(v.barre.jeu, "bord barre", "bordNorm");
             this.ajouterCol(v.barre.jeu, "texte barre", "texteNorm");
             this.ajouterCol(v.barre.jeu, "fond barre survol", "fondHaut");
             this.ajouterCol(v.barre.jeu, "bord barre survol", "bordHaut");
             this.ajouterCol(v.barre.jeu, "texte barre survol", "texteHaut");
             this.ajouterBol(v, "déplaçable ?", "portable");
             this.ajouterBol(v, "taillable ?", "taillable");
             this.ajouterBol(v, "fermable ?", "fermable");
         }
         this.choisi = v;
         this.visible = true;
     }
     ajouterTxt(v, alias, propId) {
         new PropVue(this, alias, "text", v.prop(propId));
     }
     ajouterCol(obj, alias, propId) {
         new PropVue(this, alias, "color", obj.prop(propId));
     }
     ajouterNum(v, alias, propId) {
         new PropVue(this, alias, "number", v.prop(propId));
     }
     ajouterBol(v, alias, propId) {
         new PropVue(this, alias, "checkbox", v.prop(propId));
     }
     vider() {
         this.vues.forEach(v => v.detruire());
         this.vues = [];
         this.ht = 24;
         this.visible = false;
     }
 }
 class VideoYouTube extends Fenetre {
     constructor(cible, id, titre, code, x, y, lg, ht) {
         super(cible, id, titre, x, y, lg, ht, "black", "black");
         this.creerProp("code", "");
         this.iframe = document.createElement("iframe");
         this.div.appendChild(this.iframe);
         this.code = code;
     }
     actualiser() {
         super.actualiser();
         if (this.iframe == undefined)
             return;
         this.iframe.setAttribute("width", `${this.lg}`);
         this.iframe.setAttribute("height", `${this.ht - 50}`);
     }
     get code() { return this.lit("code"); }
     set code(value) {
         this.met("code", "");
         this.met("code", value);
         this.iframe.outerHTML = `<iframe 
             style="top:25px; left:0px; width:100%; height:88%" width="${this.lg}" height="${this.ht - 50}" 
             src = "https://www.youtube.com/embed/${value}" frameborder="0"
             allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowfullscreen>
             </iframe>`;
     }
 }
 class Rideau extends Fenetre {
     constructor(cible, id, info, x, y, lg, ht) {
         super(cible, id, info, x, y, lg, ht, "black", "black");
         this.iframe = document.createElement("iframe");
         this.div.appendChild(this.iframe);
         this.iframe.setAttribute("frameborder", "0");
         this.iframe.setAttribute("style", "border:0");
         this.iframe.setAttribute("allowfullscreen", "");
         this.tail.mettreDevant();
     }
     actualiser() {
         super.actualiser();
         if (this.iframe == undefined)
             return;
         this.iframe.setAttribute("width", `${this.lg}`);
         this.iframe.setAttribute("height", `${this.ht - 22}`);
     }
 }
 class OpenStreetMap extends Rideau {
     constructor(cible, id, info, x, y, lg, ht) {
         super(cible, id, info, x, y, lg, ht);
         this.afficherCarte();
     }
     afficherCarte(a = 3.7923, b = 43.6639, c = 3.9733, d = 43.5650) {
         this.iframe.outerHTML = `<iframe 
             style="top:20px; left:0px; width:100%; height:100%;"
             width="${this.lg}" height="${this.ht - 40}" 
             frameborder="0" scrolling="yes" 
             marginheight="0" marginwidth="0" 
             src="https://www.openstreetmap.org/export/embed.html?bbox=${a}%2C${b}%2C${c}%2C${d}&amp;layer=mapnik"></iframe>`;
     }
 }
 class PageWeb extends Rideau {
     constructor(cible, nom, urls, x, y, lg, ht) {
         super(cible, nom, urls[0], x, y, lg, ht);
         this.creerProp("url", "");
         this.cmbAdresse = new ComboListe(this, "adresses", 0, 20, lg - 3, urls);
         this.cmbAdresse.action = (n) => { this.url = this.cmbAdresse.item[n]; };
         this.tail.mettreDevant();
         this.url = urls[0];
     }
     actualiser() {
         super.actualiser();
         if (this.iframe)
             this.iframe.setAttribute("style", `top:44px; left:0; width:100%; height:100%`);
         if (this.cmbAdresse)
             this.cmbAdresse.lg = this.lg;
     }
     get url() { return this.lit("url"); }
     set url(value) {
         this.iframe.setAttribute("src", value);
         this.titre = value;
         this.actualiser();
     }
 }
 class Calendrier extends Fenetre {
     constructor(cible, mois, an, x, y) {
         super(cible, mois + "_" + an, `mois de ${mois} ${an}`, x, y, 250, 200, "#99F", "#333");
         this.dates = [];
         this.taillable = false;
         this.creerProp("action", (c) => { });
         this.creerProp("jour", 1);
         this.creerProp("mois", ANNEE.indexOf(mois));
         this.creerProp("an", an);
         // ligne des noms de semaine
         SEMAINE.forEach((j, i) => new Etiquette(this, j, 2 + (i * 35), 49, 34, 20, j.substr(0, 3), "#339", 4).align = "center");
         this.cmbMois = new ComboListe(this, "tMois", 2, 23, 140, ANNEE);
         this.cmbMois.action = (n, n2) => {
             this.mois = n;
             if (n2 == -1)
                 this.an--;
             if (n2 == 1)
                 this.an++;
         };
         this.cmbMois.index = this.mois;
         this.inAnnee = new Saisie(this, "nAnnee", "number", 175, 23, 70, 24, 0);
         this.inAnnee.coulBord = "black";
         this.inAnnee.limiter(1900, 2100, an);
         this.inAnnee.action = () => this.an = this.inAnnee.valeur;
         this.cmbMois.mettreDevant();
         this.afficher();
     }
     afficher() {
         const sem = "Mois d", val = ANNEE[this.mois] + " " + this.an;
         this.titre = (voyelleInitiale(val) ? sem + "'" + val : sem + "e " + val);
         const mois = this.mois, an = this.an;
         this.dates.forEach(d => d.detruire());
         this.cmbMois.valeur = ANNEE[this.mois];
         this.inAnnee.valeur = this.an;
         let premier = new Date(an, mois, 1), pjr = premier.getDay(), enCours = premier;
         let apres = new Date(an, mois + 1, 1);
         let dx = (pjr * 35) + 2, dy = 68, date;
         while (enCours < apres) {
             date = enCours.getDate();
             let eti = new Etiquette(this, "j_" + date, dx, dy, 33, 19, date + "", "#339");
             eti.actif = this.jour == date;
             eti.align = "center";
             new Survol(eti, "#FCC", "#DDF", "#FFF");
             eti.reactif = true;
             eti.ecouter("click", () => { this.jour = parseInt(eti.texte); this.afficher(); });
             this.dates.push(eti);
             dx += 35;
             if (dx > 220) {
                 dx = 2;
                 dy += 21;
             }
             enCours.setDate(date + 1);
         }
     }
     /**
      * Numéro du jour dans le mois
      */
     get jour() { return this.lit("jour"); }
     set jour(value) {
         this.met("jour", value);
         this.action(this);
     }
     /**
      * Numéro du mois de 0 à 11
      */
     get mois() { return this.lit("mois"); }
     set mois(value) { this.met("mois", value); this.afficher(); }
     /**
      * Numéro de l'année
      */
     get an() { return this.lit("an"); }
     set an(value) {
         this.met("an", value);
         this.afficher();
     }
     get date() { return new Date(this.an, this.mois, this.jour); }
     get action() { return this.lit("action"); }
     set action(value) { this.met("action", value); }
 }
 class FeuilleDessin extends Fenetre {
     constructor(cible, id, info, x, y, lg, ht, bord) {
         super(cible, id, info, x, y, lg, ht, "black", bord);
         this.taillable = false;
         this.dessin = new Dessin(this, "dessin");
     }
 }
 class Poignee extends Visuel {
     constructor(edi, id) {
         super("div", id);
         this.edi = edi;
         this.edi.accueillir(this);
         this.coulFond = "#0CF";
         this.coulBord = "#00F";
         this.bordure = "dotted";
         this.epaisseur = 0.5;
         this.alpha = 50;
         this.tailler(10, 10, 3);
         edi.poignees.push(this);
         const ed = edi, poign = this;
         poign.reactif = true;
         poign.ecouter("mousedown", startDrag);
         function startDrag(e) {
             if (e.target == e.currentTarget) {
                 e.stopImmediatePropagation();
                 e.stopPropagation();
                 window.addEventListener("mousemove", drag);
                 window.addEventListener("mouseup", stopDrag);
             }
         }
         function drag(e) {
             if (e.buttons == 0) {
                 stopDrag();
                 return;
             }
             switch (poign.nom) {
                 case "haugau":
                     edi.x += e.movementX;
                     edi.y += e.movementY;
                     break;
                 case "basdro":
                     edi.lg += e.movementX;
                     edi.ht += e.movementY;
                     break;
                 case "gau":
                     edi.x += e.movementX;
                     break;
                 case "hau":
                     edi.y += e.movementY;
                     break;
                 case "dro":
                     edi.lg += e.movementX;
                     break;
                 case "bas":
                     edi.ht += e.movementY;
                     break;
             }
             edi.poignees.forEach(p => p.replacer(true));
         }
         function stopDrag() {
             window.removeEventListener("mousemove", drag);
             window.removeEventListener("mouseup", stopDrag);
         }
     }
     replacer(visible) {
         this.visible = visible;
         if (!visible)
             return;
         const fx = this.edi.lg, fy = this.edi.ht, mx = fx / 2, my = fy / 2;
         switch (this.nom) {
             case "haugau":
                 this.centrer(0, 0);
                 break;
             case "basdro":
                 this.centrer(fx, fy);
                 break;
             case "gau":
                 this.centrer(0, my);
                 break;
             case "dro":
                 this.centrer(fx, my);
                 break;
             case "cen":
                 this.centrer(mx, my);
                 break;
             case 'hau':
                 this.centrer(mx, 0);
                 break;
             case "bas":
                 this.centrer(mx, fy);
                 break;
         }
     }
 }
 class Editable extends Fenetre {
     constructor(cible, id, info, x, y, lg, ht, fond, bord) {
         super(cible, id, info, x, y, lg, ht, fond, bord);
         this.edis = [];
         this.creerMenu(["Texte", "Image", "Lien"], (n) => {
             switch (n) {
                 case 0:
                     new EdiTexte(this);
                     break;
                 case 1:
                     new EdiImage(this);
                     break;
                 case 2:
                     new EdiLien(this);
                     break;
             }
         });
         this.reactif = true;
         this.ecouter("mousedown", (e) => {
             if (e.currentTarget == this.el)
                 this.edis.forEach(e => e.enEdition = false);
         });
     }
 }
 class Edi extends Conteneur {
     constructor(fen, type, lg, ht, cfond) {
         super(fen, "ed" + type + "_" + fen.nbEnfants, cfond, "transparent");
         this.fen = fen;
         this.type = type;
         this.poignees = [];
         this.creerProp("edition", false);
         this.el.style.overflow = "";
         this.tab = 0;
         this.cadrer(40, 40, lg, ht, 0);
         this.mettreDevant();
         new Poignee(this, "gau");
         new Poignee(this, "hau");
         new Poignee(this, "haugau");
         new Poignee(this, "basdro");
         new Poignee(this, "dro");
         new Poignee(this, "bas");
         this.ecouter("click", () => this.enEdition = true);
         fen.edis.push(this);
     }
     get enEdition() { return this.lit("edition"); }
     set enEdition(value) {
         this.met("edition", value);
         const edi = this;
         if (value) {
             this.mettreDevant();
             this.fen.edis.forEach((e) => { if (e !== this)
                 e.enEdition = false; });
             window.addEventListener("keydown", e => surClavier(e));
         }
         else {
             window.removeEventListener("keydown", (e) => surClavier(e));
         }
         function surClavier(k) {
             switch (k.code) {
                 case "Delete":
                     edi.detruire();
                     break;
                 case "Escape":
                     edi.enEdition = false;
                     break;
                 case "ArrowDown":
                     edi.y++;
                     break;
                 case "ArrowUp":
                     edi.y--;
                     break;
                 case "ArrowLeft":
                     edi.x--;
                     break;
                 case "ArrowRight":
                     edi.x++;
                     break;
                 default: console.log(k.code);
             }
         }
         this.poignees.forEach(p => p.replacer(value));
     }
 }
 class EdiTexte extends Edi {
     constructor(f) {
         super(f, "Txt", 200, 100, "#FFF");
     }
 }
 class EdiImage extends Edi {
     constructor(f) {
         super(f, "Img", 80, 80, "#9C9");
     }
 }
 class EdiLien extends Edi {
     constructor(f) {
         super(f, "Lien", 200, 25, "#CCF");
     }
 }
 window.onload = (e) => {
     const sujet = "Scène hyperactive";
     const marque = " ©HomeSweetHome 2019-2020";
     const dureeTitrage = 2500;
     var delaiTitrage = 0;
     const scene = new Scene("#99F");
     const etiTitre = new Etiquette(scene, "titre", 2, 2, scene.lg - 6, 24, sujet, '#FFF');
     etiTitre.formater("verdana", 13, "#FFF", "center");
     etiTitre.capitales = true;
     const etiPied = new Etiquette(scene, "pied", -1, scene.ht - 20, scene.lg, 20, marque, "#FFF");
     etiPied.colorier("#339", "#339", "#FFF");
     etiPied.align = "right";
     etiPied.mgDroite = 6;
     etiPied.italiques = true;
     const volet = new Conteneur(scene, "volet", "#669", "#669");
     scene.ecouter("souris", informer);
     scene.ecouter("redim", ajusterScene);
     const jr = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
     let mois = new Date(), calendrier = [], m = mois.getMonth(), j = 1;
     mois.setDate(j);
     while (mois.getMonth() == m) {
         calendrier.push(mois.toLocaleDateString("fr-FR", jr));
         mois.setDate(++j);
     }
     let cmlJour = new ComboListe(volet, "cmlJour", 2, 305, 245, calendrier);
     cmlJour.action = () => titrer("Vous avez choisi le", cmlJour.valeur);
     let cal = new Calendrier(volet, "décembre", 2019, -1, 1);
     cal.action = (c) => {
         titrer("Choisi le", c.date.toLocaleDateString("fr-FR", jr));
         cmlJour.index = c.jour - 1;
     };
     cal.portable = false;
     cal.fermable = false;
     const vueProps = new VueProprietes(volet, "Propriétés de la fenêtre", 4, 20, 240, "#CCC", "#999");
     new Bouton(volet, "btnFen", 4, 210, 120, 24, 4, "Fenêtre", () => creerFen("Fenêtre sans nom"));
     new Bouton(volet, "btnCalend", 125, 210, 120, 24, 4, "Calendrier", () => creerCalend(new Date(), cmlJour));
     new Bouton(volet, "btnTube", 4, 235, 120, 24, 4, "YouTube", () => creerYouTube("About Sting", "Gregory Porter performs 'It's Probably Me'", "lSzICmwmRsA"));
     new Bouton(volet, "btnPage", 125, 235, 120, 24, 4, "Page web")
         .action = () => creerPageWeb("Mes sites favoris", ["http://www.meteofrance.com/accueil",
         "http://www.meteofrance.com/previsions-meteo-france/montpellier/34000",
         "http://multiflash.free.fr/",
         "http://www.alanwood.net/demos/webdings.html",
         "https://www.cnrtl.fr/proxemie/cheval",
         "http://jeanmariepetit.free.fr"]);
     new Bouton(volet, "btnSvg", 4, 260, 120, 24, 4, "Dessin SVG", () => creerDessin());
     new Bouton(volet, "btnMap", 125, 260, 120, 24, 4, "Open Street Map", () => creerCarte());
     creerDessin();
     ajusterScene();
     function creerFen(titre) {
         let fen = new Editable(scene, "fenêtre", titre, 100, 100, 600, 450, "#88F", "#77F");
         fen.ecouter("mousedown", () => vueProps.afficherVisuel(fen));
         vueProps.afficherVisuel(fen);
         return fen;
     }
     function creerCarte() {
         let v = new OpenStreetMap(scene, "map", "OpenStreetMap", 150, 150, 425, 370);
         v.ecouter("mousedown", () => vueProps.afficherVisuel(v));
         vueProps.afficherVisuel(v);
         return v;
     }
     function creerDessin() {
         let v = new FeuilleDessin(scene, "fenêtre", "Carte postale", 75, 75, 600, 420, "black");
         cartePostale(v);
         v.ecouter("mousedown", () => vueProps.afficherVisuel(v));
         vueProps.afficherVisuel(v);
         return v;
     }
     function creerCalend(jour, cl) {
         const mois = ANNEE[jour.getMonth()], an = jour.getFullYear();
         let v = new Calendrier(scene, mois, an, 280, 280);
         v.action = (c) => {
             titrer("Vous avez choisi :", c.date.toLocaleDateString("fr-FR", jr));
             cl.index = c.jour - 1;
         };
         v.ecouter("mousedown", () => vueProps.afficherVisuel(v));
         vueProps.afficherVisuel(v);
         return v;
     }
     function cartePostale(fen) {
         const largeur = fen.lg, hauteur = fen.ht - 20;
         const carte = fen.dessin;
         carte.cadrer(0, 20, largeur, hauteur)
             .lineaire("turq", 0, 0, 0, 1, ["#00F", "1", "0", "#0BB", "1", "100"])
             .radial("stone", 0.5, 0.5, 0.75, 0.2, 0.1, ["#121", "1", "0", "#343", "1", "50", "#696", "1", "100"])
             .radial("gold", 0.9, 0.6, 0.75, 0.4, 0.1, ["#FF0", "1", "0", "#F60", "0.85", "100"]);
         carte.rectangle("ciel", 0, 0, largeur, 150).styler("#39F");
         carte.rectangle("plage", 0, 175, largeur, 225).styler("url(#gold)");
         carte.chemin("mer", "url(#turq)")
             .courbure(0, 275, 190, 250, 300, 175, largeur, 200)
             .aller(largeur, 200, largeur, 125, 0, 125, 0, 275).fermer();
         carte.cercle("soleil", 450, 75, 25).styler("#FF9900");
         carte.ellipse("pierre", 20, 135, 150, 30).styler("url(#stone)", "", 0, 1);
         carte.cercle("rocherRond", 32, 110, 25).styler("url(#stone)");
         carte.ellipse("rocherJaune", 20, 120, 50, 25).styler("url(#gold)").tordre(30);
         carte.ellipse("rocherLong", 47, 135, 15, 10).styler("url(#stone)");
         creerGrille(carte, 20, "#999");
     }
     function creerGrille(dessin, pas, couleur = "#FFF") {
         const lgDessin = dessin.lg, htDessin = dessin.ht;
         let grille = dessin.chemin("grille", "", couleur, 0.5);
         for (let x = pas; x < lgDessin; x += pas)
             grille.trait(x, 0, x, htDessin);
         for (let y = pas; y < htDessin; y += pas)
             grille.trait(0, y, lgDessin, y);
     }
     function creerYouTube(id, titre, code) {
         let v = new VideoYouTube(scene, id, titre, code, 200, 200, 640, 400);
         v.ecouter("mousedown", () => vueProps.afficherVisuel(v));
         vueProps.afficherVisuel(v);
         return v;
     }
     function creerPageWeb(titre, urls) {
         let v = new PageWeb(scene, titre, urls, 40, 40, 850, 700);
         v.ecouter("mousedown", () => vueProps.afficherVisuel(v));
         vueProps.afficherVisuel(v);
         return v;
     }
     function ajusterScene() {
         etiTitre.lg = scene.lg - 6;
         etiPied.cadrer(-1, scene.ht - 21, scene.lg, 20, 0);
         volet.cadrer(scene.lg - 254, 2, 250, scene.ht - 25, 0);
         vueProps.fy = scene.ht - 56;
         informer();
     }
     function informer() {
         volet.mettreDevant();
         etiPied.texte = `souris ${scene.sceneX} ${scene.sceneY} - (${scene.lg} x ${scene.ht}) ${marque}`;
     }
     /**
      * Affiche un texte dans la zone de titre pendant 2 secondes
      * @param textes textes à joindre par un espace
      */
    function titrer(...textes) {
         if (delaiTitrage)
            clearTimeout(delaiTitrage);
        etiTitre.texte = textes.join(" ");
        etiTitre.coulFond = "#F96";
        delaiTitrage = setTimeout(() => {
            etiTitre.texte = sujet + " " + marque;
            etiTitre.coulFond = "transparent";
        }, dureeTitrage);
    }
 }

