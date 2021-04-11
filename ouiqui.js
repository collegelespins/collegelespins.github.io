"use strict";
// ------------------------------------------------ UTILS.JS --------------------------------------------------

const Number2Color = (n, a) => {
    let [r, g, b, alpha] = [(n >> 16) & 0xFF, (n >> 8) & 0xFF, n & 0xFF, a / 100];
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
/**
 * Affiche un entier sous la forme "0n" ou "nn"
 * @param dec nombre décimal
 */
const Digits = (dec) => {
    var nb = dec.toString(16).toUpperCase();
    return (nb.length < 2) ? "0" + nb : nb;
};

const Time = (d) => { return d.toString().substr(0, 24); };
/**
 * Renvoie les valeurs html permettant de dessiner un tableau
 * @param w largeur du tableau
 * @param rows nombre de rangées (horizontales)
 * @param cols nombre de colonnes (verticales)
 */
const GetHtmlTable = (w, rows, cols) => {
    let tbl = "<table style='width:" + (w) + "px; border:1px solid grey; border-collapse:collapse'>";
    for (let l = 0; l < rows; l++) {
        tbl += "<tr style='padding:3px'>";
        for (let c = 0; c < cols; c++) {
            tbl += "<td style='border:1px dotted black;'></td>";
        }
        tbl += "</tr>";
    }
    tbl += "</table>";
    return tbl;
};
class DBRecorder {
    /**
     * Définit le lecteur-enregistreur de Store en base de données indexée
     * @param baseName Nom de la base de données locale
     * @param tableName Nom du Stockage de données local
     */
    constructor(baseName, tableName) {
        this.baseName = baseName;
        this.tableName = tableName;
    }
    record(id, value) {
        return this.put({ id: id, value: value });
    }
    remember(id) {
        return this.load(id);
    }
    async rename(item, newId) {
        await this.delete(item.id);
        item.id = newId;
        return this.put(item);
    }
    /**
     * Ajoute un élément à la table. Erreur s'il existe une valeur de même identifiant
     * @param object Elément à enregistrer. Il doit avoir un 'id' textuel
     */
    add(object) {
        return this.execute("add", object, false);
    }
    clear() {
        return this.execute("clear", "", false);
    }
    /**
    * Supprime un enregistrement de la table
    * @param id identifiant de l'objet à supprimer
    */
    delete(id) {
        return this.execute("delete", id, false);
    }
    /**
     * Renvoie dans un Array tous les items de la table
     */
    getAll() {
        return this.execute("getAll", "", true);
    }
    /**
     * Ouvre et renvoie un objet enregistré dans la base
     * @param id identifiant de l'objet désiré
     */
    load(id) {
        return this.execute("load", id, true);
    }
    /**
     * Ajoute un élément à la table. Écrase une valeur de même identifiant
     * @param object Elément à enregistrer. Il doit avoir un 'id' textuel
     */
    put(object) {
        return this.execute("put", object, false);
    }
    execute(command, id_Object, readOnly) {
        let baseName = this.baseName, storeName = this.tableName;
        let dbRequest, request;
        let base, trans, store;
        return new Promise((resolve, reject) => {
            if ((command === "add" || command === "put") && id_Object.id === undefined) {
                reject(console.log("Objet sans identifiant"));
            }
            dbRequest = indexedDB.open(baseName);
            dbRequest.onerror = () => reject(console.log("Impossible d'ouvrir la base ?!"));
            dbRequest.onupgradeneeded = (e) => {
                base = e.target.result;
                base.createObjectStore(storeName, { keyPath: "id" });
            };
            dbRequest.onsuccess = function (e) {
                base = e.target.result;
                trans = base.transaction([storeName], readOnly ? "readonly" : "readwrite");
                store = trans.objectStore(storeName);
                switch (command) {
                    case "add":
                        request = store.add(id_Object);
                        break;
                    case "clear":
                        request = store.clear();
                        break;
                    case "delete":
                        request = store.delete(id_Object);
                        break;
                    case "getAll":
                        request = store.getAll();
                        break;
                    case "load":
                        request = store.get(id_Object);
                        break;
                    case "put":
                        request = store.put(id_Object);
                        break;
                }
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            };
        });
    }
}

class Select {
    constructor() {
        this.s = window.getSelection();
        if (this.s.rangeCount > 0) {
            this.range = this.s.getRangeAt(0);
        }
    }
    copy() {
        this.s = window.getSelection();
        this.range = (this.s.rangeCount > 0) ?
            this.s.getRangeAt(0) : undefined;
    }
    /**
     * Désélectionne
     */
    release() {
        this.s.empty();
    }
    /**
     * Mémorise la sélection et l'efface de la vue
     */
    record() {
        this.copy();
        this.release();
    }
    /**
     * Sélectionne le rang stocké
     */
    keep() {
        this.s.empty();
        if (this.range !== undefined) {
            this.s.addRange(this.range);
        }
    }
}

class Speech {
    constructor(volume, pitch, rate, lang, text) {
        let synth = window.speechSynthesis;
        let voices = synth.getVoices();
        let utter = new SpeechSynthesisUtterance();
        utter.lang = lang;
        utter.pitch = pitch;
        utter.rate = rate;
        utter.volume = volume;
        voices.forEach(voice => {
            if (lang === voice.lang) {
                utter.voice = voice;
                utter.text = text;
                synth.speak(utter);
            }
        });
    }
}

class Loader {
    constructor(url) {
        this.url = url;
    }
    static req(method, type, url) {
        return new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.responseType = type;
            request.onload = function () {
                (this.status === 200) ?
                    resolve(this.response) : reject(new Error(this.statusText));
            };
            request.onerror = function () { reject(new Error(this.statusText)); };
            request.open(method, url);
            request.send();
        });
    }
    load(type, callback) {
        Loader.req("GET", "text", this.url)
            .catch((reason) => {
            console.log(type, this.url, " non chargé car", reason);
        }).then((r) => { callback(r); });
    }
    async loadAsText() {
        try {
            return await Loader.req("GET", "text", this.url);
        }
        catch (r) {
            console.log((this.url + " non chargé car", r));
        }
    }
    async loadAsBlob() {
        try {
            return await Loader.req("GET", "blob", this.url);
        }
        catch (r) {
            console.log((this.url + " non chargé car", r));
        }
    }
    async loadAsXml() {
        try {
            return await Loader.req("GET", "document", this.url);
        }
        catch (r) {
            console.log((this.url + " non chargé car", r));
        }
    }
    async loadAsArrayBuffer() {
        try {
            return await Loader.req("GET", "arraybuffer", this.url);
        }
        catch (r) {
            console.log((this.url + " non chargé car", r));
        }
    }
    async loadAsJson() {
        try {
            return await Loader.req("GET", "json", this.url);
        }
        catch (r) {
            console.log((this.url + " non chargé car", r));
        }
    }
}
var TimerEvent;
(function (TimerEvent) {
    TimerEvent["START"] = "start";
    TimerEvent["STOP"] = "stop";
    TimerEvent["TIMER"] = "timer";
})(TimerEvent || (TimerEvent = {}));
class Timer extends EventTarget {
    constructor(delay = 1000, repeatCount = -1) {
        super();
        this.delay = delay;
        this.repeatCount = repeatCount;
        this.tick = 0;
        this.interval = 0;
        this.running = false;
    }
    reset() {
        this.tick = 0;
        window.clearInterval(this.interval);
        this.interval = 0;
    }
    dispatch(type) {
        this.dispatchEvent(new CustomEvent(type, { detail: { target: this, tick: this.tick } }));
    }
    start() {
        this.tick = 0;
        this.dispatch(TimerEvent.START);
        window.clearInterval(this.interval);
        this.interval = window.setInterval(() => this.run(), this.delay);
    }
    run() {
        this.tick++;
        this.dispatch(TimerEvent.TIMER);
        if (this.tick === this.repeatCount)
            this.stop();
    }
    stop() {
        window.clearInterval(this.interval);
        this.interval = 0;
        this.dispatch(TimerEvent.STOP);
    }
}
const Sel = new Select();
const DataMem = new DBRecorder("XPage", "XDocs");
const Config = new DBRecorder("Program", "Config");

// ------------------------------------------------ XPage.JS -------------------------------------------------- 

class Stylable {
    constructor(element, parent) {
        this.element = element;
        this.parent = parent;
        this.borderStyle = "solid";
        this.decorationStyle = "solid";
        this.fontFamily = "calibri";
        this.display = "block";
        this.bold = false;
        this.italic = false;
        this.smallCaps = false;
        this.underline = false;
        this.strike = false;
        this.wordWrap = true;
        this.styl = [0, 0, 10, 10, 0xFFFFFF, 100, 0x000000, 100, 1, 0, 12, 0x0000FF, 100];
        this.css = element.style;
        if (parent instanceof HTMLElement) {
            parent.appendChild(this.element);
        }
        else if (parent instanceof Stylable) {
            parent.element.appendChild(this.element);
        }
    }
    /**
     * Arrière-plan
     * @param color couleur entre 0x000000 et 0xFFFFFF
     * @param opacity opacité entre 0 et 100
     */
    setBackground(color, opacity) {
        this.backgroundColor = color;
        this.backroundOpacity = opacity;
    }
    /**
     * Définit la bordure (Opacity : 0 = pas de bordure)
     * @param style "solid|dotted|dashed|inset|outset|none"
     * @param thickness épaisseur de la bordure
     * @param color couleur entre 0x000000 et 0xFFFFFF
     * @param opacity opacité entre 0 et 100
     * @param radius arrondi des coins en pixels
     */
    setBorder(style, color, thickness, opacity, radius) {
        this.borderStyle = style;
        this.borderWidth = thickness;
        this.borderOpacity = opacity;
        this.borderColor = color;
        this.borderRadius = radius;
    }
    _set_Filter(cssFilterName) {
    }
    addTag(tag, content, css = "") {
        let el = document.createElement(tag);
        el.innerText = content;
        if (css.length)
            el.setAttribute("style", css);
        this.element.appendChild(el);
        return el;
    }
    getAttr(attrName) {
        return this.element.getAttribute(attrName);
    }
    setMargin(left, top, right, bottom) {
        this.css.marginLeft = left + "px";
        this.css.marginTop = top + "px";
        this.css.marginRight = right + "px";
        this.css.marginBottom = bottom + "px";
    }
    setPadding(left, top, right, bottom) {
        this.css.paddingLeft = left + "px";
        this.css.paddingTop = top + "px";
        this.css.paddingRight = right + "px";
        this.css.paddingBottom = bottom + "px";
    }
    setPos(x, y) {
        this.left = x;
        this.top = y;
    }
    setRect(x, y, w, h, round = 0) {
        this.setPos(x, y);
        this.setSize(w, h, round);
    }
    setSize(w, h, round = 0) {
        this.width = w;
        this.height = h;
        this.borderRadius = round;
    }
    remove() {
        this.element.remove(); // displaylist ?
    }
    setAttr(attrName, attrVal) {
        this.element.setAttribute(attrName, attrVal);
    }
    setCss(attrName, attrVal) {
        this.css.setProperty(attrName, attrVal);
    }
    toFront() {
        // todo : displaylist !
    }
    toBack() {
        // todo : displaylist !
    }
    redraw() {
        this.css.position = "absolute";
        this.css.boxSizing = "border-box";
        this.css.left = this.left + "px";
        this.css.top = this.top + "px";
        this.css.width = this.width + "px";
        this.css.height = this.height + "px";
        this.css.backgroundColor = Number2Color(this.backgroundColor, this.backroundOpacity);
        if (this.borderOpacity > 0) {
            this.css.border = `${this.borderWidth}px ${this.borderStyle} ${Number2Color(this.borderColor, this.borderOpacity)}`;
        }
        else {
            this.css.border = "none";
        }
        if (this.borderRadius > 0)
            this.css.borderRadius = this.borderRadius + "px";
    }
    updateStyle(index, newVal) {
        this.styl[index] = newVal;
        this.redraw();
    }
    get editable() {
        return this.element.isContentEditable;
    }
    set editable(value) {
        this.element.contentEditable = value ? "true" : "false";
        this.element.setAttribute("contenteditable", value ? "true" : "false");
    }
    get left() { return this.styl[0]; }
    set left(value) { this.updateStyle(0, value); }
    get top() { return this.styl[1]; }
    set top(value) { this.updateStyle(1, value); }
    get width() { return this.styl[2]; }
    set width(value) { this.updateStyle(2, value); }
    get height() { return this.styl[3]; }
    set height(value) { this.updateStyle(3, value); }
    get right() { return this.left + this.width; }
    set right(value) { this.left = value - this.width; }
    get bottom() { return this.top + this.height; }
    set bottom(value) { this.top = value - this.height; }
    get centerX() { return this.left + (this.width / 2); }
    set centerX(value) { this.left = value - (this.width / 2); }
    get centerY() { return this.top + (this.height / 2); }
    set centerY(value) { this.top = value - (this.height / 2); }
    get backgroundColor() { return this.styl[4]; }
    set backgroundColor(value) { this.updateStyle(4, value); }
    get backroundOpacity() { return this.styl[5]; }
    set backroundOpacity(value) { this.updateStyle(5, value); }
    get borderColor() { return this.styl[6]; }
    set borderColor(value) { this.updateStyle(6, value); }
    get borderOpacity() { return this.styl[7]; }
    set borderOpacity(value) { this.updateStyle(7, value); }
    get borderWidth() { return this.styl[8]; }
    set borderWidth(value) { this.updateStyle(8, value); }
    get borderRadius() { return this.styl[9]; }
    set borderRadius(value) { this.updateStyle(9, value); }
    get selectable() { return this.css.userSelect !== "none"; }
    set selectable(value) {
        let prefixes = ["-webkit-", "-khtml-", "-moz-", "-o-", ""];
        prefixes.forEach(p => this.setCss(p + "user-select", value ? "text" : "none"));
    }
    get visible() { return (this.css.display !== "none"); }
    set visible(value) { this.css.display = value ? this.display : "none"; }
}
class Icon extends Stylable {
    constructor(parent, name, x, y, title, callback) {
        super(document.createElement("img"), parent);
        this.setRect(x, y, Icon.ImageWidth, Icon.ImageWidth);
        this.img = this.element;
        this.img.src = "ico\\" + name + ".png";
        this.setAttr("name", name);
        this.setAttr("title", title);
        this.setAttr("type", "button");
        this.img.onmouseover = () => this.onHilight(true);
        this.img.onmouseout = () => this.onHilight(false);
        this.img.onmousedown = () => this.onPress(true);
        this.img.onmouseup = () => this.onPress(false);
        this.img.onclick = () => callback(this);
        this.onHilight(false);
    }
    onHilight(on) {
        this.backgroundColor = on ? 0xDDEEFF : 0xCCDDFF;
        this.borderStyle = on ? "outset" : "solid";
        this.borderOpacity = on ? 100 : 1;
    }
    onPress(on) {
        this.backgroundColor = on ? 0xFFDDDD : 0xFFCCCC;
        this.borderStyle = on ? "inset" : "solid";
        this.borderOpacity = on ? 100 : 1;
    }
}
Icon.ImageWidth = 22;
class Writable extends Stylable {
    constructor(type, parent) {
        super(document.createElement(type), parent);
    }
    redraw() {
        super.redraw();
        this.css.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}pt ${this.fontFamily}`;
        this.css.textDecoration = this.textDecoration;
        this.css.color = Number2Color(this.textColor, this.textOpacity);
    }
    write(...values) {
        this.text = values.join(" ");
    }
    get fontSize() { return this.styl[10]; }
    set fontSize(value) { this.updateStyle(10, value); }
    get textColor() { return this.styl[11]; }
    set textColor(value) { this.updateStyle(11, value); }
    get textOpacity() { return this.styl[12]; }
    set textOpacity(value) { this.updateStyle(12, value); }
    get fontStyle() { return this.italic ? "italic" : ""; }
    set fontStyle(value) {
        this.italic = (value.toLowerCase() === "italic");
        this.redraw();
    }
    get fontVariant() { return this.smallCaps ? "small-caps" : ""; }
    set fontVariant(value) {
        this.smallCaps = (value.toLowerCase() === "small-caps");
        this.redraw();
    }
    get fontWeight() { return this.bold ? "bold" : ""; }
    set fontWeight(value) {
        this.bold = value.toLowerCase() === "bold";
        this.redraw();
    }
    get align() { return this.css.textAlign || "left"; }
    set align(value) {
        this.css.textAlign = value;
    }
    get textDecoration() { return this.strike ? "line-through" : this.underline ? "underline" : "none"; }
    set textDecoration(value) {
        this.strike = value.toLowerCase() === "line-through";
        this.underline = value.toLowerCase() === "underline";
        this.redraw();
    }
    get text() {
        if (this.element instanceof HTMLInputElement) {
            return this.element.value;
        }
        else {
            return this.element.innerText;
        }
    }
    set text(value) {
        this.element.scrollTop = 0;
        if (this.element instanceof HTMLInputElement) {
            this.element.value = value;
        }
        else {
            this.element.innerText = value;
        }
    }
}
class Input extends Writable {
    constructor(parent, inputType = "text", name, x, y, callback, inputValue = "") {
        super("input", parent);
        this.inp = this.element;
        this.setPos(x, y);
        this.setAttr("name", name);
        this.setAttr("type", inputType);
        if (inputValue.length)
            this.setAttr("value", inputValue);
        this.inp.onchange = () => callback(this);
    }
    get text() {
        return this.inp.value;
    }
    set text(value) {
        this.inp.value = value;
    }
}
class Button extends Writable {
    constructor(parent, name, callback) {
        super("input", parent);
        this.inp = this.element;
        this.setAttr("name", name);
        this.setAttr("value", name);
        this.setAttr("type", "button");
        this.inp.onmouseover = () => this.onHilight(true);
        this.inp.onmouseout = () => this.onHilight(false);
        this.inp.onmousedown = () => this.onPress(true);
        this.inp.onmouseup = () => this.onPress(false);
        this.inp.onclick = () => callback(this);
        this.onHilight(false);
    }
    onHilight(on) {
        this.backgroundColor = on ? 0xDDEEFF : 0xCCDDFF;
        this.setBorder(on ? "outset" : "solid", 0xFFFFFF, 1, on ? 100 : 1, 0);
    }
    onPress(on) {
        this.backgroundColor = on ? 0xDDDDFF : 0xBBBBEE;
        this.setBorder(on ? "inset" : "solid", 0xFFFFFF, 1, on ? 100 : 1, 0);
    }
    get text() {
        return this.inp.value;
    }
    set text(value) {
        this.inp.value = value;
    }
}
class Div extends Writable {
    constructor(parent) {
        super("div", parent);
        this._cod = "windows-1252";
    }
    setTextFormat(font, size, color, align = "left") {
        this.fontFamily = font;
        this.fontSize = size;
        this.textColor = color;
        this.align = align;
    }
    /**
     * Données à afficher comme texte
     */
    get fileData() {
        return new TextEncoder().encode(this.text);
    }
    set fileData(value) {
        this.text = new TextDecoder(this._cod).decode(value);
    }
    /**
     * Texte affiché
     */
    get text() {
        return this.element.innerText;
    }
    set text(value) {
        this.element.scrollTop = 0;
        this.element.innerText = value;
    }
    get encoding() {
        return this._cod;
    }
    set encoding(value) {
        this._cod = value;
    }
}
class FileSel extends Div {
    constructor(target, label, toolTip, readAs, callback) {
        super(target);
        this.readAs = readAs;
        this.callback = callback;
        this.file = new Input(this, "file", label, 0, 0, () => this.onFileSelected(this, target));
        this.file.setAttr("style", "visibility:hidden");
        this.button = new Button(this, label, () => this.file.inp.click());
        this.button.setAttr("title", toolTip);
        this.result = new Input(this, "text", "result", FileSel.bWidth, 3, () => { }, "_sansNom_.txt");
    }
    onFileSelected(fs, target) {
        let file = fs.file.inp.files[0];
        if (file === undefined)
            return;
        let fr = new FileReader();
        fr.onload = () => {
            fs.result.text = file.name;
            fs.callback(fr);
        };
        switch (this.readAs) {
            case FileSel.AsArrayBuffer:
                fr.readAsArrayBuffer(file);
                break;
            case FileSel.AsBinaryString:
                fr.readAsBinaryString(file);
                break;
            case FileSel.AsDataURL:
                fr.readAsDataURL(file);
                break;
            case FileSel.AsText:
                fr.readAsText(file);
                break;
        }
    }
    redraw() {
        super.redraw();
        this.button.setRect(1, 1, FileSel.bWidth, 24);
        this.button.backgroundColor = 0xCCCCCC;
        this.result.setRect(FileSel.bWidth + 3, 2, this.width - FileSel.bWidth - 7, 22);
        this.result.setPadding(6, 1, 10, 2);
        this.result.backgroundColor = 0xFFFFCC;
        this.result.borderColor = 0xFFFFCC;
    }
}
/**
 * Largeur du bouton
 */
FileSel.bWidth = 120;
FileSel.AsArrayBuffer = "ArrayBuffer";
FileSel.AsBinaryString = "binaryString";
FileSel.AsDataURL = "dataUrl";
FileSel.AsText = "text";
class Radio extends Div {
    constructor(parent, name, x, y, callback, ...options) {
        super(parent);
        this.opts = [];
        this.setRect(x, y, 121 * options.length, 21);
        this.borderOpacity = 0;
        options.forEach((opt, i) => {
            let d = new Div(this);
            d.setRect(i * 120, 1, 120, 20);
            d.text = opt;
            d.setPadding(20, -3, 0, 0);
            d.borderOpacity = 0;
            new Input(d, "radio", name, 0, 0, callback, opt);
            this.opts.push(d);
        });
    }
    horizontal(width, height) {
        this.width = this.opts.length * width;
        this.height = height;
        this.opts.forEach((d, i) => {
            d.setRect(i * width, -1, width, height);
        });
    }
    vertical(width, height) {
        this.width = width;
        this.height = this.opts.length * height;
        this.opts.forEach((d, i) => {
            d.setRect(-1, i * height, width, height);
        });
    }
}
class Choice extends Writable {
    constructor(parent, name, x, y, w, title, items, callback) {
        super("select", parent);
        this.sel = this.element;
        this.setRect(x, y, w, 24);
        this.setAttr("name", name);
        this.setAttr("title", title);
        this.create(items, name);
        this.sel.addEventListener("change", e => {
            callback(this);
            this.sel.selectedIndex = 0;
        });
    }
    clear() {
        while (this.sel.options.length > 1) {
            this.sel.options.remove(this.sel.options.length - 1);
        }
    }
    create(items, name) {
        this.addTag("option", name, "display:none;");
        items.forEach((item) => {
            this.addItem(item, item);
        });
    }
    addItem(item, value) {
        let opt = document.createElement("option");
        opt.text = item;
        opt.value = value;
        this.sel.add(opt);
        this.sel.selectedIndex = 0;
        return opt;
    }
    indexOf(text) {
        let opts = Array.from(this.sel.options);
        return opts.findIndex(o => o.text == text);
    }
    valueOf(index) {
        return this.sel.options[index].value;
    }
    removeValue(value) {
        let opts = Array.from(this.sel.options);
        let optIndex = opts.findIndex(o => o.value == value);
        if (optIndex > -1)
            this.sel.options.remove(optIndex);
        this.sel.selectedIndex = 0;
    }
    removeText(text) {
        let optIndex = this.indexOf(text);
        if (optIndex > -1)
            this.sel.options.remove(optIndex);
        this.sel.selectedIndex = 0;
    }
    get value() {
        return this.sel.selectedOptions[0].value;
    }
    get length() {
        return this.sel.options.length;
    }
}
class ColorChoice extends Choice {
    constructor(parent, name, x, y, w, title, callback) {
        super(parent, name, x, y, w, title, ColorChoice.colors, callback);
    }
    create(items, name) {
        let opt = this.addTag("option", name, "display:none;");
        items.forEach((item) => {
            opt = this.addItem("", item);
            opt.style.backgroundColor = item;
        });
    }
}
ColorChoice.colors = ["blue", "red", "green", "white", "black", "silver", "grey", "magenta", "cyan", "yellow", "purple", "brown", "pink"];
class FontChoice extends Choice {
    constructor(parent, name, x, y, w, title, callback) {
        super(parent, name, x, y, w, title, FontChoice.fonts, callback);
    }
    create(items, name) {
        let opt = this.addTag("option", name, "display:none;");
        items.forEach((item) => {
            opt = this.addItem(item, item);
            opt.style.fontFamily = item;
        });
    }
}
FontChoice.fonts = ["Arial", "Calibri", "Cambria", "Comic", "Courier", "Georgia", "Helvetica", "Times", "Verdana"];
var PageState;
(function (PageState) {
    PageState[PageState["saved"] = 0] = "saved";
    PageState[PageState["edited"] = 1] = "edited";
    PageState[PageState["modified"] = 2] = "modified";
    PageState[PageState["pending"] = 3] = "pending";
})(PageState || (PageState = {}));

class Page extends Div {
    constructor(parent, x, y, w, h, bgColor, bdrColor) {
        super(parent);
        this.s = PageState.saved;
        this.autoSave = true;
        this.edit = new Div(this);
        this.edit.backgroundColor = 0xFFFFFF;
        this.edit.setBorder("solid", 0x000000, 1, 50, 0);
        this.edit.setPadding(30, 5, 30, 10);
        this.edit.css.overflowY = "scroll";
        this.edit.setAttr("spellcheck", "false");
        this.info = new Div(this);
        this.edit.editable = true;
        this.info.backgroundColor = bgColor;
        this.info.setBorder("dotted", 0xFFFFFF, 1, 100, 5);
        this.info.setPadding(2, 1, 0, 0);
        this.info.setTextFormat("arial", 10, 0xFFFFFF, "center");
        this.encod = new Radio(this, "encod", w - 244, h + 2, (e) => this.changeEncoding(e), "utf-8", "windows-1252");
        this.listing = new Choice(this, "Documents enregistrés", 414, 2, 287, "Liste des documents", [], (c) => OpenLocalDocument(this, c.value));
        this.saview = new Div(this);
        this.saview.setRect(2, 54, w - 6, 5, 4);
        this.saview.setBorder("solid", 0xFFFFFF, 1, 50, 3);
        this.saview.visible = false;
        this.tim = new Timer(100, 30); // 100 millisecondes * 30 fois = 30000 millisecondes = 30 secondes 
        this.tim.addEventListener(TimerEvent.START, () => {
            this.saview.visible = true;
        });
        this.tim.addEventListener(TimerEvent.STOP, () => {
            SaveLocalDocument(this);
            this.saview.visible = false;
        });
        this.tim.addEventListener(TimerEvent.TIMER, () => {
            this.saview.width = ((this.tim.tick / this.tim.repeatCount) * w - 6);
        });
        let dx = 6, dy = 3, dy2 = Icon.ImageWidth + 6, ic = Icon.ImageWidth + 2;
        new Icon(this, "Bold", dx + (ic * 0), dy, "Mettre en gras", () => { AddTag(this, "bold"); });
        new Icon(this, "Italic", dx + (ic * 1), dy, "Mettre en italiques", () => { AddTag(this, "italic"); });
        new Icon(this, "Underline", dx + (ic * 2), dy, "Souligner", () => { AddTag(this, "underline"); });
        new Icon(this, "Cut", dx + (ic * 3), dy, "Couper", (i) => { AddTag(this, "cut"); paste(0); });
        new Icon(this, "Copy", dx + (ic * 4), dy, "Copier", (i) => { AddTag(this, "copy"); paste(0); });
        new Icon(this, "Paste", dx + (ic * 5), dy, "Coller", (i) => { AddTag(this, "paste"); paste(1); });
        // new Icon(this, "Delete", dx + (ic * 5), dy, "Effacer", () => { AddTag(this, "delete") });
        new Icon(this, "Editundo", dx + (ic * 6), dy, "Annuler", () => { AddTag(this, "undo"); });
        new Icon(this, "Editredo", dx + (ic * 7), dy, "Rétablir", () => { AddTag(this, "redo"); });
        new Icon(this, "Align_left", dx + (ic * 8), dy, "Aligner à gauche", () => { AddTag(this, "justifyLeft"); });
        new Icon(this, "Align_center", dx + (ic * 9), dy, "Centrer", () => { AddTag(this, "justifyCenter"); });
        new Icon(this, "Align_right", dx + (ic * 10), dy, "Aligner à droite", () => { AddTag(this, "justifyRight"); });
        new Icon(this, "Align_justify", dx + (ic * 11), dy, "Justifier", () => { AddTag(this, "justifyFull"); });
        new Icon(this, "Listnumbered", dx + (ic * 12), dy, "Créer une liste numérotée", () => { AddTag(this, "insertOrderedList"); });
        new Icon(this, "Listbullets", dx + (ic * 13), dy, "Créer une liste à puce", () => { AddTag(this, "insertUnorderedList"); });
        new Icon(this, "Indent", dx + (ic * 14), dy, "Indenter", () => { AddTag(this, "indent"); });
        new Icon(this, "Unindent", dx + (ic * 15), dy, "Extruder", () => { AddTag(this, "outdent"); });
        new Icon(this, "Checkspelling", dx + (ic * 16), dy, "Vérification orthographique", () => this.toggleCheckSpell());
        new Icon(this, "Up", dx + (ic * 0), dy2, "Augmenter la taille", () => { AddTag(this, "increaseFontSize"); });
        new Icon(this, "Down", dx + (ic * 1), dy2, "Diminuer la taille", () => { AddTag(this, "decreaseFontSize"); });
        new Icon(this, "Strikethrough", dx + (ic * 2), dy2, "Barré", () => { AddTag(this, "strikethrough"); });
        new Icon(this, "Superscript", dx + (ic * 3), dy2, "Exposant", () => { AddTag(this, "superscript"); });
        new Icon(this, "Subscript", dx + (ic * 4), dy2, "Indice", () => { AddTag(this, "subscript"); });
        new Icon(this, "Link", dx + (ic * 5), dy2, "Insérer un lien hypertexte", () => AddParTag(this, "createLink", "Insérer un lien hypertexte", "Url du lien"));
        new Icon(this, "InsertPicture", dx + (ic * 6), dy2, "Insérer une image", () => AddParTag(this, "insertImage", "Insérer une image", "Url de l'image"));
        new Icon(this, "Addtable", dx + (ic * 7), dy2, "Insérer un tableau", () => AddTable(this, this.width));
        new Icon(this, "Play", dx + (ic * 8), dy2, "Insérer une vidéo (YouTube)", () => AddYoutube(this, this.width));
        new Icon(this, "Flv", dx + (ic * 9), dy2, "Insérer une animation swf", () => AddSwf(this));
        new Choice(this, "Titre", dx + (ic * 10) - 1, dy2 - 1, ic * 3, "Gros titre", ["h1", "h2", "h3", "h4", "h5", "h6"], (c) => { AddFormat(this, c.value); });
        new FontChoice(this, "Police", dx + (ic * 13) - 1, dy2 - 1, ic * 4, "Nom de la police", (c) => { AddDoubleTag(this, "fontName", c.value); });
        new Choice(this, "Taille", dx + (ic * 17) - 1, dy2 - 1, ic * 3, "Taille des caractères", ["1", "2", "3", "4", "5", "6", "7"], (c) => { AddDoubleTag(this, "fontSize", c.value); });
        // caractères spéciaux - blockquote - pre ?   
        new ColorChoice(this, "TextC", dx + (ic * 20) - 1, dy2 - 1, ic * 3, "Couleur de police", (c) => AddDoubleTag(this, "foreColor", c.value));
        new ColorChoice(this, "BackC", dx + (ic * 23) - 1, dy2 - 1, ic * 3, "Couleur d'arrière-plan", (c) => AddDoubleTag(this, "backColor", c.value));
        new ColorChoice(this, "HighC", dx + (ic * 26) - 1, dy2 - 1, ic * 3, "Couleur de surlignement", (c) => AddDoubleTag(this, "hiliteColor", c.value));
        new Icon(this, "Save", w - (1 * ic) - 3, dy, "Sauvegarder", () => SaveLocalDocument(this));
        new Icon(this, "Delete", w - (2 * ic) - 3, dy, "Supprimer ce document", () => DeleteLocalDocument(this));
        new Icon(this, "Rename", w - (3 * ic) - 3, dy, "Renommer ce document", () => RenameLocalDocument(this));
        new Icon(this, "Document", w - (4 * ic) - 3, dy, "Nouveau document", () => CreateLocalDocument(this));
        new Icon(this, "Print", w - (1 * ic) - 3, dy2, "Imprimer la page", () => { });
        new Icon(this, "Audio", w - (2 * ic) - 3, dy2, "Écouter le texte sélectionné", () => new Speech(1, 1, 1, "fr-FR", window.getSelection().toString()));
        //----- Fenêtre avec zone interne d'affichage -----
        this.htmlView = new Frame(this);
        this.htmlView.setCss("overflow", "hidden");
        this.htmlView.setRect(8, 62, 786, 350);
        let htmlZone = new Div(this.htmlView);
        htmlZone.setRect(1, 33, 782, 314);
        htmlZone.setCss("overflowY", "scroll");
        this.mo = new MutationObserver((muts, obs) => {
            if (this.s == PageState.pending)
                return;
            muts.forEach((m) => {
                if (m.type === "characterData")
                    this.state = PageState.edited;
                if (m.type === "childList")
                    this.state = PageState.modified;
            });
            htmlZone.element.textContent = this.edit.element.innerHTML;
        });
        this.moInit = { characterData: true, childList: true, subtree: true };
        this.htmlView.visible = false; // caché, à afficher au clic...
        new Icon(this, "Code", w - (3 * ic) - 3, dy2, "Afficher/masquer le code HTML", () => this.htmlView.visible = this.htmlView.visible ? false : true);
        this.setRect(x, y, w, h, 6);
        this.backgroundColor = bgColor;
        this.setBorder("outset", 0xFFFFFF, 1, 100, 6);
        this.borderColor = bdrColor;
        window.addEventListener("resize", e => this.center());
        this.center();
        onEdition(this.edit.element, this);
    }
    center() {
        this.centerX = window.innerWidth / 2;
        this.height = window.innerHeight - 38;
    }
    changeEncoding(e) {
        this.encoding = e.inp.value;
        this.info.text = "Encoding: " + this.encoding;
    }
    redraw() {
        super.redraw();
        this.edit.setRect(5, 62, this.width - 12, this.height - 100);
        this.info.setRect(5, this.height - 32, this.width - 12, 25);
        this.htmlView.top = 62;
        this.htmlView.draggable(8, 8, 62, this.height - 392);
        this.encod.top = this.height + 2;
    }
    toggleCheckSpell() {
        this.edit.setAttr("spellcheck", this.edit.element.spellcheck ? "false" : "true");
        this.edit.element.focus();
    }
    get text() { return this.edit.text; }
    set text(value) { this.edit.text = value; }
    get currentDoc() {
        return this.localDoc;
    }
    set currentDoc(value) {
        this.mo.disconnect();
        this.localDoc = value;
        this.edit.element.innerHTML = value.value;
        this.edit.element.scrollTop = 0;
        Config.record("LastEdit", value.id);
        this.mo.observe(this.edit.element, this.moInit);
        this.state = PageState.saved;
    }
    get state() {
        return this.s;
    }
    set state(value) {
        const colors = [0x009900, 0xFF6600, 0xFF9900, 0xFFFF00];
        const states = ["saved", "edited", "changed", "pending"];
        this.saview.backgroundColor = colors[value];
        this.info.write(this.localDoc.id, "|", states[value], "|", Time(this.localDoc.date));
        if (this.s === PageState.pending)
            return;
        if (value == PageState.modified || value == PageState.edited) {
            this.s = PageState.pending;
            this.tim.start();
        }
        else {
            this.tim.reset();
        }
    }
}

let txt = "";
function paste(n) {
    switch (n) {
        case 0:
            console.log("Vous venez de copier", n);
            let span = document.createElement('SPAN');
            let sel = window.getSelection().getRangeAt(0);
            span.appendChild(sel.extractContents());
            txt = span.innerHTML;
            console.log(txt);
            break;
        case 1:
            document.execCommand("insertHTML", false, txt);
            console.log("Vous venez de coller", n);
            break;
    }
}
function onEdition(page, pg) {
    let ev = ["keydown", "keyup", "mousedown", "focus", "blur"];
    let sel;
    ev.map((e) => page.addEventListener(e, function () {
        let t = window.getSelection().focusNode;
        if (t instanceof HTMLDivElement)
            return;
        if (t.nodeType == 3)
            t = t.parentElement;
        sel = t;
        let s = window.getComputedStyle(t);
        let b = s.fontWeight !== "400" ? "bold" : "-";
        let i = s.fontStyle !== "normal" ? s.fontStyle : "-";
        let u = s.textDecoration == "none" ? "-" : s.textDecoration;
        const states = ["saved", "edited", "changed", "pending"];
        pg.info.text = `${e} ${states[pg.state]} ${s.fontFamily} ${s.fontSize} ${s.color} ${s.textAlign} ${b} ${i} ${u}`;
    }));
}

// ------------------------------------ Editing.js ---------------------------------------------

function execCommand(p, tag, alt = "") {
    document.execCommand(tag, false, alt);
    // SaveLocalDocument(p);
}
/**
 * Exécute une commande d'édition simple
 * @param tag Commande à exécuter
 */
const AddTag = function (p, tag) {
    execCommand(p, tag);
};
const AddDoubleTag = function (p, tag, alt) {
    execCommand(p, tag, alt);
};
/**
 * Exécute une commande après saisie de texte
 * @param tag commande à exécuter
 * @param inputTitle texte du Dialogue de saisie
 * @param inputLabel texte de la zone de saisie
 */
const AddParTag = function (p, tag, inputTitle, inputLabel) {
    Sel.record();
    if (Sel.range === undefined) {
        new Info("Aucune sélection", "Sélectionnez d'abord du texte", "D'accord !");
        return;
    }
    new InputDialog(inputTitle, inputLabel, (result) => {
        Sel.keep();
        execCommand(p, tag, result);
    });
};
/**
 * Exécute une commande de création de tableau après saisie du nombre
 * @param w largeur de la fenêtre (et de la table à créer)
 */
const AddTable = function (p, w) {
    Sel.record();
    if (Sel.range === undefined) {
        new Info("Aucune sélection", "Sélectionnez d'abord du texte", "D'accord !");
        return;
    }
    new InputDialog("Insérer un tableau HTML", "Tapez le nombre de lignes et de colonnes", (size) => {
        Sel.keep();
        let [lgns, cols] = size.split(" ").map(s => parseInt(s));
        let tbl = GetHtmlTable(w - 80, lgns, cols);
        execCommand(p, "insertHTML", tbl);
    }, "5 8");
};
const AddYoutube = function (p, w) {
    w -= 80;
    let h = w * 6 / 9;
    if (Sel.s.toString().length === 0) {
        new Info("Aucune sélection", "Sélectionnez d'abord du texte", "D'accord !");
        return;
    }
    Sel.record();
    new InputDialog("Code de la vidéo YouTube", "Lettres du code de la vidéo :", (result) => {
        Sel.keep();
        let txt = `<iframe src="https://www.youtube.com/embed/${result}" width="${w}" height="${h}" frameborder="0" allowfullscreen></iframe>`;
        execCommand(p, "insertHTML", txt);
    });
};
const AddSwf = function (p) {
    if (Sel.s.toString().length === 0) {
        new Info("Aucune sélection", "Sélectionnez d'abord du texte", "D'accord !");
        return;
    }
    Sel.record();
    new InputDialog("Description du swf à insérer", "Url identifiant largeur hauteur (séparateur espace) :", (result) => {
        Sel.keep();
        let [urlSwf, idSwf, wSwf, hSwf] = result.split(" ");
        let txt = `<embed id="${idSwf}" width="${wSwf}" height="${hSwf}" src="${urlSwf}" type="application/x-shockwave-flash"></embed>`;
        execCommand(p, "insertHTML", txt);
    }, "http://bidon.free.fr animId 800 600");
};
const AddFormat = function (p, tag) {
    execCommand(p, "formatBlock", "<" + tag + ">");
};

// ------------------------------------------------------- Dialog ----------------------------------------------------
class Frame extends Div {
    constructor(parent) {
        super(parent);
        this.titleBar = new Div(this);
        this.titleBar.setBackground(0x0000FF, 10);
        this.titleBar.borderOpacity = 0;
        this.selectable = false;
        this.titleBar.selectable = false;
    }
    draggable(minX, maxX, minY, maxY) {
        const fram = this;
        fram.titleBar.align = "center";
        var startDrag = function (m) {
            document.addEventListener("mousemove", drag),
                document.addEventListener("mouseup", stopdrag);
        };
        var drag = function (m) {
            fram.setPos(fram.left + m.movementX, fram.top + m.movementY);
            if (fram.left < minX)
                fram.left = minX;
            if (fram.left > maxX)
                fram.left = maxX;
            if (fram.top < minY)
                fram.top = minY;
            if (fram.top > maxY)
                fram.top = maxY;
            fram.titleBar.text = `Placé en ${fram.left} ${fram.top}`;
        };
        var stopdrag = function (m) {
            document.removeEventListener("mousemove", drag),
                document.removeEventListener("mouseup", stopdrag);
            fram.titleBar.text = "";
        };
        var rollover = function (e) {
            fram.titleBar.backgroundColor = 0xFF00FF;
        };
        var rollout = function (e) {
            fram.titleBar.backgroundColor = 0x0000FF;
        };
        fram.titleBar.element.onmousedown = startDrag;
        fram.titleBar.element.onmouseup = stopdrag;
        fram.titleBar.element.onmouseenter = rollover;
        fram.titleBar.element.onmouseleave = rollout;
    }
    redraw() {
        super.redraw();
        if (this.titleBar)
            this.titleBar.setRect(1, 1, this.width - 2, 30);
        if (this.close)
            this.close.setPos(this.width - 24, 1);
    }
}
class Dialog extends Div {
    constructor(title, text, callback, btns) {
        super(document.body);
        this.callback = callback;
        this.btns = [];
        this.backgroundColor = 0;
        this.backroundOpacity = 80;
        this.win = new Frame(this);
        this.win.backgroundColor = 0xEEEEFF;
        this.win.setRect(0, 200, 500, 180, 10);
        this.win.addTag("div", title, "text-align:center; font-size:1.6em; height:1.3em; background-color:#CCDDFF");
        this.win.addTag("div", text, "text-align:center; font-size:1.1em;margin:6px;");
        btns.forEach(btn => this.btns.push(new Button(this.win, btn, () => this.onButton(btn, this))));
        this.btns.forEach(b => b.setRect(0, 120, 150, 30, 6));
        window.addEventListener("resize", () => this.resize());
        this.resize();
    }
    onCancel(dial) {
        dial.win.remove();
        dial.remove();
    }
    onButton(msg, dial) {
        dial.win.remove();
        dial.remove();
        dial.callback(msg);
    }
    resize() {
        this.setRect(0, 0, window.outerWidth, window.outerHeight);
        this.win.centerX = this.centerX;
        if (this.btns.length == 1) {
            this.btns[0].centerX = this.win.width * .5;
        }
        else if (this.btns.length == 2) {
            this.btns[0].centerX = this.win.width * .25;
            this.btns[1].centerX = this.win.width * .75;
        }
        else {
            this.btns[0].centerX = this.win.width * .18;
            this.btns[1].centerX = this.win.width * .50;
            this.btns[2].centerX = this.win.width * .82;
        }
    }
}
class Info extends Dialog {
    constructor(title, text, btn) {
        super(title, text, () => { }, [btn]);
    }
}
class InputDialog extends Dialog {
    constructor(title, text, callback, response = "") {
        super(title, text, callback, ["Valider", "Annuler"]);
        this.txtInput = new Input(this.win, "text", "val", 20, 120, (m) => this.onButton(this.txtInput.text, this));
        this.txtInput.setRect(70, 70, 360, 28);
        this.txtInput.setBorder("inset", 0xBBBBBB, 1, 100, 0);
        this.txtInput.text = response;
        this.txtInput.element.focus();
    }
    onButton(msg, dial) {
        dial.win.remove();
        dial.remove();
        dial.callback(msg == "Annuler" ? "" : dial.txtInput.text);
    }
}
class PassInputDialog extends InputDialog {
    constructor(title, text, callback) {
        super(title, text, callback);
        this.txtInput.width = 120;
        this.txtInput.centerX = 250;
        this.txtInput.setAttr("type", "password");
    }
}
class ColorSel extends Div {
    constructor(parent, x, y, bgColor) {
        super(parent);
        this.view = new Div(this);
        this.sel = new Div(this);
        this.view.setTextFormat("courier", 9, 0xFFFFFF, "center");
        this.sel.setTextFormat("courier", 9, 0xFFFFFF, "center");
        this.setRect(x, y, 320, 360);
        this.drawHtml();
        this.view.setRect(this.width - 56, 25, 48, 48);
        this.sel.setRect(this.width - 56, 80, 48, 48);
        this.backgroundColor = bgColor;
        this.redraw();
    }
    onClicked(t) {
        this.sel.backgroundColor = parseInt("0x" + t);
        this.sel.text = t;
    }
    onSelected(t) {
        this.view.backgroundColor = parseInt("0x" + t);
        this.view.text = t;
    }
    drawHtml() {
        let cs = this, table; // 254 * 210 pixels
        table = this.addTag("table", "", "border:1px solid black;border-collapse:collapse;margin-top:25px");
        table.style.marginLeft = "5px";
        let hor = 20, ver = 5, i = 0, a = 0;
        for (a = 0; a <= 255; a += ver)
            newRow(table.insertRow(), a, i);
        a = 255;
        for (i = 0; i <= 255; i += ver)
            newRow(table.insertRow(), a, i);
        function newRow(row, a, i) {
            newCell(row, a, i, i, a, a, i, hor);
            newCell(row, a, a, i, i, a, i, hor);
            newCell(row, i, a, i, i, a, a, hor);
            newCell(row, i, a, a, i, i, a, hor);
            newCell(row, i, i, a, a, i, a, hor);
            newCell(row, a, i, a, a, i, i, hor);
        }
        function newCell(row, dr, dg, db, fr, fg, fb, step) {
            let [cr, cg, cb, sr, sg, sb] = [dr, dg, db, (fr - dr) / step, (fg - dg) / step, (fb - db) / step];
            for (var x = 0; x <= step; x++) {
                let c = Digits(Math.floor(cr)) + Digits(Math.floor(cg)) + Digits(Math.floor(cb));
                let cel = row.insertCell();
                cel.setAttribute("bgcolor", "#" + c);
                cel.onclick = () => cs.onClicked(c);
                cel.onmouseover = () => cs.onSelected(c);
                cr += sr;
                cg += sg;
                cb += sb;
            }
        }
    }
}

class XDoc {
    constructor(id, value, date) {
        this.id = id;
        this.value = value;
        this.date = date;
    }
}

function SaveLocalDocument(page) {
    if (page.state == PageState.saved)
        return;
    let d = new XDoc(page.currentDoc.id, page.edit.element.innerHTML, new Date());
    page.currentDoc = d;
    DataMem.put(d).then(() => page.state = PageState.saved);
}

function DeleteLocalDocument(page) {
    new Dialog("Vérification : voulez vous vraiment", "Supprimer " + page.currentDoc.id + " ?", (response) => {
        if (response == "Oui") {
            let index = page.listing.indexOf(page.currentDoc.id);
            console.log("Avant suppression du n°", index, " sur", page.listing.length);
            DataMem.delete(page.currentDoc.id).then(() => {
                SetPageListing(page);
                let nb = page.listing.length;
                if (nb > 0) {
                    let newIndex = (index < nb) ? nb : index - 1;
                    console.log("Il reste", nb, "items et j'affiche le", newIndex);
                    OpenLocalDocument(page, page.listing.valueOf(newIndex));
                }
                else {
                    console.log("Il n'y a plus rien : j'affiche une page vide");
                }
            });
        }
    }, ["Oui", "Non"]);
}
function CreateLocalDocument(page) {
    new InputDialog("Créer un nouveau document", "Nom du document :", (newName) => {
        page.currentDoc = new XDoc(newName, "", new Date());
        SaveLocalDocument(page);
    });
}
function RenameLocalDocument(page) {
    new InputDialog("Renommer ce document", "Nouveau nom (destructif!) pour " + page.currentDoc.id + " :", (newName) => {
        DataMem.rename(page.currentDoc, newName).then(() => {
            SetPageListing(page);
            OpenLocalDocument(page, newName);
        });
    });
}
async function SetPageListing(page) {
    page.listing.clear();
    const r = await DataMem.getAll();
    let docList = r;
    docList.forEach(i => page.listing.addItem(i.id, i.id));
}
function PrintLocalDocument(page) {
}

function OpenLocalDocument(page, name) {
    DataMem.load(name).then(d => {
        console.log('Page choisie', name);
        page.currentDoc = d;
    });
}
// Exemple de test d'ouverture de page : user -> mdp -> <ok|anonyme>
function GetUserCredentials(userName) {
    return new Promise(function (logIn, stayOut) {
        new InputDialog("Bienvenue sur XDoc !", "Nom d'utilisateur :", (user) => {
            if (user.length) {
                new PassInputDialog("Êtes-vous l'administrateur ?", "Mot de passe :", (mdp) => {
                    new Info("Merci d'avoir répondu, " + user + " !", "Vous pouvez utiliser XDoc", 'OK');
                    logIn((user + " " + mdp).toLowerCase());
                });
            }
            else {
                new Info("Vous voulez donc rester anonyme ?", "Eh bien, vous avez bien raison :)", 'Génial !');
                stayOut("anonyme");
            }
        }, userName);
    });
}

window.onload = () => {
    let stage = document.body;
    let page = new Page(stage, 10, 10, 1024, 800, 0x5566AA, 0xBBBBBB);
    SetPageListing(page)
        .then(() => Config.remember("LastEdit")
            .then((v) => OpenLocalDocument(page, v.value)));
};
