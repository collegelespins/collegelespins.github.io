class Epoque extends DocInterne {
    auteurs: Auteur[] = [];
    constructor(public titre: string, public definition: string, public debut: Date, public fin: Date) {
        super("Époque littéraire", titre);
        epoques.push(this);
    }
}
class Mouvement extends DocInterne {
    auteurs: Auteur[] = [];
    exemples: string[] = [];
    constructor(nom: string, public Epoque: Epoque, public definition: string) {
        super("Mouvement littéraire", nom);
        mouvements.push(this);
    }
}
class Genre extends DocInterne {
    auteurs: Auteur[] = [];
    exemples: string[] = [];
    constructor(nom: string, public definition: string, public refs: Site[]) {
        super("Genre littéraire", nom);
        genres.push(this);
    }
}
class Auteur extends DocInterne {
    constructor(nom: string, public epoque: Epoque, public naiss: Date, public deces: Date, public plume: string, public bio = "", public vraiNom = "") {
        super("Auteur", nom);
        auteurs.push(this);
    }
    get titre() {
        return `${this.plume} (${this.naiss.getFullYear()}-${this.deces.getFullYear()})`;
    }
}
class Oeuvre extends DocInterne {
    constructor(public titre: string, public auteur: Auteur, public Epoque: Epoque, public genre: Genre, public publication: Date, public resume: string = "") {
        super("Œuvre", titre);
        oeuvres.push(this);
    }
}
class Texte extends DocInterne {
    constructor(public oeuvre: Oeuvre, public titre: string, public genre: Genre, public texte = "", public explication = "") {
        super("Explication de texte", titre);
        textes.push(this);
    }
}

const epoques: Epoque[] = [];

const XVIeme = new Epoque("XIXème siècle", "La Renaissance (XVIème siècle)", new Date(1500, 0, 1), new Date(1599, 11, 31));
const XVIIeme = new Epoque("XIXème siècle", "L'Âge classique (XVIIème siècle)", new Date(1600, 0, 1), new Date(1699, 11, 31));
const XVIIIeme = new Epoque("XIXème siècle", "Le Siècle des Lumières (XVIIIème siècle)", new Date(1700, 0, 1), new Date(1799, 11, 31));
const XIXeme = new Epoque("XIXème siècle", "Le Romantisme - L'âge industriel", new Date(1800, 0, 1), new Date(1899, 11, 31));
const XXeme = new Epoque("XIXème siècle", "L'époque Contemporaine (XXème-XXIème siècle)", new Date(1900, 0, 1), new Date(2022, 11, 31));

const mouvements: Mouvement[] = [];

const pleiade = new Mouvement("La Pléiade", XVIeme, "");
const humanisme = new Mouvement("L'humanisme", XVIeme, "");
const baroque = new Mouvement("Le baroque", XVIeme, "");
const classique = new Mouvement("Le classicisme", XVIIeme, "");
const preciosite = new Mouvement("La préciosité", XVIIeme, "");
const lumieres = new Mouvement("Les Lumières", XVIIIeme, "");
const romantisme = new Mouvement("Le romantisme", XVIIIeme, "");
const parnasse = new Mouvement("Le Parnasse", XIXeme, "");
const symbolisme = new Mouvement("Le symbolisme", XVIIIeme, "");
const naturalisme = new Mouvement("Le naturalisme", XVIIIeme, "");
const realisme = new Mouvement("Le réalisme", XIXeme, "");
const surrealisme = new Mouvement("Le surréalisme", XIXeme, "");
const dadaisme = new Mouvement("Le dadaïsme", XIXeme, "");
const absurde = new Mouvement("L'absurde", XIXeme, "");
const existentialisme = new Mouvement("L'existentialisme", XIXeme, "");
const nouveauroman = new Mouvement("Le nouveau roman", XIXeme, "");

const genres: Genre[] = [];

const poesie = new Genre("La poésie", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const sonnet = new Genre("Le sonnet", `
Traditionnellement, le "sonnet" en français est un poème de 14 vers, chacun composé de 10 syllabes (décasyllabe) ou 12 syllabes (alexandrin).
Quelques clés pour analyser un sonnet :
- La transition entre quatrains et tercets (=entre le 8ème et le 9ème vers) est souvent le moment clé dans le raisonnement du poème. Ce moment s'appelle une "charnière" (ou une "volta") : c'est le tournant du poème, le moment où, par exemple, le poète introduit le second élément d'une opposition ou d'une comparaison, un second thème lié au premier, ou encore un nouveau personnage.
- Un sonnet possède en général une "pointe" (ou "chute"). La "pointe" correspond au 14ème vers du poème qui doit être surprenant, fort, admirable, faire l'effet d'une révélation et éclairer le reste du poème.
Le sonnet est apparu en Sicile au 13e siècle. La structure la plus répandue repose sur 4 rimes réparties ainsi: ABAB ABAB CDC DCD. Elle est adoptée rapidement par les poètes italiens, Dante Alighieri, Pétrarque et ses imitateurs. Toutes les tons et les styles sont possibles : lyrisme amoureux, satire, etc. Le sonnet devient rapidement un genre "européen" : il est en vogue dès le XVe siècle en Espagne, dès le XVIe en France puis en Angleterre, et au XVIIe en Allemagne.
Malgré sa structure rigide, le sonnet a connu de nombreuses variations selon l'époque et le pays, tant dans la construction strophique que dans l'agencement des rimes : sonnet italien, sonnet pétrarquiste, sonnet marotique, sonnet français, sonnet shakespearien, et sonnets variés et nombreux au XIXe avec Baudelaire, Verlaine, Rimbaud, etc. Poème d'inspiration amoureuse à l'origine, le sonnet a été utilisé par les poètes pour exprimer leur vision du monde, de la nature et des hommes, leur conception de la poésie, ou de l'art en général, et la condition du poète.`,
    [
        new Site("http://www.laits.utexas.edu/bizer/popups/def_sonnet.html", "Site reproduit"),
        new Site("https://tete-en-lettres.com/le-sonnet-definition-et-analyse/", "Définition lycée"),
        new Site("https://www.alloprof.qc.ca/fr/eleves/bv/francais/le-sonnet-f1085", "Définition simple"),
        new Site("https://journals.openedition.org/episteme/2577", "Cours de littérature sur la pointe du sonnet")
    ]);
const ballade = new Genre("La ballade", ``, [new Site("", ""), new Site("", ""), new Site("", "")]);
const rondeau = new Genre("Le rondeau", ``, [new Site("", ""), new Site("", ""), new Site("", "")]);
const virelai = new Genre("Le virelai", ``, [new Site("", ""), new Site("", ""), new Site("", "")]);
const calligramme = new Genre("Le calligramme", ``, [new Site("", ""), new Site("", ""), new Site("", "")]);

const comedie = new Genre("La comédie", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const farce = new Genre("La farce", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const tragiComedie = new Genre("La tragi-comédie", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const tragedie = new Genre("La tragédie", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const drame = new Genre("Le drame", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const scene = new Genre("La scène de théâtre", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const prologue = new Genre("Le prologue au théâtre", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const epilogue = new Genre("L'épilogue au théâtre", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);

const extrait = new Genre("L'extrait d'un roman", "", [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const incipit = new Genre("L'incipit d'un roman", "", [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const chapitre = new Genre("Le chapitre de roman", "", [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const roman = new Genre("Le roman", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);

const science_fiction = new Genre("La science-fiction", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const policier = new Genre("Le genre policier", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const fantastique = new Genre("Le genre fantastique", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const sentimental = new Genre("Le roman sentimental", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const aventure = new Genre("Le roman d'aventure", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const chevaleresque = new Genre("Le récit chevaleresque", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const voyage = new Genre("Le récit de voyage", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const merveilleux = new Genre("Le genre merveilleux", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const lettre = new Genre("Le genre épistolaire", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const argumentation = new Genre("Le texte argumentatif", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const conte_philosophique = new Genre("Le conte philosophique", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const essai = new Genre("L'essai philosophique", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);
const article = new Genre("L'article de presse", ``, [new Site("", ""), new Site("", ""), new Site("", ""), new Site("", "")]);

const auteurs: Auteur[] = [];

const DuBellay = new Auteur("Bellay", XVIeme, new Date(1522, 4, 1), new Date(1560, 1, 0), "Joachim du Bellay");
const Ronsard = new Auteur("Ronsard", XVIeme, new Date(1524, 8, 11), new Date(1585, 11, 27), "Pierre de Ronsard");
const LaFontaine = new Auteur("Fontaine", XVIIIeme, new Date(1621, 6, 8), new Date(1695, 3, 13), "Jean de la Fontaine");
const Moliere = new Auteur("Molière", XVIIeme, new Date(1622, 15, 0), new Date(1873, 1, 17), "Molière", "", "Jean-Baptiste Poquelin");
const LaBruyere = new Auteur("Bruyère", XVIIeme, new Date(1645, 7, 16), new Date(1696, 4, 11), "Jean de la Bruyère");
const Montesquieu = new Auteur("Montesquieu", XVIIIeme, new Date(1669, 0, 18), new Date(1755, 1, 10), "Montesquieu", "", "Charles Louis de Secondat de la Brède et de Montesquieu");
const Voltaire = new Auteur("Voltaire", XVIIIeme, new Date(1694, 10, 21), new Date(1778, 4, 30), "Voltaire", "", "François-Marie Arouet");
const Rousseau = new Auteur("Rousseau", XVIIIeme, new Date(1712, 5, 28), new Date(1778, 6, 2), "Jean-Jacques Rousseau");
const Diderot = new Auteur("Diderot", XVIIIeme, new Date(1713, 9, 5), new Date(1784, 6, 31), "Denis Diderot");
const OlympeGouges = new Auteur("Gouges", XVIIIeme, new Date(1748, 4, 7), new Date(1793, 10, 3), "Olympe de Gouges", "", "Marie Gouze, veuve Aubry");
const Stendhal = new Auteur("Stendhal", XIXeme, new Date(1783, 0, 23), new Date(1842, 2, 23), "Stendhal", "", "Henri Bayle");
const Balzac = new Auteur("Balzac", XIXeme, new Date(1799, 4, 20), new Date(1850, 7, 18), "Honoré de Balzac");
const VictorHugo = new Auteur("Hugo", XIXeme, new Date(1802, 1, 26), new Date(1885, 4, 22), "Victor Hugo");
const GeorgeSand = new Auteur("Sand", XIXeme, new Date(1804, 6, 1), new Date(1876, 5, 8), "George Sand", "", "Amantine Aurore Lucile Dupin de Francueil, baronne Dudevant");
const ThGautier = new Auteur("Gautier", XIXeme, new Date(1811, 7, 30), new Date(1872, 9, 23), "Théophile Gautier");
const Baudelaire = new Auteur("Baudelaire", XIXeme, new Date(1821, 3, 9), new Date(1887, 7, 31), "Charles Baudelaire");
const Flaubert = new Auteur("Flaubert", XIXeme, new Date(1821, 11, 12), new Date(1880, 4, 8), "Gustave Flaubert");
const JulesVerne = new Auteur("Verne", XIXeme, new Date(1828, 6, 8), new Date(1905, 2, 24), "Jules Verne");
const Verlaine = new Auteur("Verlaine", XIXeme, new Date(1844, 2, 30), new Date(1896, 0, 8), "Paul Verlaine");
const Maupassant = new Auteur("Maupassant", XIXeme, new Date(1850, 7, 5), new Date(1696, 6, 6), "Guy de Maupassant");
const Rimbaud = new Auteur("Rimbaud", XIXeme, new Date(1854, 9, 20), new Date(1891, 10, 10), "Arthur Rimbaud");
const Barjavel = new Auteur("Barjavel", XXeme, new Date(1911, 0, 24), new Date(1985, 10, 24), "René Barjavel");

const figures: FigureDeStyle[] = [];
class FigureDeStyle extends DocInterne {
    exemples: string[] = [];
    constructor(nom: string, public type: string, public definition: string = "", ...exemples: string[]) {
        super("Figure de style", nom);
        this.exemples = exemples;
        figures.push(this);
    }
    get titre() {
        return `<span class="fig">${this.nom}</span> (<i>figure ${this.type}</i>)`;
    }
    get info() {
        return `<p>${this.titre}<br/>${this.definition}<br/><b>Exemples :</b><br><i>${this.exemples.join("<br>")}</i><hr></p>`;
    }
}

new FigureDeStyle("Comparaison", "d'analogie", "montre le lien entre ce dont on parle et quelque chose qui sert à le décrire.", "belle comme un ange","tel un lion magestueux","aussi doux que de la soie");
new FigureDeStyle("Métaphore", "d'analogie", "remplace ce dont on parle par une autre expression à prendre au sens figuré.", "le chemin de la réussite", "rendre les armes", "être au sommet", "déborder de joie");
new FigureDeStyle("Personnification", "d'analogie", "attribue à la chose dont on parle des qualités, des capacités que l'on attribue normalement à une personne.", "la flamme dansait dans la cheminée", "le volcan cracha de la lave");

new FigureDeStyle("Métonymie", "de substitution", "remplace ce dont on parle par une autre chose, liée logiquement avec cette chose.", "boire un verre", "manger toute son assiette", "aller au bureau", "la force armée");
new FigureDeStyle("Synecdoque", "de substitution", "forme de métonymie qui remplace ce dont on parle par une partie de cette chose.", "faire de la voile", "demander la main de quelqu'un", "offrir son coeur");
new FigureDeStyle("Périphrase", "de substitution", "remplace ce dont on parle par une expression plus longue servant de description ou de définition.", "la planète bleue","à la fin de ses jours");
new FigureDeStyle("Allégorie", "de substitution", "remplace une notion, une idée, par une représentation visuelle de cette idée.", "la Grande Faucheuse","le sablier du Temps", "l'épée de la justice","la flèche de l'amour");

new FigureDeStyle("Antithèse", "d'opposition", "présente ensemble deux éléments opposés afin de mettre en valeur le contraste que forme leur association.", "le nain et le géant", "le réel et le rêve", "Parler ou se taire ?");
new FigureDeStyle("Oxymore", "d'opposition", "associe dans une expression deux éléments qui ne peuvent pas aller ensemble et qui se contredisent logiquement.", "un silence assourdissant", "une sombre lueur", "une retraite laborieuse");
new FigureDeStyle("Chiasme", "d'opposition", "associe deux groupes de deux éléments en inversant l'ordre des éléments du second groupe.", "un homme(a) riche(b) et une jolie(b) femme(a)", "tout pour lui mais pour elle, rien", "il faut manger pour vivre et non vivre pour manger");
new FigureDeStyle("Antiphrase", "d'opposition", "consiste à dire le contraire de ce que l'on pense pour se moquer (= ironie).", "Ah ! C'est malin ! Quelle brillante idée !", "tu as la palme");
new FigureDeStyle("Ironie", "d'opposition", "consiste à dire le contraire de ce que l'on pense pour se moquer (= antiphrase).", "on atteint là des sommets", "tu t'es planté en beauté", "c'était une belle gaffe");

new FigureDeStyle("Anaphore", "d'insistance", "consiste à commencer plusieurs expressions successives par les mêmes mots.", "Un inconnu est entré chez moi. Un inconnu a fouillé ma maison. Un inconnu a ouvert mes tiroirs. Un inconnu a saccagé toutes mes affaires !");
new FigureDeStyle("Parallélisme", "d'insistance","reproduit la forme grammaticale d'une expression avec un vocabulaire différent.", "tout pour elle mais rien pour lui", "une élégante nappe de tissu, de splendides assiettes de porcelaine, de magnifiques couverts d'argent");
new FigureDeStyle("Répétition", "d'insistance", "consiste à dire plusieurs fois la même chose pour bien le faire comprendre.","", "Non, non et non !");
new FigureDeStyle("Gradation", "d'insistance", "consiste à placer des expressions (3 en général) dans un ordre croissant ou décroissant.", "c'est un pic, c'est un cap, c'est une péninsule", "la crainte, la frayeur, l'épouvante même s'empara alors de moi");
new FigureDeStyle("Hyperbole", "d'insistance", "consiste à présenter sa pensée de façon exagérée, sans réelle mesure avec le réel.", "Je te l'ai dit mille fois", "des ruisseaux de sang", "elle versa des torrents de larmes");
new FigureDeStyle("Énumération", "d'insistance", "figure consistant à créer une liste d'éléments sur un thème quelconque.", "des pommes, des poires, des prunes et des pêches");
new FigureDeStyle("Pléonasme", "d'insistance", "consiste à dire deux fois la même chose avec des mots différents pour bien le faire comprendre.", "Je l'aime d'amour","elle dit la vérité vraie", "Il souffre de douleur");

new FigureDeStyle("Euphémisme", "d'atténuation", "consiste à remplacer quelque chose de négatif par quelque chose d'un peu moins négatif afin de mieux la faire passer.","il nous a quittés", "il s'en est allé", "un mal-entendant", "une personne d'un certain âge");
new FigureDeStyle("Litote", "d'atténuation", "consiste à remplacer quelque chose de positif par quelque chose d'un peu moins positif, pour ne pas la dire franchement par retenue, par pudeur.", "Je ne le trouve pas désagréable", "C'est pas dégueu (Gainsbourg)");
new FigureDeStyle("Ellipse", "d'atténuation", "consiste à enlever des mots de la phrase, à raccourcir l'information", "Heureux qui comme Ulysse a fait un beau voyage", "Combien cette robe ?", "Froid, moi ? Jamais !");

new FigureDeStyle("Paradoxe", "d'expression", "consiste à présenter une information contraire à l'opinion habituelle ou à la logique", "Les premiers seront les derniers.","il n'y a que le premier pas qui coûte", "le mieux est l'ennemi du bien", "les petits ruisseaux font les grandes rivières");
new FigureDeStyle("Question rhétorique", "d'expression", "consiste à poser une question qui n'attend aucune réponse car cette réponse est évidente ou sous-entendue", "Tu as trouvé ça tout seul ?", "Comment peux-tu penser une chose pareille ?")