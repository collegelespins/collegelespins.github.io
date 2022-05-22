"use strict";
class DocExterne {
    constructor(type, adresse, description) {
        this.type = type;
        this.adresse = adresse;
        this.description = description;
    }
    afficher() {
    }
}
class Site extends DocExterne {
    constructor(adresse, description) {
        super("Page web", adresse, description);
        this.description = description;
    }
}
class Film extends DocExterne {
    constructor(adresse, description) {
        super("Fichier vidéo", adresse, description);
        this.description = description;
    }
}
class Illustration extends DocExterne {
    constructor(adresse, description) {
        super("Fichier image", adresse, description);
        this.description = description;
    }
}
class Son extends DocExterne {
    constructor(adresse, description) {
        super("Fichier sonore", adresse, description);
        this.description = description;
    }
}
class DocInterne {
    constructor(type, nom) {
        this.type = type;
        this.nom = nom;
        this.externes = [];
    }
    afficher() {
    }
}
const cours = [];
class Cours extends DocInterne {
    constructor(nom, description, contenu = "") {
        super("Cours", nom);
        this.description = description;
        this.contenu = contenu;
        cours.push(this);
    }
    get titre() {
        return `${this.nom}<br><i>${this.description}</i>`;
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
new Site("https://www.memoireonline.com/08/09/2449/m_Eespace-et-temps-dans-l-oeuvre-de-Jules-Verne-Voyage-au-centre-de-la-terre-temps.html", "Mémoire - Espace et temps dans l'oeuvre de Jules Verne : « Voyage au centre de la terre » et dans le temps");
new Site("https://louis-marchand.fr/2019/03/19/nouveau-guide-pratique-des-principales-figures-de-rhetorique/", "Guide pratique des principales figures de rhétorique");
new Site("https://apprendre-reviser-memoriser.fr/carte-mentale-des-figures-de-style-college-3eme/", "Carte mentale des figures de style");
new Site("https://www.numero1-scolarite.com/wp-content/uploads/2021/02/Les-figures-d%E2%80%99opposition-1.pdf", "Les figures d'opposition : Fiche au format PDF");
new Site("https://www.numero1-scolarite.com/wp-content/uploads/2021/09/Les-figures-dinsistance-et-dattenuation.pdf", "Les figures d'atténuation : Fiche au format PDF");
new Site("https://www.numero1-scolarite.com/ressources-pedagogiques-francais/exercices-et-lecons-de-francais/exercices-et-lecons-francais-3eme-a-telecharger/la-structure-dune-phrase-complexe-3eme-lecons-et-exercices/", "La structure d'une phrase complexe. Leçon et exercices");
class Zone {
    constructor(contenu) {
        this.el = document.createElement("div");
        this.el.innerHTML = contenu;
        document.body.insertBefore(this.el, document.getElementById("pied"));
    }
}
window.onload = () => {
    const titre = document.title;
    switch (titre.toLocaleLowerCase()) {
        case "secours de français": break;
        case "auteurs":
            new Zone("<ol>" + auteurs.map(a => "<li>" + a.titre + "</li>").join("")) + "</ol>";
            break;
        case "cours":
            let txt = `<h4>Les notions générales</h4>
            <ol>${cours.map(c => "<li>" + c.titre + "</li>").join("")}</ol>
            <h4>Les figures de style</h4>
            <ol>${figures.map(f => "<li>" + f.info + "</li>").join("")}</ol>`;
            new Zone(txt);
            break;
        case "fiches": break;
        case "lectures": break;
        case "liens": break;
        case "programme": break;
        default: ;
    }
};
//# sourceMappingURL=donnees.js.map