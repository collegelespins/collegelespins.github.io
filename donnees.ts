class DocExterne {
    constructor(public type: string, public adresse: string, public description: string) {
    }
    afficher() {

    }
}

class Site extends DocExterne {
    constructor(adresse: string, public description: string) {
        super("Page web", adresse, description);
    }
}

class Film extends DocExterne {
    constructor(adresse: string, public description: string) {
        super("Fichier vidéo", adresse, description);
    }
}

class Illustration extends DocExterne {
    constructor(adresse: string, public description: string) {
        super("Fichier image", adresse, description);
    }
}

class Son extends DocExterne {
    constructor(adresse: string, public description: string) {
        super("Fichier sonore", adresse, description);
    }
}

class DocInterne {
    externes: DocExterne[] = [];
    constructor(public type: string, public nom: string) {

    }
    lier(externe: DocExterne) {
        this.externes.push(externe);
    }
    afficher() {

    }
}

class FigureDeStyle extends DocInterne {
    exemples: string[] = [];
    constructor(nom: string, public type: string, public definition: string = "", ...exemples: string[]) {
        super("Figure de style", nom);
        this.exemples = exemples;
        figures.push(this);
    }
    get titre() {
        return `<div class="titre"><span class="fig">${this.nom}</span> (<i>figure ${this.type}</i>)</div>`;
    }
    get info() {
        return `${this.titre}<div class="info">${this.definition}<br/><b>Exemples :</b><br><i>${this.exemples.join("<br>")}</i><hr></div>`;
    }
}

const cours: Cours[] = [];

class Cours extends DocInterne {
    externes: DocExterne[] = [];
    constructor(nom: string, public description: string, public contenu = "") {
        super("Cours", nom);
        cours.push(this);
    }
    get titre() {
        return `<div class="titre"><span class="cours">${this.nom}</span><br><i>${this.description}</i>`;
    }
    get info() {
        return `${this.titre}<div class="cours">${this.contenu}</div>`;
    }
}

new Cours("Le niveau de langue", "Étudier la façon de s'exprimer");
new Cours("L'étude du vocabulaire et du lexique", "Comment faire l'étude des mots d'un texte ?");
new Cours("L'étude de la langue", "Que dire sur les noms, les verbes, les pronoms, les adjectifs, les subordonnées, les phrases ?");
new Cours("Les éléments du récit", "narration, description, portrait, action, réflexions");

new Cours("Le texte poétique", "Comment analyser une poésie ?");
new Cours("Le texte théâtral", "Comment analyser une scène théâtrale ?");
new Cours("Le texte narratif", "Comment analyser un récit ?");

new Cours("Le texte d'idées", "Comment analyser un texte argumentatif ? l'introduction, les transitions, la conclusion");
new Cours("Le plan d'une argumentation", "Le thème, la thèse, les arguments, les exemples");

new Cours("La situation de production", "Répondre aux questions : genre, auteur, titre, époque, sujet");
new Cours("Le système d'énonciation", "Qui parle ? à qui ? où ? quand ? de quoi ?");
new Cours("La focalisation", "Focalisation interne, externe, zéro. Quel est le point de vue du narrateur ?");
new Cours("La tonalité du texte", "Comment ? texte comique, moraliste, satirique, argumentatif, informatif, narratif ?");
new Cours("La visée du texte", "Pourquoi ? Quel est l'objectif de l'auteur ? Quelle est l'utilité du texte");

new Cours("Les champs lexicaux", "Pourquoi relever un champ lexical ? Que dire ensuite ?");
new Cours("Les figures de style", "Que dire d'une figure de style ? Qu'analyser ensuite ?");
new Cours("Le schéma narratif", "Structure d'un récit : de la situation initiale à la situation finale");

new Site(
    "https://www.memoireonline.com/08/09/2449/m_Eespace-et-temps-dans-l-oeuvre-de-Jules-Verne-Voyage-au-centre-de-la-terre-temps.html",
    "Mémoire - Espace et temps dans l'oeuvre de Jules Verne : « Voyage au centre de la terre » et dans le temps");
new Site("https://louis-marchand.fr/2019/03/19/nouveau-guide-pratique-des-principales-figures-de-rhetorique/",
    "Guide pratique des principales figures de rhétorique");
new Site("https://apprendre-reviser-memoriser.fr/carte-mentale-des-figures-de-style-college-3eme/",
    "Carte mentale des figures de style");
new Site("https://www.numero1-scolarite.com/wp-content/uploads/2021/02/Les-figures-d%E2%80%99opposition-1.pdf",
    "Les figures d'opposition : Fiche au format PDF");
new Site("https://www.numero1-scolarite.com/wp-content/uploads/2021/09/Les-figures-dinsistance-et-dattenuation.pdf",
    "Les figures d'atténuation : Fiche au format PDF");
new Site("https://www.numero1-scolarite.com/ressources-pedagogiques-francais/exercices-et-lecons-de-francais/exercices-et-lecons-francais-3eme-a-telecharger/la-structure-dune-phrase-complexe-3eme-lecons-et-exercices/",
    "La structure d'une phrase complexe. Leçon et exercices");

class Zone {
    el: HTMLDivElement;
    constructor(contenu: string) {
        this.el = document.createElement("div");
        this.el.innerHTML = contenu;
        document.body.insertBefore(this.el, document.getElementById("pied"));
    }
}

window.onload = () => {
    const titre = document.title;
    switch (titre.toLocaleLowerCase()) {
        case "secours de français":
            break;
        case "auteurs":
            new Zone("<ol>" + auteurs.map(a => "<li>" + a.titre + "</li>").join("")) + "</ol>";
            break;
        case "cours":
            new Zone(`<h4>Les cours (notions générales)</h4><ol>${cours.map(c => "<li>" + c.info + "</li>").join("")}</ol>`);
            break;
        case "figures":
            new Zone(`<h4>Les figures de style</h4><ol>${figures.map(f => "<li>" + f.info + "</li>").join("")}</ol>`);
            break;
        case "fiches":
            break;
        case "lectures":
            break;
        case "liens":
            break;
        case "programme":
            break;
        default: ;
    }
};
