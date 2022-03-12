class DocExterne {
    constructor(public type: string, public adresse: string, public description: string) {
    }
    afficher() {

    }
}

class DocInterne {
    externes: DocExterne[] = [];
    constructor(public type: string, public nom: string) {

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

class FigureStyle extends DocInterne {
    exemples: string[] = []
    constructor(nom: string, public definition: string, ...exemples: string[]) {
        super("Figure de style", nom);
        this.exemples = exemples;
    }
}

class Auteur extends DocInterne {
    biographe: string = "";
    constructor(nom: string, public pseudo: string, public naissance: Date, public deces: Date) {
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