"use strict";

// Dépendance : FSM.ts (finite state machine)
// Étudier la FSM pour n'utiliser qu'une FSM pour tout l'éditeur (souris, clavier, édition, sauvegarde)
/** largeur du caractère en pixels */

const SZ = 8;
class Line {
    constructor(eddy, index) {
        this.eddy = eddy;
        this.keys = [];
        eddy.lines.push(this);
        const eti = newDiv(eddy.div, 0, index * 21, 35, 20, `background-color:#444444; color:#CCCCCC`);
        eti.style.borderBottom = "1px dotted #555555";
        eti.style.textAlign = "right";
        eti.style.paddingRight = "5px";
        eti.style.pointerEvents = "none";
        eti.style.userSelect = "none";
        this.etiText = eti.appendChild(document.createTextNode((index + 1).toString()));
        this.eti = eti;
        let line = newDiv(eddy.div, 40, index * 21, eddy.lineWidth, 20, `background-color:#CCCCCC; min-width:${eddy.lineWidth}px;`);
        line.style.fontSize = "1.1em";
        this.lineText = line.appendChild(document.createTextNode(""));
        line.style.whiteSpace = "pre-wrap"; // les espaces en début de ligne ne seront pas virés !
        this.line = line;
        this.line.onmousedown = (m) => this.eddy.selector.onSelectedLine(this, m);
        this.line.onmouseup = (m) => this.eddy.selector.onSelectedLine(this, m);
        // this.line.onclick = (m: MouseEvent) => this.eddy.select(this, m);
        // super-utile pour input perso : ne pas surligner une sélection à la souris !
    }
    kill() {
        if (this.eddy.numLines == 1)
            return; // on n'enlève pas la dernière ligne !
        let i = this.lineIndex;
        this.lineText.textContent = "";
        this.eddy.lines.splice(i, 1);
        this.eddy.div.removeChild(this.eti);
        this.eddy.div.removeChild(this.line);
    }
    get previous() {
        return this.eddy.lines[this.lineIndex - 1];
    }
    get next() {
        return this.eddy.lines[this.lineIndex + 1];
    }
    rawCopy(line) {
        this.lineText.textContent = line.lineText.textContent;
        this.keys = [...line.keys];
    }
    getNextContent() {
        if (this.next)
            this.rawCopy(this.next);
    }
    getPreviousContent() {
        if (this.previous)
            this.rawCopy(this.previous);
    }
    updateContent() {
        this.keys = this.keys.filter(c => c.isChar);
        this.lineText.textContent = this.keys.map(t => t.key).join("");
        if (this.eddy.currentLine !== this) {
            this.eddy.selectNum(this.lineIndex);
            this.eddy.moveToLastChar();
            this.line.focus();
        }
        this.eddy.checkWidth();
    }
    get text() {
        return this.lineText.textContent || "";
    }
    set text(content) {
        this.keys = [...content.split('').map(c => new Key(c))];
        this.updateContent();
    }
    /** rectangle de bordure de la ligne */
    get rect() {
        return this.line.getClientRects()[0];
    }
    /** position verticale  incluant le scrolling du parent  */
    get top() { return this.rect.top + this.eddy.div.scrollTop; }
    get lineIndex() { return this.eddy.lines.indexOf(this); }
    get numChars() { return this.keys.length; }
    get isEmpty() { return this.keys.length == 0; }
}

class Editor extends FSMachine {
    constructor(target, x, y, width, height, bgcolor) {
        super('editeur');
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lines = [];
        this.div = newDiv(target, x, y, width, height, `background-color:${bgcolor};overflow:scroll;`);
        this.footer = newDiv(target, x, y + height + 23, width, 22, `background-color:${bgcolor};color:white`);
        this.cursor = newDiv(this.div, 1, 1, 0, 18, "background-color:rgba(255,0,0,.5); padding:0;margin:0");
        this.cursor.style.filter = "drop-shadow(1px 2px 2px #4444dd)";
        this.lineWidth = width - 58;
        this.selector = new TextSelector(this);
        this.fill(); // remplissage avec un texte de test
        this.addLine("Alors, il n'est pas génial, cet éditeur ?");
        let kb = new KeyboardWatcher(this, x, y + height + 1, width, bgcolor);
        kb.enterState(); // le clavier entre en action !
    }
    fill() {
        let l = [
            "DONE : Gérer les caractères unicode (dans le cas d'une suppression par exemple...)",
            "DONE : Afficher le mode de saisie dans l'info (Insertion ou Ajout)",
            "DONE : Créer un affichage de l'édition (mode, ligne, colonne, sélection courante)",
            "DONE : Placer le curseur à la bonne colonne à la souris (position calculée) !",
            "DONE : Ajouter une ligne à la fin (mode Add). On peut avoir une ligne vide...",
            "DONE : Insérer une ligne (mode Insert), pousser les lignes suivantes",
            "DONE : Supprimer la ligne précédente/suivante. Décaler les suivantes...",
            "DONE : Supprimer une ligne avec report sur la précédente (Backspace)",
            "DONE : Return : reporter la fin de la ligne sur la ligne suivante",
            "DONE : Définir la longueur maximale d'une ligne ? Créer un scrolling horizontal ?",
            "DONE : Gérer la fin de ligne et le saut de ligne (wordwrap / ligne longue)!",
            "",
	        "TODO : Séparer l'édition du texte de la gestion des lignes",
	        "TODO : Séparer la gestion de la sélection de l'édition",
            "TODO : Gérer la sélection, le couper/copier/coller",
            "TODO : Gérer l'alignement des tabulations",
            "TODO : Gérer l'enregistrement et l'export dans différents formats",
            "",
            "Je suis venu te dire que je m'en vais Et tes larmes n'y pourront rien changer. Comme dit si bien Verlaine au vent mauvais : je suis venu te dire que je m'en vais."
        ];
        l.forEach((l, i) => this.addLine(l));
        this.checkWidth();
    }
    log(...content) {
        this.footer.innerHTML = content.join("");
    }
    selectNum(num) {
        if (num < 0)
            num = 0;
        if (num > this.lines.length - 1)
            num = this.lines.length - 1;
        this.currentLine = this.select(this.lines[num]);
        return this.currentLine;
    }
    /**
     * Après écriture, teste la longueur de la ligne pour le scrolling horizontal
     */
    checkWidth() {
        let max = 0;
        this.lines.forEach(l => {
            l.line.style.width = this.lineWidth + "px";
            max = Math.max(max, l.numChars);
        });
        let nl = (max * SZ) + 4;
        if (nl > this.lineWidth)
            this.lines.forEach(l => l.line.style.width = nl + "px");
    }
    selectPreviousLine() {
        this.selectNum(this.currIndex - 1);
    }
    selectNextLine() {
        if (this.currIndex === this.numLines - 1)
            this.addLine(); // <<< ajoute une ligne à la fin
        this.selectNum(this.currIndex + 1);
    }
    moveToPreviousChar() {
        this.cursColumn--;
    }
    moveToNextChar() {
        this.cursColumn++;
    }
    moveToFirstChar() {
        this.cursColumn = 0;
    }
    moveToLastChar() {
        this.cursColumn = this.numChars;
    }
    show(lineIndex, column) {
        this.currentLine.eti.style.background = "#333333";
        this.currentLine = this.lines[lineIndex];
        this.currentLine.eti.style.background = "#000000";
        this.currentLine.line.appendChild(this.cursor); // change le y
        this.cursColumn = column; // change le x
    }
    select(lgn, e) {
        this.lines.forEach(l => l.eti.style.backgroundColor = lgn == l ? "#000000" : "#333333");
        this.currentLine = lgn;
        this.currentLine.updateContent();
        this.currentLine.line.appendChild(this.cursor);
        if (e) { // position du curseur choisie à la souris
            this.cursColumn = ((e.clientX - lgn.line.getBoundingClientRect().x) / SZ) | 0;
        }
        else {
            this.moveToLastChar();
        }
        return lgn;
    }
    chooseCursPosition(pos, isInside) {
        if (isInside) {
            (pos < this.numChars) ? this.cursColumn = pos : this.moveToLastChar();
        }
        else {
            this.moveToLastChar();
        }
    }
    addChar(ke, keys) {
        let unicode = (/^.$/u.test(ke.key));
        if (unicode) {
            let key = new Key(ke.key);
            if (this.adding) {
                keys.push(key);
            }
            else {
                keys.splice(this.cursColumn, 0, key);
            }
            this.moveToNextChar();
            this.currentLine.updateContent();
        }
    }
    /**
     * Ajoute une ligne à la fin de l'éditeur
     */
    addLine(content = "") {
        let lgn = new Line(this, this.numLines);
        if (content.length)
            lgn.text = content;
        return lgn;
    }
    insertLine(after) {
        this.addLine(); // la dernière
        let last = this.numLines - 1;
        for (let i = last; i > after; i--) {
            this.lines[i].getPreviousContent();
        }
        this.selectNum(after + 1);
        this.currentLine.text = "";
        this.moveToFirstChar();
    }
    /**
     * Supprime la ligne en cours (et remonte les suivantes)
     * @param index
     */
    removeLine(index) {
        for (let i = index; i < this.numLines; i++) {
            this.lines[i].getNextContent();
        }
        let last = this.lines[this.numLines - 1];
        last.kill();
    }
    deletePrevChar(keys, pos) {
        let index = this.currIndex;
        if (this.numChars === 0) {
            this.removeLine(index); // <<----- supprime la ligne en cours par Backspace
            this.selectNum(index - 1);
        }
        else {
            if (pos > 0) {
                this.adding ? keys.pop() : keys.splice(pos - 1, 1);
                this.currentLine.updateContent();
                this.cursColumn = pos - 1;
            }
            else { // pos = 0
                if (this.currentLine.previous) {
                    let prev = this.currentLine.previous, len = prev.numChars;
                    prev.text = prev.text + this.currentLine.text;
                    this.selectNum(prev.lineIndex);
                    this.cursColumn = len;
                    this.removeLine(index); // copie la ligne sur la précédente et la supprime
                }
            }
        }
    }
    deleteNextChar(keys, pos) {
        if (this.numChars == 0) {
            let index = this.currIndex;
            this.removeLine(index); // <<----- supprime la ligne en cours par Delete
            this.selectNum(index);
        }
        if (!this.adding) {
            keys.splice(pos, 1);
            this.currentLine.updateContent();
            this.cursColumn = pos;
        }
        else {
            // on est à la fin, on delete, la suivante existe
            if (this.currentLine.next) {
                if (!this.currentLine.next.isEmpty) { // elle n'est pas vide : on la récupère
                    this.currentLine.text = this.currentLine.text + this.currentLine.next.text;
                }
                this.removeLine(this.currIndex + 1);
                this.cursColumn = pos;
            }
        }
    }
    sendKey(ke) {
        const keys = this.currentLine.keys, pos = this.cursColumn, isInside = pos < this.numChars;
        switch (ke.key) {
            case 'Backspace':
                this.deletePrevChar(keys, pos);
                break;
            case "Tab":
                let t = this.currentLine.text;
                this.currentLine.text = t.substring(0, pos) + "    " + t.substring(pos);
                this.cursColumn += 4;
                break;
            case "Delete":
                this.deleteNextChar(keys, pos);
                break;
            case "End":
                this.moveToLastChar();
                break;
            case "Home":
                this.moveToFirstChar();
                break;
            case 'ArrowDown':
                this.selectNextLine();
                this.chooseCursPosition(pos, isInside);
                break;
            case "PageUp":
                this.selectNum(this.currIndex - 20);
                break;
            case "PageDown":
                this.selectNum(this.currIndex + 20);
                break;
            case 'ArrowUp':
                this.selectPreviousLine();
                this.chooseCursPosition(pos, isInside);
                break;
            case 'ArrowLeft':
                this.moveToPreviousChar();
                break;
            case 'ArrowRight':
                this.moveToNextChar();
                break;
            case 'Enter':
                if (this.adding) {
                    this.insertLine(this.currIndex);
                }
                else {
                    let index = this.currIndex, txt = this.currentLine.text;
                    let before = txt.substring(0, pos), after = txt.substring(pos);
                    this.insertLine(this.currIndex);
                    this.lines[index].text = before;
                    this.lines[index + 1].text = after;
                    this.selectNum(index + 1);
                    this.moveToFirstChar();
                }
                break;
            case "Dead":
                break;
            default:
                this.addChar(ke, keys);
        }
    }
    set cursColumn(value) {
        if (value < 0)
            value = 0;
        if (value > this.numChars)
            value = this.numChars;
        this.cursor.style.left = (value * SZ) + "px";
        this.div.scrollTop = (this.currIndex - 20) * 21; // fait remonter la page si nécessaire
        this.div.scrollLeft = (value * SZ > this.lineWidth) ? (value * SZ) : 0;
        let mode = `mode : <font color="#FF99FF">${this.adding ? "ajout" : "insertion"}</font>`;
        this.log(`ligne : <b>${this.currIndex + 1}</b> - colonne : <b>${value}/${this.numChars}</b> - ${mode} - ${this.selector.info}`);
    }
    get cursColumn() { return (parseInt(this.cursor.style.left) / SZ) | 0; }
    get numChars() { return this.currentLine.numChars; }
    get currIndex() { return this.currentLine.lineIndex; }
    get numLines() { return this.lines.length; }
    get adding() { return this.cursColumn == this.numChars; } // on est en ajout quand le curseur est à la fin
}
class Key {
    constructor(key, cod = "", ctrl = false, shift = false, alt = false, altGr = false) {
        this.key = key;
        this.cod = cod;
        this.ctrl = ctrl;
        this.shift = shift;
        this.alt = alt;
        this.altGr = altGr;
        this.isChar = !Key.command.includes(this.key);
    }
}
Key.command = ["Backspace", "Tab", "Enter", "Shift",
    "Control", "Alt", "CapsLock", "Escape",
    "PageUp", "PageDown", "End", "Home",
    "ArrowLeft", "ArrowUp", "ArrowRight",
    "ArrowDown", "Delete", "Dead"];
/**
 * Attend une commande clavier
 */
class KeyboardWatcher extends FState {
    constructor(eddy, x, y, width, bgcolor) {
        super(eddy, "clavier");
        this.eddy = eddy;
        this.footer = newDiv(document.body, x, y, width, 22, `text-align:center;color:white; background-color:${bgcolor};`);
        this.footer.textContent = "Affichage témoin de la saisie clavier";
    }
    enterState() {
        window.addEventListener("keydown", ke => this.record.call(this, ke));
    }
    exitState() {
        window.removeEventListener("keydown", ke => this.record.call(this, ke));
    }
    record(ke) {
        ke.preventDefault();
        const ctrl = ke.ctrlKey, shift = ke.shiftKey, alt = ke.altKey, altGr = ke.code === "AltRight";
        let key = `key: <font color='#00FFFF'>${ke.key}</font>`;
        let cod = `code: <font color='#00FF00'>${ke.code}</font>`;
        let fmC = `ctrl: <font color=${ctrl ? '#FF6666' : '#FF66FF'}>${ctrl}</font>`;
        let fmS = `shift: <font color=${shift ? '#FF6666' : '#FF66FF'}>${shift}</font>`;
        let fmA = `alt: <font color=${alt ? '#FF6666' : '#FF66FF'}>${alt}</font>`;
        let fmG = `altGr: <font color=${altGr ? '#FF6666' : '#FF66FF'}>${altGr}</font>`;
        this.footer.innerHTML = `${key} - ${cod} - ${fmC} - ${fmS} - ${fmA} - ${fmG}`;
        this.eddy.sendKey(ke);
    }
}
function newDiv(target, x, y, w, h, style) {
    let div = document.createElement("div");
    div.setAttribute("style", "position: absolute; " + style);
    div.style.boxSizing = "border-box";
    div.style.paddingRight = "2px";
    div.style.paddingLeft = "2px";
    div.style.top = y + "px";
    div.style.left = x + "px";
    div.style.width = w + "px";
    div.style.height = h + "px";
    div.style.fontFamily = "monospace";
    div.style.lineHeight = "1.5";
    target.appendChild(div);
    return div;
}
class TSelState extends FState {
    constructor(selector, id) {
        super(selector, id);
        this.selector = selector;
    }
    enterState() {
        this.machine.state = this;
        let [line, e] = this.selector.params;
        switch (this.id) {
            case "attente":
                this.selector.sel = [-1, -1, -1, -1];
                break;
            case "tenue":
                this.selector.eddy.select(line, e);
                this.selector.sel = [line.lineIndex, this.selector.eddy.cursColumn, -1, -1];
                break;
            case "affichage":
                this.selector.sel[2] = line.lineIndex;
                this.selector.sel[3] = this.selector.eddy.cursColumn;
                this.selector.createSelection();
                break;
        }
    }
}
class TextSelector extends FSMachine {
    constructor(eddy) {
        super("Sélection");
        this.eddy = eddy;
        this.sel = [-1, -1, -1, -1, 0, 0];
        this.text = "";
        this.info = "";
        this.params = [];
        this.data = { dcar: -1, fcar: -1, dlgn: -1, flgn: -1 };
        this.clipboard = "";
        this.attente = new TSelState(this, "attente"); // on ne sélectionne rien
        this.tenue = new TSelState(this, "tenue"); // on sélectionne
        this.affichage = new TSelState(this, "affichage"); // monoligne / multiligne ?
        this.debutTenue = new FTransition(this, this.attente, "début tenue", this.tenue); // souris enfoncée   
        this.finTenue = new FTransition(this, this.tenue, "fin tenue", this.affichage); // souris relâchée
        this.retour = new FTransition(this, this.affichage, "retour", this.attente); // On a affiché.
        this.attente.enterState();
    }
    onSelectedEvent(ts, se) {
        let s = document.getSelection();
        if (s) {
            if (s.anchorOffset && s.focusOffset) {
                const d = s.anchorOffset, e = s.focusOffset;
                ts.sel[4] = d;
                ts.sel[5] = e;
                ts.eddy.log(`En cours de sélection du caractère ${d} au caractère ${e}`);
            }
        }
    }
    /**
     * C'est la ligne qui a été percutée/relâchée qui réagit
     * @param l ligne en cours
     * @param m événement souris sur cette ligne
     */
    onSelectedLine(l, m) {
        this.params = [l, m];
        switch (m.type) {
            case "mousedown":
                this.debutTenue.execute();
                document.onselectionchange = (e) => this.onSelectedEvent(this, e);
                break;
            case "mouseup":
                this.eddy.show(l.lineIndex, ((m.clientX - l.line.getBoundingClientRect().x) / SZ) | 0);
                // this.eddy.currentLine = l; 
                document.onselectionchange = null;
                this.finTenue.execute();
                break;
            default: console.log("un sélecteur ne gère pas", m.type);
        }
    }
    createSelection() {
        const [l1, c1, l2, c2] = this.sel;
        if (l1 === l2) {
            let [dcar, fcar] = [Math.min(c1, c2), Math.max(c1, c2)];
            this.text = this.eddy.lines[l1].text.substring(dcar, fcar);
            this.data = { "dcar": dcar, "fcar": fcar, "dlgn": l1, "flgn": l2 };
            this.info = `Sélection L.${l1 + 1} c.${dcar} à c.${fcar}`;
        }
        else {
            let [dlgn, flgn] = [Math.min(l1, l2), Math.max(l1, l2)];
            let [dcar, fcar] = l1 == dlgn ? [c1, c2] : [c2, c1];
            this.data = { "dcar": dcar, "fcar": fcar, "dlgn": dlgn, "flgn": flgn };
            this.info = `Sélection (${flgn - dlgn + 1} lignes) L.${dlgn + 1} c.${dcar}) à L.${flgn + 1} c.${fcar})`;
            this.text = this.eddy.lines[dlgn].text.substring(dcar);
            if (flgn - dlgn > 1)
                for (let i = dlgn + 1; i < flgn; i++)
                    this.text += "\n" + this.eddy.lines[i].text;
            this.text += "\n" + this.eddy.lines[flgn].text.substring(0, fcar);
        }
        this.eddy.log(this.info);
        if (this.text.length)
            this.copy();
        this.retour.execute();
    }
    cut() {
        this.clipboard = this.text;
    }
    copy() {
        this.clipboard = this.text;
    }
    paste() {
        console.log(this.clipboard);
    }
}
function fileSaver(e, target) {
    const consol = newDiv(target, e.x, e.y + e.height + 46, e.width, 22, `text-align: center;`);
    class CouleurFeu extends FState {
        constructor(machine, nom, secs, couleur) {
            super(machine, nom);
            this.nom = nom;
            this.secs = secs;
            this.couleur = couleur;
            this.tempo = 0;
            this.interval = 0;
        }
        enterState() {
            switch (this.nom) {
                case "vert":
                    this.machine.setNext("devient orange");
                    break;
                case "orange":
                    this.machine.setNext("devient rouge");
                    break;
                case "rouge":
                    this.machine.setNext("devient gris");
                    break;
                default: this.machine.setNext("");
            }
            this.machine.state = this;
            let sec = 0, nom = this.nom, secs = this.secs;
            this.interval = setInterval(() => {
                sec++;
                consol.innerHTML = `feu ${nom} pendant ${secs - sec} sec.`;
            }, 1000);
            this.tempo = setTimeout(() => {
                this.machine.executeNext();
            }, this.secs * 1000);
            consol.style.backgroundColor = this.couleur;
            consol.innerHTML = `feu ${nom} pendant ${secs} sec.`;
        }
        exitState() {
            clearInterval(this.interval);
            clearTimeout(this.tempo);
            this.tempo = NaN;
            this.interval = NaN;
            consol.style.backgroundColor = "";
            consol.innerText = " ";
        }
    }
    const feu = new FSMachine("Signalétique urbaine");
    const gris = new FState(feu, 'gris');
    gris.enterState = () => {
        window.onkeyup = window.onclick = () => {
            if (feu.state)
                feu.state.exitState();
            feu.setNext("devient vert");
            feu.executeNext();
        };
    };
    const vert = new CouleurFeu(feu, "vert", 15, "#66FF66");
    const orange = new CouleurFeu(feu, "orange", 4, "#FF8844");
    const rouge = new CouleurFeu(feu, "rouge", 1, "#FF3333");
    new FTransition(feu, gris, "devient vert", vert);
    new FTransition(feu, vert, "devient orange", orange);
    new FTransition(feu, orange, "devient rouge", rouge);
    new FTransition(feu, rouge, "devient gris", gris);
    feu.executeNext(); // la dernière transition est en cours...
}
var eddy;
window.onload = () => {
    eddy = new Editor(document.body, 50, 100, 800, 600, "#444444");
    fileSaver(eddy, document.body); // Affiche une barre d'enregistrement automatique
};
