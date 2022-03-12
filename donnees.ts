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
    constructor(nom: string, public categorie:string, public definition: string="", ...exemples: string[]) {
        super("Figure de style", nom);
        this.exemples = exemples;
    }
}

class Auteur extends DocInterne {
    biographe: string = "";
    constructor(nom: string, public naissance: Date, public deces: Date, public vraiNom="") {
        super("Auteur", nom);
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

const auteurs: Auteur[] = [
    /* nom, naissance, décès, vraiNom, image */
    new Auteur("Charles Baudelaire", new Date(1821,3,9), new Date(1887,7,31)),
    new Auteur("Victor Hugo", new Date(1802,1,26), new Date(1885,4,22)),
    new Auteur("Paul Verlaine", new Date(1844,2,30), new Date(1896,0,8)),
    new Auteur("Arthur Rimbaud", new Date(1854,9,20), new Date(1891,10,10)),
    new Auteur("Joachim du Bellay", new Date(1522,4,1), new Date(1560,1,0)),
    new Auteur("Pierre de Ronsard", new Date(1524,8,11), new Date(1585,11,27)),
    new Auteur("Molière", new Date(1622,15,0), new Date(1873,1,17), "Jean-Baptiste Poquelin"),
    new Auteur("Jean de la Bruyère", new Date(), new Date()),
    new Auteur("Jean de la Fontaine", new Date(), new Date()),
    new Auteur("Jules Verne", new Date(), new Date()),
    new Auteur("René Barjavel", new Date(), new Date()),
    new Auteur("Olympe de Gouge", new Date(), new Date()),
    new Auteur("Voltaire", new Date(), new Date(), "François-Marie Arouet"),
    new Auteur("Jean-Jacques Rousseau", new Date(), new Date()),
    new Auteur("Denis Diderot", new Date(), new Date()),
    new Auteur("Gustave Flaubert", new Date(""), new Date("")),
    new Auteur("Théophile Gautier", new Date(""), new Date("")),
    new Auteur("Guy de Maupassant", new Date(""), new Date("")),
    new Auteur("Honoré de Balzac", new Date(""), new Date("")),
    new Auteur("Montesquieu", new Date(1869,0,18), new Date(1755,1,10), "Charles Louis de Secondat de la Brède et de Montesquieu"),
]

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
]
