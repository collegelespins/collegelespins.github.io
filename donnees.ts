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
    afficher() {

    }
}

class FigureDeStyle extends DocInterne {
    exemples: string[] = [];
    constructor(nom: string, public type: string, public definition: string = "", ...exemples: string[]) {
        super("Figure de style", nom);
        this.exemples = exemples;
    }
    get titre() {
        return `${this.nom} (<i>figure ${this.type}</i>)`;
    }
}

class Auteur extends DocInterne {
    constructor(nom: string, public naiss: Date, public deces: Date, public plume: string, public bio = "", public vraiNom = "") {
        super("Auteur", nom);
    }
    get titre() {
        return `${this.plume} (${this.naiss.getFullYear()}-${this.deces.getFullYear()})`;
    }
}

class Cours extends DocInterne {
    constructor(nom: string, public description: string, public contenu = "") {
        super("Cours", nom);
    }
    get titre() {
        return `${this.nom}<br><i>${this.description}</i>`;
    }
}

class Oeuvre extends DocInterne {
    constructor(public titre: string, public auteur: Auteur, public publication: Date, public resume: string = "") {
        super("Œuvre", titre);
    }
}

class Texte extends DocInterne {
    constructor(public titre: string, public genre: Genre, public auteur: Auteur, public Epoque: Epoque, public texte: string) {
        super("Texte à étudier", titre);
    }
}

class Epoque extends DocInterne {
    auteurs: Auteur[] = [];
    constructor(public titre: string, public definition: string, public debut: Date, public fin: Date) {
        super("Époque littéraire", titre);
    }
}

class Genre extends DocInterne {
    auteurs: Auteur[] = [];
    exemples: string[] = [];
    constructor(nom: string, public definition: string) {
        super("Genre littéraire", nom);
    }
}

class Mouvement extends DocInterne {
    auteurs: Auteur[] = [];
    exemples: string[] = [];
    constructor(nom: string, public Epoque: Epoque, public definition: string) {
        super("Mouvement littéraire", nom);
    }
}

const cours: Cours[] = [
    new Cours("Le niveau de langue", "Étudier la façon de s'exprimer"),
    new Cours("L'étude du vocabulaire et du lexique", "Comment faire l'étude des mots d'un texte ?"),
    new Cours("L'étude de la langue", "Que dire sur les verbes, les pronoms, les adjectifs, les phrases, ... ?"),
    new Cours("Les éléments du récit", "narration, description, portrait, action, réflexions"),
    new Cours("Le texte poétique", "Comment analyser une poésie ?"),
    new Cours("Le texte théâtral", "Comment analyser une scène théâtrale ?"),
    new Cours("Le texte narratif", "Comment analyser un récit ?"),
    new Cours("Le texte d'idées", "Comment analyser un texte argumentatif ?"),
    new Cours("La situation de production", "Répondre aux questions : genre, auteur, titre, époque, sujet"),
    new Cours("L'énonciation dans un texte", "Répondre aux questions : qui parle ? à qui ? où ? quand ? de quoi ?"),
    new Cours("La focalisation, le point de vue", "Quelle est la position du narrateur dans le récit ?"),
    new Cours("La tonalité et la visée d'un texte", "Comprendre l'utilité d'un texte"),
    new Cours("Les champs lexicaux", "Pourquoi relever un champ lexical ?"),
    new Cours("Les figures de style", "Comment présenter l'étude d'une figure de style ?"),
    new Cours("Le schéma narratif", "De la situation initiale à la situation finale"),
    new Cours("Le plan d'une argumentation", "Le thème, la thèse, les arguments, les exemples"),
];

const auteurs: Auteur[] = [
    /* nom, naissance, décès, complet, bio, vraiNom */
   new Auteur("Bellay", new Date(1522, 4, 1), new Date(1560, 1, 0), "Joachim du Bellay"),
    new Auteur("Ronsard", new Date(1524, 8, 11), new Date(1585, 11, 27), "Pierre de Ronsard"),
    new Auteur("Fontaine", new Date(1621, 6, 8), new Date(1695, 3, 13), "Jean de la Fontaine", ""),
    new Auteur("Molière", new Date(1622, 15, 0), new Date(1873, 1, 17), "Molière", "", "Jean-Baptiste Poquelin"),
    new Auteur("Bruyère", new Date(1645, 7, 16), new Date(1696, 4, 11), "Jean de la Bruyère", ""),
    new Auteur("Montesquieu", new Date(1669, 0, 18), new Date(1755, 1, 10), "Montesquieu", "", "Charles Louis de Secondat de la Brède et de Montesquieu"),
    new Auteur("Voltaire", new Date(1694, 10, 21), new Date(1778, 4, 30), "Voltaire", "", "François-Marie Arouet"),
    new Auteur("Rousseau", new Date(1712, 5, 28), new Date(1778, 6, 2), "Jean-Jacques Rousseau", ""),
    new Auteur("Diderot", new Date(1713, 9, 5), new Date(1784, 6, 31), "Denis Diderot", ""),    
    new Auteur("Gouges", new Date(1748, 4, 7), new Date(1793, 10, 3), "Olympe de Gouges", "", "Marie Gouze, veuve Aubry"),    
    new Auteur("Stendhal", new Date(1783, 0, 23), new Date(1842, 2, 23), "Stendhal", "", "Henri Bayle"),
    new Auteur("Balzac", new Date(1799, 4, 20), new Date(1850, 7, 18), "Honoré de Balzac", ""), 
    new Auteur("Hugo", new Date(1802, 1, 26), new Date(1885, 4, 22), "Victor Hugo"),
    new Auteur("Sand", new Date(1804, 6, 1), new Date(1876, 5, 8), "George Sand", "", "Amantine Aurore Lucile Dupin de Francueil, baronne Dudevant"),
    new Auteur("Gautier", new Date(1811, 7, 30), new Date(1872, 9, 23), "Théophile Gautier", ""),
    new Auteur("Baudelaire", new Date(1821, 3, 9), new Date(1887, 7, 31), "Charles Baudelaire"),
    new Auteur("Flaubert", new Date(1821, 11, 12), new Date(1880, 4, 8), "Gustave Flaubert", ""),
    new Auteur("Verne", new Date(1828, 6, 8), new Date(1905, 2, 24), "Jules Verne", ""),
    new Auteur("Verlaine", new Date(1844, 2, 30), new Date(1896, 0, 8), "Paul Verlaine"),
    new Auteur("Maupassant", new Date(1850, 7, 5), new Date(1696, 6, 6), "Guy de Maupassant", ""),
    new Auteur("Rimbaud", new Date(1854, 9, 20), new Date(1891, 10, 10), "Arthur Rimbaud"),
    new Auteur("Barjavel", new Date(1911, 0, 24), new Date(1985, 10, 24), "René Barjavel", ""),
];

const figures: FigureDeStyle[] = [
    new FigureDeStyle("Comparaison", "d'analogie"),
    new FigureDeStyle("Métaphore", "d'analogie"),
    new FigureDeStyle("Personnification", "d'analogie"),

    new FigureDeStyle("Métonymie", "de substitution"),
    new FigureDeStyle("Périphrase", "de substitution"),
    new FigureDeStyle("Allégorie", "de substitution"),
    new FigureDeStyle("Synecdoque", "de substitution"),

    new FigureDeStyle("Antithèse", "d'opposition"),
    new FigureDeStyle("Oxymore", "d'opposition"),
    new FigureDeStyle("Chiasme", "d'opposition"),
    new FigureDeStyle("Antiphrase", "d'opposition"),

    new FigureDeStyle("Anaphore", "d'insistance"),
    new FigureDeStyle("Parallélisme", "d'insistance"),
    new FigureDeStyle("Répétition", "d'insistance"),
    new FigureDeStyle("Gradation", "d'insistance"),
    new FigureDeStyle("Hyperbole", "d'insistance"),
    new FigureDeStyle("Énumération", "d'insistance"),
    new FigureDeStyle("Pléonasme", "d'insistance"),

    new FigureDeStyle("Euphémisme", "d'atténuation"),
    new FigureDeStyle("Litote", "d'atténuation"),
    new FigureDeStyle("Ellipse", "d'atténuation"),

    /*
    https://louis-marchand.fr/2019/03/19/nouveau-guide-pratique-des-principales-figures-de-rhetorique/
    https://apprendre-reviser-memoriser.fr/carte-mentale-des-figures-de-style-college-3eme/
    https://www.numero1-scolarite.com/ressources-pedagogiques-francais/exercices-et-lecons-de-francais/exercices-et-lecons-francais-3eme-a-telecharger/les-figures-dopposition-lecon-et-exercices-3eme/#iLightbox[e6c7f38d3a43fe2bebe]/0
    https://www.numero1-scolarite.com/wp-content/uploads/2021/02/Les-figures-d%E2%80%99opposition-1.pdf
    https://www.numero1-scolarite.com/wp-content/uploads/2021/09/Les-figures-dinsistance-et-dattenuation.pdf
    */
];

const oeuvres: Oeuvre[] = [

];

const textes: Texte[] = [

];

const epoques: Epoque[] = [

];

const genres: Genre[] = [

];

const mouvements: Mouvement[] = [

];

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
    switch (titre) {
        case "Secours de français": break;
        case "Auteurs":
            new Zone("<ol>" + auteurs.map(a => "<li>" + a.titre + "</li>").join("")) + "</ol>";
            break;
        case "Cours":
            let txt = `<h4>Les notions générales</h4>
            <ol>${cours.map(c => "<li>" + c.titre + "</li>").join("")}</ol>
            <h4>Les figures de style</h4>
            <ol>${figures.map(f => "<li>" + f.titre + "</li>").join("")}</ol>`;
            new Zone(txt);
            break;
        case "Fiches": break;
        case "Lectures": break;
        case "Liens": break;
        case "Programme": break;
        default: ;
    }
}
