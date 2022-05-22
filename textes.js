"use strict";
const oeuvres = [];
const textes = [];
const FleursDuMal = new Oeuvre("Les Fleurs du Mal", Baudelaire, XIXeme, poesie, new Date(1857, 5, 21));
const Fleurs_ennemi = new Texte(FleursDuMal, "L'Ennemi", sonnet, `<pre>Ma jeunesse ne fut qu’un ténébreux orage,
    Traversé çà et là par de brillants soleils ;
    Le tonnerre et la pluie ont fait un tel ravage,
    Qu’il reste en mon jardin bien peu de fruits vermeils.

    Voilà que j’ai touché l’automne des idées,
    Et qu’il faut employer la pelle et les râteaux
    Pour rassembler à neuf les terres inondées,
    Où l’eau creuse des trous grands comme des tombeaux.

    Et qui sait si les fleurs nouvelles que je rêve
    Trouveront dans ce sol lavé comme une grève
    Le mystique aliment qui ferait leur vigueur ?

    – Ô douleur ! ô douleur ! Le Temps mange la vie,
    Et l’obscur Ennemi qui nous ronge le cœur
    Du sang que nous perdons croît et se fortifie !</pre>`);
const Fleurs_albatros = new Texte(FleursDuMal, "L'Albatros", poesie, `<pre>Souvent, pour s’amuser, les hommes d’équipage
    Prennent des albatros, vastes oiseaux des mers,
    Qui suivent, indolents compagnons de voyage,
    Le navire glissant sur les gouffres amers.

    A peine les ont-ils déposés sur les planches,
    Que ces rois de l’azur, maladroits et honteux,
    Laissent piteusement leurs grandes ailes blanches
    Comme des avirons traîner à côté d’eux.

    Ce voyageur ailé, comme il est gauche et veule !
    Lui, naguère si beau, qu’il est comique et laid !
    L’un agace son bec avec un brûle-gueule,
    L’autre mime, en boitant, l’infirme qui volait !

    Le Poète est semblable au prince des nuées
    Qui hante la tempête et se rit de l’archer ;
    Exilé sur le sol au milieu des huées,
    Ses ailes de géant l’empêchent de marcher.</pre>`);
const Fleurs_passante = new Texte(FleursDuMal, "À une passante", sonnet, `<pre>La rue assourdissante autour de moi hurlait.
    Longue, mince, en grand deuil, douleur majestueuse,
    Une femme passa, d'une main fastueuse
    Soulevant, balançant le feston et l'ourlet ;

    Agile et noble, avec sa jambe de statue.
    Moi, je buvais, crispé comme un extravagant,
    Dans son oeil, ciel livide où germe l'ouragan,
    La douceur qui fascine et le plaisir qui tue.

    Un éclair... puis la nuit ! - Fugitive beauté
    Dont le regard m'a fait soudainement renaître,
    Ne te verrai-je plus que dans l'éternité ?

    Ailleurs, bien loin d'ici ! trop tard ! jamais peut-être !
    Car j'ignore où tu fuis, tu ne sais où je vais,
    Ô toi que j'eusse aimée, ô toi qui le savais !</pre>`);
const Fleurs_parfum = new Texte(FleursDuMal, "Parfum exotique", sonnet, `<pre>Quand, les deux yeux fermés, en un soir chaud d'automne,
    Je respire l’odeur de ton sein chaleureux,
    Je vois se dérouler des rivages heureux
    Qu’éblouissent les feux d'un soleil monotone ;

    Une île paresseuse où la nature donne
    Des arbres singuliers et des fruits savoureux ;
    Des hommes dont le corps est mince et vigoureux,
    Et des femmes dont l’œil par sa franchise étonne.

    Guidé par ton odeur vers de charmants climats,
    Je vois un port rempli de voiles et de mâts
    Encor tout fatigués par la vague marine,

    Pendant que le parfum des verts tamariniers,
    Qui circule dans l’air et m’enfle la narine,
    Se mêle dans mon âme au chant des mariniers.</pre>`);
const Fleurs_serpent = new Texte(FleursDuMal, "Le Serpent qui danse", poesie, `<pre>Que j'aime voir, chère indolente,
    De ton corps si beau,
    Comme une étoffe vacillante,
    Miroiter la peau !

    Sur ta chevelure profonde
    Aux âcres parfums,
    Mer odorante et vagabonde
    Aux flots bleus et bruns,

    Comme un navire qui s'éveille
    Au vent du matin,
    Mon âme rêveuse appareille
    Pour un ciel lointain.

    Tes yeux où rien ne se révèle
    De doux ni d'amer,
    Sont deux bijoux froids où se mêlent
    L’or avec le fer.

    A te voir marcher en cadence,
    Belle d'abandon,
    On dirait un serpent qui danse
    Au bout d'un bâton.

    Sous le fardeau de ta paresse
    Ta tête d'enfant
    Se balance avec la mollesse
    D’un jeune éléphant,

    Et ton corps se penche et s'allonge
    Comme un fin vaisseau
    Qui roule bord sur bord et plonge
    Ses vergues dans l'eau.

    Comme un flot grossi par la fonte
    Des glaciers grondants,
    Quand l'eau de ta bouche remonte
    Au bord de tes dents,

    Je crois boire un vin de bohême,
    Amer et vainqueur,
    Un ciel liquide qui parsème
    D’étoiles mon cœur !</pre>`);
const Fleurs_invit = new Texte(FleursDuMal, "L'Invitation au voyage", poesie, `<pre>Mon enfant, ma sœur,
    Songe à la douceur
    D’aller là-bas vivre ensemble !
    Aimer à loisir,
    Aimer et mourir
    Au pays qui te ressemble !
    Les soleils mouillés
    De ces ciels brouillés
    Pour mon esprit ont les charmes
    Si mystérieux
    De tes traîtres yeux,
    Brillant à travers leurs larmes.

    Là, tout n’est qu’ordre et beauté,
    Luxe, calme et volupté.

    Des meubles luisants,
    Polis par les ans,
    Décoreraient notre chambre ;
    Les plus rares fleurs
    Mêlant leurs odeurs
    Aux vagues senteurs de l’ambre,
    Les riches plafonds,
    Les miroirs profonds,
    La splendeur orientale,
    Tout y parlerait
    À l’âme en secret
    Sa douce langue natale.

    Là, tout n’est qu’ordre et beauté,
    Luxe, calme et volupté.

    Vois sur ces canaux
    Dormir ces vaisseaux
    Dont l’humeur est vagabonde ;
    C’est pour assouvir
    Ton moindre désir
    Qu’ils viennent du bout du monde.
    — Les soleils couchants
    Revêtent les champs,
    Les canaux, la ville entière,
    D’hyacinthe et d’or ;
    Le monde s’endort
    Dans une chaude lumière.

    Là, tout n’est qu’ordre et beauté,
    Luxe, calme et volupté.</pre>`);
const Fleurs_ciels = new Texte(FleursDuMal, "Ciel Brouillé", sonnet, `<pre>On dirait ton regard d'une vapeur couvert ;
    Ton oeil mystérieux (est-il bleu, gris ou vert ?)
    Alternativement tendre, rêveur, cruel,
    Réfléchit l'indolence et la pâleur du ciel.

    Tu rappelles ces jours blancs, tièdes et voilés,
    Qui font se fondre en pleurs les coeurs ensorcelés,
    Quand, agités d'un mal inconnu qui les tord,
    Les nerfs trop éveillés raillent l'esprit qui dort.

    Tu ressembles parfois à ces beaux horizons
    Qu'allument les soleils des brumeuses saisons...
    Comme tu resplendis, paysage mouillé
    Qu'enflamment les rayons tombant d'un ciel brouillé !

    Ô femme dangereuse, ô séduisants climats !
    Adorerai-je aussi ta neige et vos frimas,
    Et saurai-je tirer de l'implacable hiver
    Des plaisirs plus aigus que la glace et le fer ?</pre>`);
const MaladeImaginaire = new Oeuvre("Le Malade Imaginaire", Moliere, XVIIeme, comedie, new Date(1673, 1, 10), "");
const Malade_1a = new Texte(MaladeImaginaire, "Le Malade Imaginaire, Acte I, scène 5", scene, `<b>ARGAN, ANGÉLIQUE, TOINETTE.</b>
    <p><b>Argan :</b> Oh çà, ma fille, je vais vous dire une nouvelle, où peut-être ne vous attendez-vous pas. On vous demande en mariage. Qu’est-ce que cela ? Vous riez ? Cela est plaisant oui, ce mot de mariage ! Il n’y a rien de plus drôle pour les jeunes filles. Ah ! nature, nature ! À ce que je puis voir, ma fille, je n’ai que faire de vous demander si vous voulez bien vous marier.
    <br><b>Angélique :</b> Je dois faire, mon père, tout ce qu’il vous plaira de m’ordonner.
    <br><b>Argan :</b> Je suis bien aise d’avoir une fille si obéissante : la chose est donc conclue, et je vous ai promise.
    <br><b>Angélique :</b> C’est à moi, mon père, de suivre aveuglément toutes vos volontés.
    <br><b>Argan :</b> Ma femme, votre belle-mère, avait envie que je vous fisse religieuse, et votre petite sœur Louison aussi, et de tout temps elle a été aheurtée à cela.
    <br><b>Toinette, <span class="didas">à part :</span></b> La bonne bête a ses raisons.
    <br><b>Argan :</b> Elle ne voulait point consentir à ce mariage ; mais je l’ai emporté, et ma parole est donnée.
    <br><b>Angélique :</b> Ah ! mon père, que je vous suis obligée de toutes vos bontés !
    <br><b>Toinette, <span class="didas">à Argan :</span></b> En vérité, je vous sais bon gré de cela ; et voilà l’action la plus sage que vous ayez faite de votre vie.
    <br><b>Argan :</b> Je n’ai point encore vu la personne : mais on m’a dit que j’en serais content, et toi aussi.
    <br><b>Angélique :</b> Assurément, mon père.
    <br><b>Argan :</b> Comment ! l’as-tu vu ?
    <br><b>Angélique :</b> Puisque votre consentement m’autorise à vous pouvoir ouvrir mon cœur, je ne feindrai point de vous dire que le hasard nous a fait connaître il y a six jours, et que la demande qu’on vous a faite est un effet de l’inclination que, dès cette première vue, nous avons prise l’un pour l’autre.
    <br><b>Argan :</b> Ils ne m’ont pas dit cela ; mais j’en suis bien aise, et c’est tant mieux que les choses soient de la sorte. Ils disent que c’est un grand jeune garçon bien fait.
    <br><b>Angélique :</b> Oui, mon père.
    <br><b>Argan :</b> De belle taille.
    <br><b>Angélique :</b> Sans doute.
    <br><b>Argan :</b> Agréable de sa personne.
    <br><b>Angélique :</b> Assurément.
    <br><b>Argan :</b> De bonne physionomie.
    <br><b>Angélique :</b> Très bonne.
    <br><b>Argan :</b> Sage et bien né.
    <br><b>Angélique :</b> Tout à fait.
    <br><b>Argan : </b>Fort honnête.
    <br><b>Angélique :</b> Le plus honnête du monde.
    <br><b>Argan : </b>Qui parle bien latin et grec.
    <br><b>Angélique :</b> C’est ce que je ne sais pas.
    <br><b>Argan :</b> Et qui sera reçu médecin dans trois jours.
    <br><b>Angélique :</b> Lui, mon père ?
    <br><b>Argan :</b> Oui. Est-ce qu’il ne te l’a pas dit ?
    <br><b>Angélique :</b> Non, vraiment. Qui vous l’a dit, à vous ?
    <br><b>Argan :</b> Monsieur Purgon.
    <br><b>Angélique :</b> Est-ce que monsieur Purgon le connaît ?
    <br><b>Argan :</b> La belle demande ! Il faut bien qu’il le connaisse puisque c’est son neveu.
    <br><b>Angélique :</b> Cléante, neveu de monsieur Purgon ?
    <br><b>Argan :</b> Quel Cléante ? Nous parlons de celui pour qui l’on t’a demandée en mariage.
    <br><b>Angélique :</b> Hé ! oui.
    <br><b>Argan :</b> Hé bien ! c’est le neveu de monsieur Purgon, qui est le fils de son beau-frère le médecin, monsieur Diafoirus ; et ce fils s’appelle Thomas Diafoirus, et non pas Cléante ; et nous avons conclu ce mariage-là ce matin, monsieur Purgon, monsieur Fleurant, et moi ; et demain, ce gendre prétendu doit m’être amené par son père. Qu’est-ce ? Vous voilà tout ébaubie !
    <br><b>Angélique :</b> C’est, mon père, que je connais que vous avez parlé d’une personne, et que j’ai entendu une autre.
    <br><b>Toinette : </b> Quoi ! monsieur, vous auriez fait ce dessein burlesque ? Et, avec tout le bien que vous avez, vous voudriez marier votre fille avec un médecin ?
    <br><b>Argan :</b> Oui. De quoi te mêles-tu, coquine, impudente que tu es ?
    <br><b>Toinette : </b>Mon Dieu ! tout doux. Vous allez d’abord aux invectives. Est-ce que nous ne pouvons pas raisonner ensemble sans nous emporter ? Là, parlons de sang-froid. Quelle est votre raison, s’il vous plaît, pour un tel mariage ?
    <br><b>Argan :</b> Ma raison est que, me voyant infirme et malade comme je le suis, je veux me faire un gendre et des alliés médecins, afin de m’appuyer de bons secours contre ma maladie, d’avoir dans ma famille les sources des remèdes qui me sont nécessaires, et d’être à même des consultations et des ordonnances.
    <br><b>Toinette </b>Hé bien ! voilà dire une raison, et il y a du plaisir à se répondre doucement les uns aux autres. Mais, monsieur, mettez la main à la conscience ; est-ce que vous êtes malade ?
    <br><b>Argan :</b> Comment, coquine ! si je suis malade ! Si je suis malade, impudente !
    <br><b>Toinette : </b>Hé bien ! oui, monsieur, vous êtes malade ; n’ayons point de querelle là-dessus. Oui, vous êtes fort malade, j’en demeure d’accord, et plus malade que vous ne pensez : voilà qui est fait. Mais votre fille doit épouser un mari pour elle ; et, n’étant point malade, il n’est pas nécessaire de lui donner un médecin.
    <br><b>Argan :</b> C’est pour moi que je lui donne ce médecin ; et une fille de bon naturel doit être ravie d’épouser ce qui est utile à la santé de son père.
    <br><b>Toinette : </b>Ma foi, monsieur, voulez-vous qu’en amie je vous donne un conseil ?
    <br><b>Argan : </b>Quel est-il, ce conseil ?
    <br><b>Toinette :</b> De ne point songer à ce mariage-là.
    <br><b>Argan : </b>Et la raison ?
    <br><b>Toinette : </b> La raison, c’est que votre fille n’y consentira point.
    <br><b>Argan : </b>Elle n’y consentira point ?
    <br><b>Toinette </b>Non.
    <br><b>Argan : </b>Ma fille ?
    <br><b>Toinette </b>Votre fille. Elle vous dira qu’elle n’a que faire de monsieur Diafoirus, de son fils Thomas Diafoirus, ni de tous les Diafoirus du monde.
    <br><b>Argan : </b>J’en ai affaire, moi, outre que le parti est plus avantageux qu’on ne pense. Monsieur Diafoirus n’a que ce fils-là pour tout héritier ; et, de plus, monsieur Purgon, qui n’a ni femme ni enfants, lui donne tout son bien en faveur de ce mariage ; et monsieur Purgon est un homme qui a huit mille bonnes livres de rente.
    <br><b>Toinette </b>Il faut qu’il ait tué bien des gens, pour s’être fait si riche.
    <br><b>Argan : </b>Huit mille livres de rente sont quelque chose, sans compter le bien du père.
    <br><b>Toinette </b>Monsieur, tout cela est bel et bon ; mais j’en reviens toujours là : je vous conseille, entre nous, de lui choisir un autre mari ; et elle n’est point faite pour être madame Diafoirus.
    <br><b>Argan : </b>Et je veux, moi, que cela soit.
    <br><b>Toinette </b>Hé, fi ! ne dites pas cela.
    <br><b>Argan : </b>Comment ! que je ne dise pas cela ?
    <br><b>Toinette </b>Hé, non.
    <br><b>Argan : </b>Et pourquoi ne le dirai-je pas ?
    <br><b>Toinette </b>On dira que vous ne songez pas à ce que vous dites.
    <br><b>Argan : </b>On dira ce qu’on voudra ; mais je vous dis que je veux qu’elle exécute la parole que j’ai donnée.
    <br><b>Toinette </b>Non ; je suis sûre qu’elle ne le fera pas.
    <br><b>Argan : </b>Je l’y forcerai bien.
    <br><b>Toinette </b>Elle ne le fera pas, vous dis-je.
    <br><b>Argan : </b>Elle le fera, ou je la mettrai dans un couvent.
    <br><b>Toinette </b>Vous ?
    <br><b>Argan : </b>Moi.
    <br><b>Toinette </b>Bon !
    <br><b>Argan : </b>Comment, bon ?
    <br><b>Toinette :</b>Vous ne la mettrez point dans un couvent.
    <br><b>Argan : </b>Je ne la mettrai point dans un couvent ?
    <br><b>Toinette </b>Non.
    <br><b>Argan : </b>Non ?
    <br><b>Toinette : </b>Non.
    <br><b>Argan : </b>Ouais ! Voici qui est plaisant ! Je ne mettrai pas ma fille dans un couvent, si je veux ?
    <br><b>Toinette :</b>Non, vous dis-je.
    <br><b>Argan : </b>Qui m’en empêchera ?
    <br><b>Toinette : </b>Vous-même.
    <br><b>Argan : </b>Moi ?
    <br><b>Toinette : </b>Oui. Vous n’aurez pas ce cœur-là.
    <br><b>Argan : </b>Je l’aurai.
    <br><b>Toinette : </b>Vous vous moquez.
    <br><b>Argan : </b>Je ne me moque point.
    <br><b>Toinette : </b>La tendresse paternelle vous prendra.
    <br><b>Argan : </b>Elle ne me prendra point.
    <br><b>Toinette </b>Une petite larme ou deux, des bras jetés au cou, un <i>Mon petit papa mignon</i>, prononcé tendrement, sera assez pour vous toucher.
    <br><b>Argan : </b>Tout cela ne fera rien.
    <br><b>Toinette : </b>Oui, oui.
    <br><b>Argan : </b>Je vous dis que je n’en démordrai point.
    <br><b>Toinette : </b>Bagatelles.
    <br><b>Argan : </b>Il ne faut point dire <i>Bagatelles</i>.
    <br><b>Toinette : </b>Mon Dieu ! je vous connais, vous êtes bon naturellement.
    <br><b>Argan, <span class="didas">avec emportement</span> : </b>Je ne suis point bon, et je suis méchant quand je veux.
    <br><b>Toinette : </b>Doucement, monsieur. Vous ne songez pas que vous êtes malade.
    <br><b>Argan : </b>Je lui commande absolument de se préparer à prendre le mari que je dis.
    <br><b>Toinette : </b>Et moi, je lui défends absolument d’en faire rien.
    <br><b>Argan : </b>Où est-ce donc que nous sommes ? et quelle audace est-ce là, à une coquine de servante, de parler de la sorte devant son maître ?
    <br><b>Toinette : </b>Quand un maître ne songe pas à ce qu’il fait, une servante bien sensée est en droit de le redresser.
    <br><b>Argan, <span class="didas">courant après Toinette</span> : </b>Ah ! insolente, il faut que je t’assomme.
    <br><b>Toinette, <span class="didas">évitant Argan, et mettant la chaise entre elle et lui</span> : </b>Il est de mon devoir de m’opposer aux choses qui vous peuvent déshonorer.
    <br><b>Argan, <span class="didas">courant après Toinette autour de la chaise avec son bâton</span> : </b>Viens, viens, que je t’apprenne à parler.
    <br><b>Toinette, <span class="didas">se sauvant du côté où n’est point Argan</span> : </b>Je m’intéresse, comme je dois, à ne vous point laisser faire de folie.
    <br><b>Argan, <span class="didas">de même</span> : </b>Chienne !
    <br><b>Toinette, <span class="didas">de même</span> : </b>Non, je ne consentirai jamais à ce mariage.
    <br><b>Argan, <span class="didas">de même</span> : </b> Pendarde !
    <br><b>Toinette, <span class="didas">de même</span> : </b>Je ne veux point qu’elle épouse votre Thomas Diafoirus.
    <br><b>Argan, <span class="didas">de même</span> : </b>Carogne !
    <br><b>Toinette, <span class="didas">de même</span> : </b>Et elle m’obéira plutôt qu’à vous.
    <br><b>Argan, <span class="didas"> s’arrêtant</span> : </b>Angélique, tu ne veux pas m’arrêter cette coquine-là ?
    <br><b>Angélique : </b>Hé ! mon père, ne vous faites point malade.
    <br><b>Argan, <span class="didas">à Angélique</span> : </b>Si tu ne me l’arrêtes, je te donnerai ma malédiction.
    <br><b>Toinette, <span class="didas"> en s’en allant </span> : </b>Et moi, je la déshériterai, si elle vous obéit.
    <br><b>Argan, <span class="didas">se jetant dans sa chaise</span> : </b> Ah ! ah ! je n’en puis plus. Voilà pour me faire mourir.
`);
const Malade_1b = new Texte(MaladeImaginaire, "Le Malade Imaginaire, Acte I, scène 9", scene, `<b>MONSIEUR DE BONNEFOI, BÉLINE, ARGAN.</b>
    <p><b>Argan : </b> Approchez, monsieur de Bonnefoi, approchez. Prenez un siège, s’il vous plaît. Ma femme m’a dit, monsieur, que vous étiez fort honnête homme, et tout à fait de ses amis ; et je l’ai chargée de vous parler pour un testament que je veux faire.
    <br><b>Béline : </b> Hélas ! je ne suis point capable de parler de ces choses-là.
    <br><b>Monsieur de Bonnefoi : </b> Elle m’a, monsieur, expliqué vos intentions, et le dessein où vous êtes pour elle ; et j’ai à vous dire là-dessus que vous ne sauriez rien donner à votre femme par votre testament.
    <br><b>Argan : </b> Mais pourquoi ?
    <br><b>Monsieur de Bonnefoi : </b> La coutume y résiste. Si vous étiez en pays de droit écrit, cela se pourrait faire : mais, à Paris et dans les pays coutumiers, au moins dans la plupart, c’est ce qui ne se peut ; et la disposition serait nulle. Tout l’avantage qu’homme et femme conjoints par mariage se peuvent faire l’un à l’autre, c’est un don mutuel entre vifs ; encore faut-il qu’il n’y ait enfants, soit des deux conjoints, ou de l’un d’eux, lors du décès du premier mourant.
    <br><b>Argan : </b> Voilà une coutume bien impertinente, qu’un mari ne puisse rien laisser à une femme dont il est aimé tendrement, et qui prend de lui tant de soin ! J’aurais envie de consulter mon avocat, pour voir comment je pourrais faire.
    <br><b>Monsieur de Bonnefoi : </b> Ce n’est point à des avocats qu’il faut aller, car ils sont d’ordinaire sévères là-dessus, et s’imaginent que c’est un grand crime que de disposer en fraude de la loi : ce sont gens de difficultés, et qui sont ignorants des détours de la conscience. Il y a d’autres personnes à consulter, qui sont bien plus accommodantes, qui ont des expédients pour passer doucement par-dessus la loi, et rendre juste ce qui n’est pas permis ; qui savent aplanir les difficultés d’une affaire et trouver des moyens d’éluder la coutume par quelque avantage indirect. Sans cela, où en serions-nous tous les jours ? Il faut de la facilité dans les choses ; autrement nous ne ferions rien, et je ne donnerais pas un sol de notre métier.
    <br><b>Argan : </b> Ma femme m’avait bien dit, monsieur, que vous étiez fort habile et fort honnête homme. Comment puis-je faire, s’il vous plaît, pour lui donner mon bien et en frustrer mes enfants ?
    <br><b>Monsieur de Bonnefoi : </b> Comment vous pouvez faire ? Vous pouvez choisir doucement un ami intime de votre femme, auquel vous donnerez en bonne forme, par votre testament, tout ce que vous pouvez ; et cet ami ensuite lui rendra tout. Vous pouvez encore contracter un grand nombre d’obligations non suspectes au profit de divers créanciers qui prêteront leur nom à votre femme, et entre les mains de laquelle ils mettront leur déclaration que ce qu’ils en ont fait n’a été que pour lui faire plaisir. Vous pouvez aussi, pendant que vous êtes en vie, mettre entre ses mains de l’argent comptant, ou des billets que vous pourrez avoir payables au porteur.
    <br><b>Béline : </b> Mon Dieu ! il ne faut point vous tourmenter de tout cela. S’il vient faute de vous, mon fils, je ne veux plus rester au monde.
    <br><b>Argan : </b> Ma mie !
    <br><b>Béline : </b> Oui, mon ami, si je suis assez malheureuse pour vous perdre…
    <br><b>Argan : </b> Ma chère femme !
    <br><b>Béline : </b> La vie ne me sera plus de rien.
    <br><b>Argan : </b> M’amour !
    <br><b>Béline : </b> Et je suivrai vos pas, pour vous faire connaître la tendresse que j’ai pour vous.
    <br><b>Argan : </b> Ma mie, vous me fendez le cœur ! Consolez-vous, je vous en prie.
    <br><b>Monsieur de Bonnefoi, <span class="didas">à Béline</span> : </b> Ces larmes sont hors de saison ; et les choses n’en sont point encore là.
    <br><b>Béline : </b> Ah ! monsieur, vous ne savez pas ce que c’est qu’un mari qu’on aime tendrement.
    <br><b>Argan : </b> Tout le regret que j’aurai, si je meurs, ma mie, c’est de n’avoir point un enfant de vous. Monsieur Purgon m’avait dit qu’il m’en ferait faire un.
    <br><b>Monsieur de Bonnefoi: </b> Cela pourra venir encore.
    <br><b>Argan : </b> Il faut faire mon testament, m’amour, de la façon que monsieur dit ; mais, par précaution, je veux vous mettre entre les mains vingt mille francs en or que j’ai dans le lambris de mon alcôve, et deux billets payables au porteur, qui me sont dus, l’un par monsieur Damon, et l’autre par monsieur Gérante.
    <br><b>Béline : </b> Non, non, je ne veux point de tout cela. Ah !… Combien dites-vous qu’il y a dans votre alcôve ?
    <br><b>Argan : </b> Vingt mille francs, m’amour.
    <br><b>Béline : </b> Ne me parlez point de bien, je vous prie. Ah !… De combien sont les deux billets ?
    <br><b>Argan : </b> Ils sont, ma mie, l’un de quatre mille francs, et l’autre de six.
    <br><b>Béline : </b> Tous les biens du monde, mon ami, ne me sont rien au prix de vous.
    <br><b>Monsieur de Bonnefoi : </b> Voulez-vous que nous procédions au testament ?
    <br><b>Argan : </b> Oui, monsieur ; mais nous serons mieux dans mon petit cabinet. M’amour, conduisez-moi, je vous prie.
    <br><b>Béline : </b> Allons, mon pauvre petit fils.
`);
const Malade_2b = new Texte(MaladeImaginaire, "Le Malade Imaginaire, Acte II, scène 6", scene, `<b>MONSIEUR DIAFOIRUS, Thomas Diafoirus, ARGAN, ANGÉLIQUE, CLÉANTE, TOINETTE, LAQUAIS.</b>
    <p><b>Argan, <span class="didas">mettant la main à son bonnet, sans l’ôter </span></b> : 
    Monsieur Purgon, monsieur, m’a défendu de découvrir ma tête. Vous êtes du métier : vous savez les conséquences.
    <br><b>Monsieur Diafoirus</b> : 
    Nous sommes dans toutes nos visites pour porter secours aux malades, et non pour leur porter de l’incommodité.
    <span class="didas">(Argan et monsieur Diafoirus parlent en même temps.)</span>
    <br><b>Argan</b> :
    Je reçois, monsieur,
    <br><b>Monsieur Diafoirus</b> : 
    Nous venons ici, monsieur,
    <br><b>Argan</b> : 
    Avec beaucoup de joie,
    <br><b>Monsieur Diafoirus</b> : 
    Mon fils Thomas et moi,
    <br><b>Argan</b> : 
    L’honneur que vous me faites,
    <br><b>Monsieur Diafoirus</b> :
    Vous témoigner, monsieur,
    <br><b>Argan</b> : 
    Et j’aurais souhaité…
    <br><b>Monsieur Diafoirus</b> : 
    Le ravissement où nous sommes…
    <br><b>Argan</b> : 
    De pouvoir aller chez vous…
    <br><b>Monsieur Diafoirus</b> : 
    De la grace que vous nous faites…
    <br><b>Argan</b> : 
    Pour vous en assurer.
    <br><b>Monsieur Diafoirus</b> : 
    De vouloir bien nous recevoir…
    <br><b>Argan</b> : 
    Mais vous savez, monsieur…
    <br><b>Monsieur Diafoirus</b> : 
    Dans l’honneur, monsieur,
    <br><b>Argan</b> : 
    Ce que c’est qu’un pauvre malade,
    <br><b>Monsieur Diafoirus</b> : 
    De votre alliance ;
    <br><b>Argan</b> : 
    Qui ne peut faire autre chose…
    <br><b>Monsieur Diafoirus</b> : 
    Et vous assurer…
    <br><b>Argan</b> : 
    Que de vous dire ici…
    <br><b>Monsieur Diafoirus</b> :
    Que, dans les choses qui dépendront de notre métier
    <br><b>Argan</b> : 
    Qu’il cherchera toutes les occasions
    <br><b>Monsieur Diafoirus</b> : 
    De même qu’en toute autre,
    <br><b>Argan</b> : 
    De vous faire connaître, monsieur,
    <br><b>Monsieur Diafoirus</b> : 
    Nous serons toujours prêts, monsieur,
    <br><b>Argan</b> : 
    Qu’il est tout à votre service.
    <br><b>Monsieur Diafoirus</b> : 
    À vous témoigner notre zèle. <span class="didas">(à son fils.)</span> : Allons, Thomas, avancez. Faites vos compliments.
    <br><b>Thomas Diafoirus, <span class="didas">à monsieur Diafoirus</span></b> :
    N’est-ce pas par le père qu’il convient de commencer ?
    <br><b>Monsieur Diafoirus</b> : 
    Oui.
    <br><b>Thomas Diafoirus, <span class="didas">à Argan</span></b> : 
    Monsieur, je viens saluer, reconnaître, chérir et révérer en vous un second père, mais un second père auquel j’ose dire que je me trouve plus redevable qu’au premier. Le premier m’a engendré ; mais vous m’avez choisi. Il m’a reçu par nécessité ; mais vous m’avez accepté par grace. Ce que je tiens de lui est un ouvrage de son corps ; mais ce que je tiens de vous est un ouvrage de votre volonté ; et, d’autant plus que les facultés spirituelles sont au-dessus des corporelles, d’autant plus je vous dois, et d’autant plus je tiens précieuse cette future filiation, dont je viens aujourd’hui vous rendre, par avance, les très humbles et très respectueux hommages.
    <br><b>Toinette </b> : 
    Vivent les collèges d’où l’on sort si habile homme !
    <br><b>Thomas Diafoirus, <span class="didas">à monsieur Diafoirus</span></b> :
    Cela a-t-il bien été, mon père ?
    <br><b>Monsieur Diafoirus</b> : 
    Optime.
    <br><b>Argan, <span class="didas">à Angélique</span></b> : 
    Allons, saluez monsieur.
    <br><b>Thomas Diafoirus, <span class="didas">à monsieur Diafoirus</span></b> :
    Baiserai-je ?
    <br><b>Monsieur Diafoirus</b> : 
    Oui, oui.
    <br><b>Thomas Diafoirus, <span class="didas">à Angélique</span></b> :
    Madame, c’est avec justice que le ciel vous a concédé le nom de belle-mère, puisque l’on…
    <br><b>Argan, <span class="didas">à Thomas Diafoirus</span></b> : 
    Ce n’est pas ma femme, c’est ma fille à qui vous parlez.
    <br><b>Thomas Diafoirus, <span class="didas">à monsieur Diafoirus</span></b> :
    Où donc est-elle ?
    <br><b>Argan</b> :
    Elle va venir.
    <br><b>Thomas Diafoirus</b> : 
    Attendrai-je, mon père, qu’elle soit venue ?
    <br><b>Monsieur Diafoirus</b> : 
    Faites toujours le compliment de mademoiselle.
    <br><b>Thomas Diafoirus</b> : 
    Mademoiselle, ne plus ne moins que la statue de Memnon rendait un son harmonieux lorsqu’elle venait à être éclairée des rayons du soleil, tout de même me sens-je animé d’un doux transport à l’apparition du soleil de vos beautés ; et, comme les naturalistes remarquent que la fleur nommée héliotrope tourne sans cesse vers cet astre du jour, aussi mon cœur dores-en-avant tournera-t-il toujours vers les astres resplendissants de vos yeux adorables, ainsi que vers son pôle unique. Souffrez donc, mademoiselle, que j’appende aujourd’hui à l’autel de vos charmes l’offrande de ce cœur qui ne respire et n’ambitionne autre gloire que d’être toute sa vie, mademoiselle, votre très humble, très obéissant, et très fidèle serviteur et mari.
    <br><b>Toinette </b> : 
    Voilà ce que c’est que d’étudier ! on apprend à dire de belles choses.
    <br><b>Argan, <span class="didas">à Cléante</span></b> :
    Hé ! que dites-vous de cela ?
    <br><b>Cléante</b> : 
    Que monsieur fait merveilles, et que, s’il est aussi bon médecin qu’il est bon orateur, il y aura plaisir à être de ses malades.
    <br><b>Toinette </b> : 
    Assurément. Ce sera quelque chose d’admirable, s’il fait d’aussi belles cures qu’il fait de beaux discours.
    <br><b>Argan</b> : 
    Allons, vite, ma chaise, et des sièges à tout le monde. <span class="didas">(Des laquais donnent des sièges.)</span> Mettez-vous là, ma fille. <span class="didas">(À monsieur Diafoirus.)</span> Vous voyez, monsieur, que tout le monde admire monsieur votre fils ; et je vous trouve bien heureux de vous voir un garçon comme cela. </p>
`);
const Malade_3a = new Texte(MaladeImaginaire, "Le Malade Imaginaire, Acte III, scène 18", scene, `<b>BÉLINE ; ARGAN, étendu dans sa chaise ; TOINETTE.</b>
    <p><b>Toinette, <span class="didas">feignant de ne pas voir Béline</span> : </b>
    Ah ! mon Dieu ! Ah ! malheur ! quel étrange accident !
    <br><b>Béline :</b> Qu’est-ce, Toinette ?
    <br><b>Toinette</b> Ah ! madame !
    <br><b>Béline :</b> Qu’y a-t-il ?
    <br><b>Toinette</b> Votre mari est mort.
    <br><b>Béline :</b> Mon mari est mort ?
    <br><b>Toinette</b> Hélas ! oui ! le pauvre défunt est trépassé.
    <br><b>Béline :</b> Assurément ?
    <br><b>Toinette</b> Assurément ; personne ne sait encore cet accident-là ; et je me suis trouvée ici toute seule. Il vient de passer entre mes bras. Tenez, le voilà tout de son long dans cette chaise.
    <br><b>Béline :</b> Le ciel en soit loué ! Me voilà délivrée d’un grand fardeau. Que tu es sotte, Toinette, de t’affliger de cette mort !
    <br><b>Toinette</b> Je pensais, madame, qu’il fallût pleurer.
    <br><b>Béline :</b> Va, va, cela n’en vaut pas la peine. Quelle perte est-ce que la sienne ? et de quoi servait-il sur la terre ? Un homme incommode à tout le monde, malpropre, dégoûtant, sans cesse un lavement ou une médecine dans le ventre, mouchant, toussant, crachant toujours ; sans esprit, ennuyeux, de mauvaise humeur, fatiguant sans cesse les gens, et grondant jour et nuit servantes et valets.
    <br><b>Toinette</b> Voilà une belle oraison funèbre !
    <br><b>Béline :</b> Il faut, Toinette, que tu m’aides à exécuter mon dessein ; et tu peux croire qu’en me servant, ta récompense est sûre. Puisque, par un bonheur, personne n’est encore averti de la chose, portons-le dans son lit, et tenons cette mort cachée, jusqu’à ce que j’aie fait mon affaire. Il y a des papiers, il y a de l’argent, dont je veux me saisir ; et il n’est pas juste que j’aie passé sans fruit auprès de lui mes plus belles années. Viens, Toinette ; prenons auparavant toutes ses clefs.
    <br><b>Argan, <span class="didas">se levant brusquement</span> :</b> Doucement.
    <br><b>Béline :</b> Ahi !
    <br><b>Argan :</b> Oui, madame ma femme, c’est ainsi que vous m’aimez ?
    <br><b>Toinette</b> Ah ! ah ! le défunt n’est pas mort.
    <br><b>Argan, <span class="didas">à Béline, qui sort</span> :</b> Je suis bien aise de voir votre amitié, et d’avoir entendu le beau panégyrique que vous avez fait de moi. Voilà un avis au lecteur, qui me rendra sage à l’avenir, et qui m’empêchera de faire bien des choses. 
`);
const Malade_3b = new Texte(MaladeImaginaire, "Le Malade Imaginaire, Acte III, scènes 22 et 23 ", epilogue, `    <b>ARGAN, BÉRALDE, ANGÉLIQUE, CLÉANTE, TOINETTE.</b>
    <p><b>Angélique : </b>Ah ! quelle surprise agréable ! Mon père, puisque, par un bonheur extrême, le ciel vous redonne à mes vœux, souffrez qu’ici je me jette à vos pieds, pour vous supplier d’une chose. Si vous n’êtes pas favorable au penchant de mon cœur, si vous me refusez Cléante pour époux, je vous conjure au moins de ne me point forcer d’en épouser un autre. C’est toute la grace que je vous demande.
    <br><b>Cléante, <span class="didas">se jetant aux genoux d’Argan</span> : </b> Hé ! monsieur, laissez-vous toucher à ses prières et aux miennes ; et ne vous montrez point contraire aux mutuels empressements d’une si belle inclination.
    <br><b>Béralde : </b>Mon frère, pouvez-vous tenir là contre ?
    <br><b>Toinette : </b>Monsieur, serez-vous insensible à tant d’amour ?
    <br><b>Argan : </b>Qu’il se fasse médecin, je consens au mariage. <span class="didas">(À Cléante.)</span> Oui, faites-vous médecin, je vous donne ma fille.
    <br><b>Cléante : </b>Très volontiers, monsieur. S’il ne tient qu’à cela pour être votre gendre, je me ferai médecin, apothicaire même, si vous voulez. Ce n’est pas une affaire que cela, et je ferais bien d’autres choses pour obtenir la belle Angélique.
    <br><b>Béralde : </b>Mais, mon frère, il me vient une pensée. Faites-vous médecin vous-même. La commodité sera encore plus grande, d’avoir en vous tout ce qu’il vous faut.
    <br><b>Toinette : </b>Cela est vrai. Voilà le vrai moyen de vous guérir bientôt ; et il n’y a point de maladie si osée que de se jouer à la personne d’un médecin.
    <br><b>Argan : </b>Je pense, mon frère, que vous vous moquez de moi. Est-ce que je suis en âge d’étudier ?
    <br><b>Béralde : </b>Bon, étudier ! Vous êtes assez savant ; et il y en a beaucoup parmi eux qui ne sont pas plus habiles que vous.
    <br><b>Argan : </b>Mais il faut savoir bien parler latin, connaître les maladies, et les remèdes qu’il y faut faire.
    <br><b>Béralde : </b>En recevant la robe et le bonnet de médecin, vous apprendrez tout cela ; et vous serez après plus habile que vous ne voudrez.
    <br><b>Argan : </b>Quoi ! l’on sait discourir sur les maladies quand on a cet habit-là ?
    <br><b>Béralde : </b>Oui. L’on n’a qu’à parler avec une robe et un bonnet, tout galimatias devient savant, et toute sottise devient raison.
    <br><b>Toinette : </b>Tenez, monsieur, quand il n’y aurait que votre barbe, c’est déjà beaucoup ; et la barbe fait plus de la moitié d’un médecin.
    <br><b>Cléante : </b>En tout cas, je suis prêt à tout.
    <br><b>Béralde, <span class="didas">à Argan</span> : </b>Voulez-vous que l’affaire se fasse tout à l’heure ?
    <br><b>Argan : </b>Comment, tout à l’heure ?
    <br><b>Béralde : </b>Oui, et dans votre maison.
    <br><b>Argan : </b>Dans ma maison ?
    <br><b>Béralde : </b>Oui. Je connais une Faculté de mes amies, qui viendra tout à l’heure en faire la cérémonie dans votre salle. Cela ne vous coûtera rien.
    <br><b>Argan : </b>Mais moi, que dire ? que répondre ?
    <br><b>Béralde : </b>On vous instruira en deux mots, et l’on vous donnera par écrit ce que vous devez dire. Allez-vous-en vous mettre en habit décent. Je vais les envoyer querir.
    <br><b>Argan : </b>Allons, voyons cela.
        
    <p>Scène XXIII</p>
    <p>BÉRALDE, ANGÉLIQUE, CLÉANTE, TOINETTE.</p>
    <b>Cléante : </b>Que voulez-vous dire ? et qu’entendez-vous avec cette Faculté de vos amies ?
    <br><b>Toinette : </b>Quel est votre dessein ?
    <br><b>Béralde : </b>De vous divertir un peu ce soir. Les comédiens ont fait un petit intermède de la réception d’un médecin, avec des danses et de la musique ; je veux que nous en prenions ensemble le divertissement, et que mon frère y fasse le premier personnage.
    <br><b>Angélique : </b>Mais, mon oncle, il me semble que vous vous jouez un peu beaucoup de mon père.
    <br><b>Béralde : </b>Mais, ma nièce, ce n’est pas tant le jouer, que s’accommoder à ses fantaisies. Tout ceci n’est qu’entre nous. Nous y pouvons aussi prendre chacun un personnage, et nous donner ainsi la comédie les uns aux autres. Le carnaval autorise cela. Allons vite préparer toutes choses.
    <br><b>Cléante, <span class="didas">à Angélique</span> : </b>Y consentez-vous ?
    <br><b>Angélique : </b>Oui, puisque mon oncle nous conduit.
`);
const Caracteres = new Oeuvre("Les Caractères", LaBruyere, XVIIeme, essai, new Date(1688, 0, 1), "");
const Caractere_1 = new Texte(Caracteres, "Les Caractères, Ménalque", essai, `<pre>¶Ménalque descend son escalier, ouvre sa porte pour sortir, il la referme: il s’aperçoit 
    qu’il est en bonnet de nuit; et venant à mieux s’examiner, il se trouve rasé à moitié, il 
    voit que son épée est mise du côté droit, que ses bas sont rabattus sur ses talons, et que
    sa chemise est par-dessus ses chausses. S’il marche dans les places, il se sent tout d’un 
5   coup rudement frapper à l’estomac ou au visage; il ne soupçonne point ce que ce peut être, 
    jusqu’à ce qu’ouvrant les yeux et se réveillant, il se trouve ou devant un limon de char-
    rette, ou derrière un long ais de menuiserie que porte un ouvrier sur ses épaules. On l’a
    vu une fois heurter du front contre celui d’un aveugle, s’embarrasser dans ses jambes, et 
    tomber avec lui chacun de son côté à la renverse. Il lui est arrivé plusieurs fois de se 
10  trouver tête pour tête à la rencontre d’un prince et sur son passage, se reconnaître à 
    peine, et n’avoir que le loisir de se coller à un mur pour lui faire place. Il cherche, 
    il brouille, il crie, il s’échauffe, il appelle ses valets l’un après l’autre: on lui perd 
    tout, on lui égare tout; il demande ses gants, qu’il a dans ses mains, semblable à cette 
    femme qui prenait le temps de demander son masque lorsqu’elle l’avait sur son visage. 
15  Il entre à l’appartement, et passe sous un lustre où sa perruque s’accroche et demeure 
    suspendue: tous les courtisans regardent et rient; Ménalque regarde aussi et rit plus haut
    que les autres, il cherche des yeux dans toute l’assemblée où est celui qui montre ses 
    oreilles, et à qui il manque une perruque. S’il va par la ville, après avoir fait quelque 
    chemin, il se croit égaré, il s’émeut, et il demande où il est à des passants, qui lui 
20  disent précisément le nom de sa rue; il entre ensuite dans sa maison, d’où il sort 
    précipitamment, croyant qu’il s’est trompé. Il descend du Palais, et trouvant au bas du 
    grand degré un carrosse qu’il prend pour le sien, il se met dedans: le cocher touche et 
    croit remener son maître dans sa maison; Ménalque se jette hors de la portière, traverse 
    la cour, monte l’escalier, parcourt l’antichambre, la chambre, le cabinet; tout lui est 
25  familier, rien ne lui est nouveau; il s’assied, il se repose, il est chez soi. Le maître 
    arrive: celui-ci se lève pour le recevoir; il le traite fort civilement, le prie de s’as-
    seoir, et croit faire les honneurs de sa chambre; il parle, il rêve, il reprend la parole:
    le maître de la maison s’ennuie, et demeure étonné; Ménalque ne l’est pas moins, et ne dit
    pas ce qu’il en pense: il a affaire à un fâcheux, à un homme oisif, qui se retirera à la
30  fin, il l’espère, et il prend patience: la nuit arrive qu’il est à peine détrompé. 
    Une autre fois il rend visite à une femme, et, se persuadant bientôt que c’est lui qui la 
    reçoit, il s’établit dans son fauteuil, et ne songe nullement à l’abandonner: il trouve 
    ensuite que cette dame fait ses visites longues, il attend à tous moments qu’elle se lève 
    et le laisse en liberté; mais comme cela tire en longueur, qu’il a faim, et que la nuit 
35  est déjà avancée, il la prie à souper: elle rit, et si haut, qu’elle le réveille. Lui-même 
    se marie le matin, l’oublie le soir, et découche la nuit de ses noces; et quelques années 
    après il perd sa femme, elle meurt entre ses bras, il assiste à ses obsèques, et le 
    lendemain, quand on lui vient dire qu’on a servi, il demande si sa femme est prête et si 
    elle est avertie.</pre>`);
const Caractere_2 = new Texte(Caracteres, "Les Caractères, Irène", conte_philosophique, `<pre>¶Irène se transporte à grands frais en Epidaure, voit Esculape dans son temple, et le 
    consulte sur tous ses maux, D’abord elle se plaint qu’elle est lasse et recrue de fatigue ;
    et le dieu prononce que cela lui arrive par la longueur du chemin qu’elle vient de faire. 
    Elle dit qu’elle est le soir sans appétit; l’oracle lui ordonne de dîner peu : elle ajoute 
5   qu’elle est sujette à des insomnies, et il lui prescrit de n’être au lit que pendant la 
    nuit : elle lui demande pourquoi elle devient pesante, et quel remède ; l’oracle répond 
    qu’elle doit se lever avant midi, et quelquefois se servir de ses jambes pour marcher : 
    elle lui déclare que le vin lui est nuisible ; l’oracle lui dit de boire de l’eau ; 
    qu’elle a des indigestions, et il ajoute qu’elle fasse diète. 
10  « Ma vue s’affaiblit, dit Irène. 
    — Prenez des lunettes, dit Esculape. 
    — Je m’affaiblis moi-même, continue-t-elle, et je ne suis ni si forte ni si saine que j’ai
    été. 
    — C’est, dit le dieu, que vous vieillissez. 
15  — Mais quel moyen de guérir de cette langueur ? 
    — Le plus court, Irène, c’est de mourir, comme ont fait votre mère et votre aïeule. 
    — Fils d’Apollon, s’écrie Irène, quel conseil me donnez-vous ? Est-ce là toute cette 
    science que les hommes publient, et qui vous fait révérer de toute la terre ? Que 
    m’apprenez-vous de rare et de mystérieux ? Et ne savais-je pas tous ces remèdes que 
20  vous m’enseignez ? 
    — Que n’en usiez-vous donc, répond le dieu, sans venir me chercher de si loin, et 
    abréger vos jours par un long voyage ? »</pre>`);
const Caractere_3 = new Texte(Caracteres, "Les Caractères, Gnaphon", essai);
const Caractere_4 = new Texte(Caracteres, "Les Caractères, Les enfants", essai, `<pre>¶Les enfants sont hautains, dédaigneux, colères, envieux, curieux, intéressés, paresseux, 
    volages, timides, intempérants, menteurs, dissimulés ; ils rient et pleurent facilement ; 
    ils ont des joies immodérées et des afflictions amères sur de très petits sujets ; ils ne 
    veulent point souffrir de mal, et aiment à en faire : ils sont déjà des hommes.
5   ¶ Les enfants n’ont ni passé ni avenir, et, ce qui ne nous arrive guère, ils jouissent du 
    présent.
    ¶ Le caractère de l’enfance paraît unique ; les mœurs, dans cet âge, sont assez les mêmes, 
    et ce n’est qu’avec une curieuse attention qu’on en pénètre la différence ; elle augmente 
    avec la raison, parce qu’avec celle-ci croissent les passions et les vices, qui seuls 
10  rendent les hommes si dissemblables entre eux, et si contraires à eux-mêmes.  
¶ [...]
    ¶ Il n’y a nuls vices extérieurs et nuls défauts du corps qui ne soient aperçus par les 
    enfants : ils les saisissent d’une première vue, et ils savent les exprimer par des mots 
    convenables ; on ne nomme point plus heureusement : devenus hommes, il sont chargés à leur 
    tour de toutes les imperfections dont ils se sont moqués.
15  ¶ L’unique soin des enfants est de trouver l’endroit faible de leurs maîtres, comme de tous 
    ceux à qui ils sont soumis : dès qu’ils ont pu les entamer, ils gagnent le dessus, et pren-
    nent sur eux un ascendant qu’ils ne perdent plus. Ce qui nous fait déchoir une première 
    fois de cette supériorité à leur égard est toujours ce qui nous empêche de la recouvrer.
    ¶ La paresse, l’indolence et l’oisiveté, vices si naturels aux enfants, disparaissent dans 
20  leurs jeux, où ils sont vifs, appliqués, exacts, amoureux des règles et de la symétrie, 
    où ils ne se pardonnent nulle faute les uns aux autres, et recommencent eux-mêmes plusieurs
    fois une seule chose qu’ils ont manquée : présages certains qu’ils pourront un jour 
    négliger leurs devoirs, mais qu’ils n’oublieront rien pour leurs plaisirs.
    ¶ Aux enfants tout paraît grand, les cours, les jardins, les édifices, les meubles, 
25  les hommes, les animaux : aux hommes les choses du monde paraissent ainsi, et j’ose dire 
    par la même raison, parce qu’ils sont petits.</pre>`);
const Caractere_5 = new Texte(Caracteres, "Les Caractères, Les vieillards", essai, `<pre>¶Les haines sont si longues et si opiniâtrées, que le plus grand signe de mort dans un 
    homme malade, c’est la réconciliation.
    ¶L’on s’insinue auprès de tous les hommes, ou en les flattant dans les passions qui 
    occupent leur âme, ou en compatissant aux infirmités qui affligent leur corps. En cela seul 
5   consistent les soins que l’on peut leur rendre : de là vient que celui qui se porte bien et
    qui désire peu de choses est moins facile à gouverner.
    ¶La mollesse et la volupté naissent avec l’homme, et ne finissent qu’avec lui ; ni les 
    heureux ni les tristes événements ne l’en peuvent séparer : c’est pour lui ou le fruit 
    de la bonne fortune ou un dédommagement de la mauvaise.
10  ¶C’est une grande difformité dans la nature qu’un vieillard amoureux.
    ¶Peu de gens se souviennent d’avoir été jeunes, et combien il leur était difficile d’être 
    chastes et tempérants. La première chose qui arrive aux hommes après avoir renoncé aux 
    plaisirs, ou par bienséance, ou par lassitude, ou par régime, c’est de les condamner dans 
    les autres. Il entre dans cette conduite une sorte d’attachement pour les choses mêmes que 
15  l’on vient de quitter ; l’on aimerait qu’un bien qui n’est plus pour nous ne fût plus aussi 
    pour le reste du monde : c’est un sentiment de jalousie.
    ¶Ce n’est pas le besoin d’argent où les vieillards peuvent appréhender de tomber un jour 
    qui les rend avares, car il y en a de tels qui ont de si grands fonds qu’ils ne peuvent 
    guère avoir cette inquiétude ; et d’ailleurs comment pourraient-ils craindre de manquer 
20  dans leur caducité des commodités de la vie, puisqu’ils s’en privent eux-mêmes volontai-
    rement pour satisfaire à leur avarice ? Ce n’est point aussi l’envie de laisser de plus 
    grandes richesses à leurs enfants, car il n’est pas naturel d’aimer quelque autre chose 
    plus que soi-même, outre qu’il se trouve des avares qui n’ont point d’héritiers. 
    Ce vice est plutôt l’effet de l’âge et de la complexion des vieillards, qui s’y abandonnent
25  aussi naturellement qu’ils suivaient leurs plaisirs dans leur jeunesse, ou leur ambition 
    dans l’âge viril. Il ne faut ni vigueur, ni jeunesse, ni santé, pour être avare ; l’on n’a
    aussi nul besoin de s’empresser ou de se donner le moindre mouvement pour épargner ses 
    revenus, il faut laisser seulement son bien dans ses coffres, et se priver de tout. 
    Cela est commode aux vieillards, à qui il faut une passion parce qu’ils sont hommes.</pre>`);
const VoyageCentreTerre = new Oeuvre("Voyage au centre de la Terre", JulesVerne, XIXeme, science_fiction, new Date(1864, 10, 25), "");
const Voyage_1 = new Texte(VoyageCentreTerre, "Chapitre 1, Le savant", incipit, `<pre>
    Je m’élançai dans le cabinet de mon redoutable maître.
    Otto Lidenbrock n’était pas un méchant homme, j’en conviens volontiers ; mais, à moins de 
    changements improbables, il mourra dans la peau d’un terrible original.
    Il était professeur au Johannæum, et faisait un cours de minéralogie pendant lequel il se 
5   mettait ré gulièrement en colère une fois ou deux. Non point qu’il se préoccupât d’avoir 
    des élèves assidus à ses leçons, ni du degré d’attention qu’ils lui accordaient, ni du suc-
    cès qu’ils pouvaient obtenir par la suite ; ces détails ne l’inquiétaient guère. Il profes-
    sait « subjectivement », suivant une expression de la philosophie allemande, pour lui et 
    non pour les autres. C’était un savant égoïste, un puits de science dont la poulie grinçait 
10  quand on en voulait tirer quelque chose : en un mot, un avare.
    Il y a quelques professeurs de ce genre en Allemagne.    
    Mon oncle, malheureusement, ne jouissait pas d’une extrême facilité de prononciation, sinon
    dans l’intimité, au moins quand il parlait en public, et c’est un défaut regrettable chez
    un orateur. En effet, dans ses démonstrations au Johannæum, souvent le professeur s’arrê-
    tait court ; il luttait contre un mot récalcitrant qui ne voulait pas glisser entre ses 
15  lèvres, un de ces mots qui résistent, se gonflent et finissent par sortir sous la forme 
    peu scientifique d’un juron. De là, grande colère.    
    Or, il y a en minéralogie bien des dénominations semi-grecques, semi-latines, difficiles à
    prononcer, de ces rudes appellations qui écorcheraient les lèvres d’un poète. Je ne veux 
    pas dire du mal de cette science. Loin de moi. Mais lorsqu’on se trouve en présence des 
20  cristallisations rhomboédriques, des résines rétinasphaltes, des ghélénites, des fangasites, 
    des molybdates de plomb, des tungstates de manganèse et des titaniates de zircône, il est 
    permis à la langue la plus adroite de fourcher.    
    Donc, dans la ville, on connaissait cette pardonnable infirmité de mon oncle, et on en 
    abusait, et on l’attendait aux passages dangereux, et il se mettait en fureur, et l’on 
    riait, ce qui n’est pas de bon goût, même pour des Allemands. Et s’il y avait toujours 
25  grande affluence d’auditeurs aux cours de Lidenbrock, combien les suivaient assidûment 
    qui venaient surtout pour se dérider aux belles colères du professeur !    
    Quoi qu’il en soit, mon oncle, je ne saurais trop le dire, était un véritable savant. 
    Bien qu’il cassât parfois ses échantillons à les essayer trop brusquement, il joignait 
    au génie du géologue l’œil du minéralogiste. Avec son marteau, sa pointe d’acier, son 
30  aiguille aimantée, son chalumeau et son flacon d’acide nitrique, c’était un homme très
    fort. À la cassure, à l’aspect, à la dureté, à la fusibilité, au son, à l’odeur, au goût
    d’un minéral quelconque, il le classait sans hésiter parmi les six cents espèces que la 
    science compte aujourd’hui.    
    Aussi le nom de Lidenbrock retentissait avec honneur dans les gymnases et les associa-
35  tions nationales. MM. Humphry Davy, de Humboldt, les capitaines Franklin et Sabine, 
    ne manquèrent pas de lui rendre visite à leur passage à Hambourg. MM. Becquerel, Ebelmen, 
    Brewster, Dumas, Milne-Edwards, Sainte-Claire-Deville, aimaient à le consulter sur des 
    questions les plus palpitantes de la chimie. Cette science lui devait d’assez belles 
    découvertes, et, en 1853, il avait paru à Leipzig un Traité de Cristallographie trans-
40  cendante, par le professeur Otto Lidenbrock, grand in-folio avec planches, qui cependant 
    ne fit pas ses frais.    
    Ajoutez à cela que mon oncle était conservateur du musée minéralogique de M. Struve, 
    ambassadeur de Russie, précieuse collection d’une renommée européenne. 
    </pre>`);
const Voyage_2 = new Texte(VoyageCentreTerre, "Chapitre 7, L'élève", chapitre, `<pre>
    Je sortis de ma chambre. Je pensai que mon air défait, ma pâleur, mes yeux rougis par 
    l’insomnie, allaient produire leur effet sur Graüben et changer ses idées.
    « Ah ! mon cher Axel, me dit-elle, je vois que tu te portes mieux et que la nuit t’a calmé.    
    — Calmé ! » m’écriai-je.
5   Je me précipitai vers mon miroir. Eh bien ! j’avais moins mauvaise mine que je ne le suppo-
    sais. C’était à n’y pas croire.
    « Axel, me dit Graüben, j’ai longtemps causé avec mon tuteur. C’est un hardi savant, un 
    homme de grand courage, et tu te souviendras que son sang coule dans tes veines. 
    Il m’a raconté ses projets, ses espérances, pourquoi et comment il espère atteindre son but. 
10  Il y parviendra, je n’en doute pas. Ah ! cher Axel, c’est beau de se dévouer ainsi à la 
    science ! Quelle gloire attend M. Lidenbrock et rejaillira sur son compagnon ! Au retour, 
    Axel, tu seras un homme, son égal, libre de parler, libre d’agir, libre enfin de… »        
    La jeune fille, rougissante, n’acheva pas. Ses paroles me ranimaient. Cependant je ne 
    voulais pas croire encore à notre départ. J’entraînai Graüben vers le cabinet du professeur.
15  « Mon oncle, dis-je, il est donc bien décidé que nous partons ?
    — Comment ! tu en doutes ?
    — Non, dis-je afin de ne pas le contrarier. Seulement je vous demanderai ce qui nous presse.
    — Mais le temps ! le temps qui fuit avec une vitesse irréparable !
    — Cependant nous ne sommes qu’au 26 mai, et jusqu’à la fin de juin…
20  — Eh ! crois-tu donc, ignorant, qu’on se rende si facilement en Islande ? Si tu ne m’avais 
    pas quitté comme un fou, je t’aurais emmené au bureau-office de Copenhague, chez Liffender 
    et Co. Là, tu aurais vu que de Copenhague à Reykjawik il n’y a qu’un service, le 22 de cha-
    que mois.
    — Eh bien ?
25  — Eh bien ! si nous attendions au 22 juin, nous arriverions trop tard pour voir l’ombre du 
    Scartaris caresser le cratère du Sneffels ! Il faut donc gagner Copenhague au plus vite 
    pour y chercher un moyen de transport. Va faire ta malle ! »
    Il n’y avait pas un mot à répondre. Je remontai dans ma chambre. Graüben me suivit. Ce fut 
    elle qui se chargea de mettre en ordre, dans une petite valise, les objets nécessaires à mon
30  voyage. Elle n’était pas plus émue que s’il se fût agi d’une promenade à Lubeck ou à 
    Helgoland. Ses  petites mains allaient et venaient sans précipitation. Elle causait avec 
    calme. Elle me donnait les raisons les plus sensées en faveur de notre expédition. Elle 
    m’enchantait, et je me sentais une grosse colère contre elle. Quelquefois je voulais 
    m’emporter, mais elle n’y prenait garde et continuait méthodiquement sa tranquille besogne.
35  Enfin la dernière courroie de la valise fut bouclée. Je descendis au rez-de-chaussée.
    Pendant cette journée, les fournisseurs d’instruments de physique, d’armes, d’appareils 
    électriques, s’étaient multipliés. La bonne Marthe en perdait la tête.
    « Est-ce que monsieur est fou ? » me dit-elle.
    Je fis un signe affirmatif.
40  « Et il vous emmène avec lui ? »
    Même affirmation.
    « Où cela ? » dit-elle.
    J’indiquai du doigt le centre de la terre.
    « À la cave ? s’écria la vieille servante.
45  — Non, dis-je enfin, plus bas ! »
    Le soir arriva. Je n’avais plus conscience du temps écoulé.
    </pre>`);
const Voyage_3 = new Texte(VoyageCentreTerre, "Chapitre 11, Le guide", chapitre, `<pre>
    Le soir, je fis une courte promenade sur les rivages de Reykjawik, et je revins de bonne 
    heure me coucher dans mon lit de grosses planches, où je dormis d’un profond sommeil.
    Quand je me réveillai, j’entendis mon oncle parler abondamment dans la salle voisine. 
    Je me levai aussitôt et je me hâtai d’aller le rejoindre.
5       Il causait en danois avec un homme de haute taille, vigoureusement découplé. Ce grand 
    gaillard devait être d’une force peu commune. Ses yeux, percés dans une tête très grosse 
    et assez naïve, me parurent intelligents. Ils étaient d’un bleu rêveur. De longs cheveux, 
    qui eussent passé pour roux, même en Angleterre, tombaient sur ses athlétiques épaules. 
    Cet indigène avait les mouvements souples, mais il remuait peu les bras, en homme qui igno-
10  rait ou dédaignait la langue des gestes. Tout en lui révélait un tempérament d’un calme 
    parfait, non pas indolent, mais tranquille. On sentait qu’il ne demandait rien à personne, 
    qu’il travaillait à sa convenance, et que, dans ce monde, sa philosophie ne pouvait être 
    ni étonnée ni troublée.
    Je surpris les nuances de ce caractère, à la manière dont l’Islandais écouta le verbia-
15  ge passionné de son interlocuteur. Il demeurait les bras croisés, immobile au milieu des 
    gestes multipliés de mon oncle ; pour nier, sa tête tournait de gauche à droite ; elle 
    s’inclinait pour affirmer, et cela si peu, que ses longs cheveux bougeaient à peine. 
    C’était l’économie du mouvement poussée jusqu’à l’avarice. Certes, à voir cet homme, je 
    n’aurais jamais deviné sa profession de chasseur ; celui-là ne devait pas effrayer le 
20  gibier, à coup sûr, mais comment pouvait-il l’atteindre ?
    Tout s’expliqua quand M. Fridriksson m’apprit que ce tranquille personnage n’était 
    qu’un « chasseur d’eider », oiseau dont le duvet constitue la plus grande richesse de l’île. 
    En effet, ce duvet s’appelle l’édredon, et il ne faut pas une grande dépense de mouvement 
    pour le recueillir.[...]
25      Ce personnage grave, flegmatique et silencieux, se nommait Hans Bjelke ; il venait à la 
    recommandation de M. Fridriksson. C’était notre futur guide. Ses manières contrastaient 
    singulièrement avec celles de mon oncle.  
    Cependant ils s’entendirent facilement. Ni l’un ni l’autre ne regardaient au prix ; 
    l’un prêt à accepter ce qu’on lui offrait, l’autre prêt à donner ce qui lui serait demandé. 
30  Jamais marché ne fut plus facile à conclure.
    Or, des conventions il résulta que Hans s’engageait à nous conduire au village de Stapi, 
    situé sur la côte méridionale de la presqu’île du Sneffels, au pied même du volcan. Il 
    fallait compter par terre vingt-deux milles environ, voyage à faire en deux jours, suivant 
    l’opinion de mon oncle.
35      Mais quand il apprit qu’il s’agissait de milles danois de vingt-quatre mille pieds, 
    il dut rabattre de son calcul et compter, vu l’insuffisance des chemins, sur sept ou huit 
    jours de marche.
        Quatre chevaux devaient être mis à sa disposition, deux pour le porter, lui et moi, 
    deux autres destinés à nos bagages. Hans, suivant son habitude, irait à pied. Il connais-
40  sait parfaitement cette partie de la côte, et il promit de prendre par le plus court.
    Son engagement avec mon oncle n’expirait pas à notre arrivée à Stapi ; il demeurait à son 
    service pendant tout le temps nécessaire à ses excursions scientifiques, au prix de trois 
    rixdales par semaine. Seulement, il fut expressément convenu que cette somme serait comptée
    au guide chaque samedi soir, condition sine qua non de son engagement.
45      Le départ fut fixé au 16 juin. Mon oncle voulut remettre au chasseur les arrhes du 
    marché, mais celui-ci refusa d’un mot.    
    « Efter, fit-il.    
    — Après, » me dit le professeur pour mon édification.
    Hans, le traité conclu, se retira tout d’une pièce.
50  « Un fameux homme ! s’écria mon oncle ; mais il ne s’attend guère au merveilleux rôle 
    que l’avenir lui réserve de jouer.
    — Il nous accompagne donc jusqu’au…    
    — Oui, Axel, jusqu’au centre de la terre. »
    </pre>`);
const Voyage_4 = new Texte(VoyageCentreTerre, "Chapitre 13, L'Hospitalité", chapitre, `<pre>
    Il aurait dû faire nuit, mais sous le soixante-cinquième parallèle, la clarté noctur-
    ne des régions polaires ne devait pas m’étonner ; en Islande, pendant les mois de juin et
    juillet, le soleil ne se couche pas.
    Néanmoins la température s’était abaissée. J’avais froid et surtout faim. Bienvenu fut
5   le « boër » qui s’ouvrit hospitalièrement pour nous recevoir.
    C’était la maison d’un paysan, mais, en fait d’hospitalité, elle valait celle d’un roi. 
    À notre arrivée, le maître vint nous tendre la main, et, sans plus de cérémonie, il nous 
    fit signe de le suivre.
    Le suivre en effet, car l’accompagner eût été impossible. Un passage long, étroit, 
10  obscur, donnait accès dans cette habitation construite en poutres à peine équarries et 
    permettait d’arriver à chacune des chambres ; celles-ci étaient au nombre de quatre : la 
    cuisine, l’atelier de tissage, la « badstofa », chambre à coucher de la famille, et, la 
    meilleure entre toutes, la chambre des étrangers. Mon oncle, à la taille duquel on n’avait 
    pas songé en bâtissant la maison, ne manqua pas de donner trois ou quatre fois de la tête 
15  contre les saillies du plafond.
    On nous introduisit dans notre chambre, sorte de grande salle avec un sol de terre 
    battue et éclairée d’une fenêtre dont les vitres étaient faites de membranes de mouton 
    assez peu transparentes. La literie se composait de fourrage sec jeté dans deux cadres 
    de bois peints en rouge et ornés de sentences islandaises. Je ne m’attendais pas à ce 
20  confortable ; seulement il régnait dans cette maison une forte odeur de poisson sec, de 
    viande macérée et de lait aigre dont mon odorat se trouvait assez mal.
    Lorsque nous eûmes mis de côté notre harnachement de voyageurs, la voix de l’hôte 
    se fit entendre, qui nous conviait à passer dans la cuisine, seule pièce où l’on fit du 
    feu, même par les plus grands froids.
25      Mon oncle se hâta d’obéir à cette amicale injonction. Je le suivis.
    La cheminée de la cuisine était d’un modèle antique ; au milieu de la chambre, 
    une pierre pour tout foyer ; au toit, un trou par lequel s’échappait la fumée. Cette 
    cuisine servait aussi de salle à manger.
    À notre entrée, l’hôte, comme s’il ne nous avait pas encore vus, nous salua du mot 
30  « sællvertu », qui signifie « soyez heureux », et il vint nous baiser sur la joue.
    Sa femme, après lui, prononça les mêmes paroles, accompagnées du même cérémonial ; 
    puis les deux époux, plaçant la main droite sur leur cœur, s’inclinèrent profondément.
    Je me hâte de dire que l’Islandaise était mère de dix-neuf enfants, tous, grands et 
    petits, grouillant pêle-mêle au milieu des volutes de fumée dont le foyer remplissait 
35  la chambre. À chaque instant j’apercevais une petite tête blonde et un peu mélancolique 
    sortir de ce brouillard. On eût dit une guirlande d’anges insuffisamment débarbouillés. 
    Mon oncle et moi, nous fîmes très bon accueil à cette « couvée » ; bientôt il y eut 
    trois ou quatre de ces marmots sur nos épaules, autant sur nos genoux et le reste entre 
    nos jambes. Ceux qui parlaient répétaient « sællvertu » dans tous les tons imaginables. 
40  Ceux qui ne parlaient pas n’en criaient que mieux.
    Ce concert fut interrompu par l’annonce du repas. En ce moment rentra le chasseur, 
    qui venait de pourvoir à la nourriture des chevaux, c’est-à-dire qu’il les avait écono-
    miquement lâchés à travers champs ; les pauvres bêtes devaient se contenter de brouter 
    la mousse rare des rochers, quelques fucus peu nourrissants, et le lendemain elles ne 
45  manqueraient pas de venir d’elles-mêmes reprendre le travail de la veille.
    « Sællvertu, » fit Hans.
    Puis tranquillement, automatiquement, sans qu’un baiser fût plus accentué que l’autre, 
    il embrassa l’hôte, l’hôtesse et leurs dix-neuf enfants.
    La cérémonie terminée, on se mit à table, au nombre de vingt-quatre, et par conséquent 
50  les uns sur les autres, dans le véritable sens de l’expression. Les plus favorisés  
    n’avaient que deux marmots sur les genoux.
    Cependant, le silence se fit dans ce petit monde à l’arrivée de la soupe, et la 
    taciturnité naturelle, même aux gamins islandais, reprit son empire. L’hôte nous servit 
    une soupe au lichen et point désagréable, puis une énorme portion de poisson sec nageant 
    dans du beurre aigri depuis vingt ans, et par conséquent bien préférable au beurre frais, 
55  d’après les idées gastronomiques de l’Islande. Il y avait avec cela du « skyr », sorte de
    lait caillé, accompagné de biscuit et relevé par du jus de baies de genièvre ; enfin, pour 
    boisson, du petit lait mêlé d’eau, nommé « blanda » dans le pays. Si cette singulière 
    nourriture était bonne ou non, c’est ce dont je ne pus juger. J’avais faim, et, au dessert, 
    j’avalai jusqu’à la dernière bouchée une épaisse bouillie de sarrasin.
60      Le repas terminé, les enfants disparurent ; les grandes personnes entourèrent le foyer 
    où brûlaient de la tourbe, des bruyères, du fumier de vache et des os de poissons desséchés. 
    Puis, après cette « prise de chaleur », les divers groupes regagnèrent leurs chambres 
    respectives. L’hôtesse offrit de nous retirer, suivant la coutume, nos bas et nos 
    pantalons ; mais, sur un refus des plus gracieux de notre part, elle n’insista pas, et je
65  pus enfin me blottir dans ma couche de fourrage.
    Le lendemain, à cinq heures, nous faisions nos adieux au paysan islandais ; mon oncle 
    eut beaucoup de peine à lui faire accepter une rémunération convenable, et Hans donna le 
    signal du départ. 
    </pre>`);
const Voyage_5 = new Texte(VoyageCentreTerre, "Chapitre 28, La folie", chapitre, `<pre>
    Quand je me vis ainsi en dehors de tout secours humain, incapable de rien tenter pour 
    mon salut, je songeai aux secours du ciel. Les souvenirs de mon enfance, ceux de ma mère 
    que je n’avais connue qu’au temps des baisers, revinrent à ma mémoire. Je recourus à la 
    prière, quelque peu de droits que j’eusse d’être entendu du Dieu auquel je m’adressais si 
5   tard, et je l’implorai avec ferveur.
    Je songeai aux secours du ciel.        
    Ce retour vers la Providence me rendit un peu de calme, et je pus concentrer sur ma 
    situation toutes les forces de mon intelligence.        
    J’avais pour trois jours de vivres, et ma gourde était pleine. Cependant je ne pouvais
10  rester seul plus longtemps. Mais fallait-il monter ou descendre ?        
    Monter évidemment ! monter toujours !        
    Je devais arriver ainsi au point où j’avais abandonné la source, à la funeste bifur-
    cation. 
    Là, une fois le ruisseau sous les pieds, je pourrais toujours regagner le sommet du Sneffels.        
15      Comment n’y avais-je pas songé plus tôt ! Il y avait évidemment là une chance de salut. 
    Le plus pressé était donc de retrouver le cours du Hans-bach.        
    Je me levai et, m’appuyant sur mon bâton ferré, je remontai la galerie. La pente en 
    était assez roide. Je marchais avec espoir et sans embarras, comme un homme qui n’a pas 
    de choix du chemin à suivre.        
20      Pendant une demi-heure, aucun obstacle n’arrêta mes pas. J’essayais de reconnaître ma 
    route à la forme du tunnel, à la saillie de certaines roches, à la disposition des 
    anfractuosités. 
    Mais aucun signe particulier ne frappait mon esprit, et je reconnus bientôt que cette 
    galerie ne pouvait me ramener à la bifurcation. Elle était sans issue. Je me heurtai contre
25  un mur impénétrable, et je tombai sur le roc.        
    De quelle épouvante, de quel désespoir je fus saisi alors, je ne saurais le dire. Je 
    demeurai anéanti. Ma dernière espérance venait de se briser contre cette muraille de granit.
    Perdu dans ce labyrinthe dont les sinuosités se croisaient en tous sens, je n’avais plus
    à tenter une fuite impossible. Il fallait mourir de la plus effroyable des morts ! Et, chose 
30  étrange, il me vint à la pensée que, si mon corps fossilisé se retrouvait un jour, sa ren-
    contre à trente lieues dans les entrailles de la terre soulèverait de graves questions 
    scientifiques ! Je voulus parler à voix haute, mais de rauques accents passèrent seuls entre 
    mes lèvres desséchées. Je haletais.        
    Au milieu de ces angoisses, une nouvelle terreur vint s’emparer de mon esprit. Ma lampe 
35  s’était faussée en tombant. Je n’avais aucun moyen de la réparer. Sa lumière pâlissait et 
    allait me manquer !        
    Je regardai le courant lumineux s’amoindrir dans le serpentin de l’appareil. Une 
    procession d’ombres mouvantes se déroula sur les parois assombries. Je n’osais plus abaisser 
    ma paupière, craignant de perdre le moindre atome de cette clarté fugitive ! À chaque 
40  instant il me semblait qu’elle allait s’évanouir et que « le noir » m’envahissait.        
    Enfin une dernière lueur trembla dans la lampe. Je la suivis, je l’aspirai du regard, 
    je concentrai sur elle toute la puissance de mes yeux, comme sur la dernière sensation de 
    lumière qu’il leur fût donné d’éprouver, et je demeurai plongé dans les ténèbres immenses.        
    Quel cri terrible m’échappa ! Sur terre, au milieu des plus profondes nuits, la lumière 
45  n’abandonne jamais entièrement ses droits ! Elle est diffuse, elle est subtile ; mais, si 
    peu qu’il en reste, la rétine de l’œil finit par la percevoir ! Ici, rien. L’ombre absolue 
    faisait de moi un aveugle dans toute l’acception du mot.        
    Alors ma tête se perdit. Je me relevai les bras en avant, essayant les tâtonnements les 
    plus douloureux. Je me pris à fuir, précipitant mes pas au hasard dans cet inextricable 
50  labyrinthe, descendant toujours, courant à travers la croûte terrestre, comme un habitant 
    des failles souterraines, appelant, criant, hurlant, bientôt meurtri aux saillies des rocs, 
    tombant et me relevant ensanglanté, cherchant à boire ce sang qui m’inondait le visage, et
    attendant toujours que quelque muraille imprévue vînt offrir à ma tête un obstacle pour s’y
    briser !        
55      Où me conduisit cette course insensée ? Je l’ignorerai toujours. Après plusieurs heures, 
    sans doute à bout de forces, je tombai comme une masse inerte le long de la paroi, et je 
    perdis tout sentiment d’existence ! 
    </pre>`);
const Voyage_6 = new Texte(VoyageCentreTerre, "Chapitre 30, La forêt", chapitre, `<pre>
    Toutes ces merveilles, je les contemplais en silence. Les paroles me manquaient pour 
    rendre mes sensations. Je croyais assister, dans quelque planète lointaine, Uranus ou 
    Neptune, à des phénomènes dont ma nature « terrestrielle » n’avait pas conscience. À des 
    sensations nouvelles, il fallait des mots nouveaux, et mon imagination ne me les fournis-
5   sait pas. Je regardais, je pensais, j’admirais avec une stupéfaction mêlée d’une certaine 
    quantité d’effroi.
        L’imprévu de ce spectacle avait rappelé sur mon visage les couleurs de la santé ; 
    j’étais en train de me traiter par l’étonnement et d’opérer ma guérison au moyen de cette 
    nouvelle thérapeutique ; d’ailleurs, la vivacité d’un air très dense me ranimait, en four-
10  nissant plus d’oxygène à mes poumons.
        On concevra sans peine qu’après un emprisonnement de quarante-sept jours dans une étroi-
    te galerie, c’était une jouissance infinie que d’aspirer cette brise chargée d’humides 
    émanations salines. Aussi n’eus-je point à me repentir d’avoir quitté ma grotte obscure. 
    Mon oncle, déjà fait à ces merveilles, ne s’étonnait plus.
15  « Te sens-tu la force de te promener un peu ? me demanda-t-il.
    — Oui, certes, répondis-je, et rien ne me sera plus agréable.
    — Eh bien, prends mon bras, Axel, et suivons les sinuosités du rivage. »
    J’acceptai avec empressement, et nous commençâmes à côtoyer cet océan nouveau. Sur la 
    gauche, des rochers abrupts, grimpés les uns sur les autres, formaient un entassement 
20  titanesque d’un prodigieux effet. Sur leurs flancs se déroulaient d’innombrables cascades, 
    qui s’en allaient en nappes limpides et retentissantes. Quelques légères vapeurs, sautant 
    d’un roc à l’autre, marquaient la place des sources chaudes, et des ruisseaux coulaient 
    doucement vers le bassin commun, en cherchant dans les pentes l’occasion de murmurer plus 
    agréablement.
25  Parmi ces ruisseaux je reconnus notre fidèle compagnon de route, le Hans-bach, qui venait 
    se perdre tranquillement dans la mer, comme s’il n’eût jamais fait autre chose depuis le 
    commencement du monde.
    « Il nous manquera désormais, dis-je avec un soupir.
    — Bah ! répondit le professeur, lui ou un autre, qu’importe ! »
30  Je trouvai la réponse un peu ingrate.
    Mais en ce moment mon attention fut attirée par un spectacle inattendu. À cinq cents pas, 
    au détour d’un haut promontoire, une forêt haute, touffue, épaisse, apparut à nos yeux. 
    Elle était faite d’arbres de moyenne grandeur, taillés en parasols réguliers, à contours 
    nets et géométriques ; les courants de l’atmosphère ne semblaient pas avoir prise sur leur
35  feuillage, et, au milieu des souffles, ils demeuraient immobiles comme un massif de cèdres 
    pétrifiés.
    Je hâtais le pas. Je ne pouvais mettre un nom à ces essences singulières. Ne faisaient-
    elles point partie des deux cent mille espèces végétales connues jusqu’alors, et fallait-
    il leur accorder une place spéciale dans la flore des végétations lacustres ? Non. Quand 
40  nous arrivâmes sous leur ombrage, ma surprise ne fut plus que de l’admiration.
    En effet, je me trouvais en présence de produits de la terre, mais taillés sur un patron 
    gigantesque. Mon oncle les appela immédiatement de leur nom.
    « Ce n’est qu’une forêt de champignons, » dit-il.
    Et il ne se trompait pas. Que l’on juge du développement acquis par ces plantes chères 
45  aux milieux chauds et humides. Je savais que le « lycoperdon giganteum » atteint, suivant
    Bulliard, huit à neuf pieds de circonférence ; mais il s’agissait ici de champignons 
    blancs, hauts de trente à quarante pieds, avec une calotte d’un diamètre égal. Ils 
    étaient là par milliers. La lumière ne parvenait pas à percer leur épais ombrage, et une 
    obscurité complète régnait sous ces dômes juxtaposés comme les toits ronds d’une cité 
50  africaine.
        Cependant je voulus pénétrer plus avant. Un froid mortel descendait de ces voûtes 
    charnues. Pendant une demi-heure, nous errâmes dans ces humides ténèbres, et ce fut avec
    un véritable sentiment de bien-être que je retrouvai les bords de la mer.   
    </pre>`);
const Voyage_7 = new Texte(VoyageCentreTerre, "Chapitre 33, Les monstres", chapitre, `<pre>
    Mardi 18 août. — Le soir arrive, ou plutôt le moment où le sommeil alourdit nos paupières, 
    car la nuit manque à cet océan, et l’implacable lumière fatigue obstinément nos yeux, comme 
    si nous naviguions sous le soleil des mers arctiques. Hans est à la barre. Pendant son quart 
    je m’endors.        
5       Deux heures après, une secousse épouvantable me réveille. Le radeau a été soulevé hors 
    des flots avec une indescriptible puissance et rejeté à vingt toises de là.        
    « Qu’y a-t-il ? s’écrie mon oncle. Avons-nous touché ? »        
    Hans montre du doigt, à une distance de deux cents toises, une masse noirâtre qui s’élève 
    et s’abaisse tour à tour. Je regarde et je m’écrie :        
    « C’est un marsouin colossal !        
10  — Oui, réplique mon oncle, et voilà maintenant un lézard de mer d’une grosseur peu commune.
    — Et plus loin un crocodile monstrueux ! Voyez sa large mâchoire et les rangées de dents 
    dont elle est armée. Ah ! il disparaît !
    — Une baleine ! une baleine ! s’écrie alors le professeur. J’aperçois ses nageoires énormes ! 
    Vois l’air et l’eau qu’elle chasse par ses évents ! »        
15  En effet, deux colonnes liquides s’élèvent à une hauteur considérable au-dessus de la mer. 
    Nous restons surpris, stupéfaits, épouvantés, en présence de ce troupeau de monstres marins. 
    Ils ont des dimensions surnaturelles, et le moindre d’entre eux briserait le radeau d’un 
    coup de dent. Hans veut mettre la barre au vent, afin de fuir ce voisinage dangereux ; 
    mais il aperçoit sur l’autre bord d’autres ennemis non moins redoutables : une tortue large
20  de quarante pieds, et un serpent long de trente, qui darde sa tête énorme au-dessus des 
    flots.        
        Impossible de fuir. Ces reptiles s’approchent ; ils tournent autour du radeau avec une 
    rapidité que des convois lancés à grande vitesse ne sauraient égaler ; ils tracent autour 
    de lui des cercles concentriques. J’ai pris ma carabine. Mais quel effet peut produire une 
25  balle sur les écailles dont le corps de ces animaux est recouvert ?        
    Nous sommes muets d’effroi. Les voici qui s’approchent ! D’un côté le crocodile, de l’autre
    le serpent. Le reste du troupeau marin a disparu. Je vais faire feu. Hans m’arrête d’un 
    signe. Les deux monstres passent à cinquante toises du radeau, se précipitent l’un sur 
    l’autre, et leur fureur les empêche de nous apercevoir. Le combat s’engage à cent toises 
30  du radeau. Nous voyons distinctement les deux monstres aux prises.        
        Mais il me semble que maintenant les autres animaux viennent prendre part à la lutte, 
    le marsouin, la baleine, le lézard, la tortue. À chaque instant je les entrevois. Je les 
    montre à l’Islandais. Celui-ci remue la tête négativement.        
    « Tva », fait-il.        
35  — Quoi ! deux ? Il prétend que deux animaux seulement…
    — Il a raison, s’écrie mon oncle, dont la lunette n’a pas quitté les yeux.
    — Par exemple !
    — Oui ! le premier de ces monstres a le museau d’un marsouin, la tête d’un lézard, les 
    dents d’un crocodile, et voilà ce qui nous a trompés. C’est le plus redoutable des 
40  reptiles antédiluviens, l’ichthyosaurus !
    — Et l’autre ?
    — L’autre, c’est un serpent caché dans la carapace d’une tortue, le terrible ennemi du 
    premier, le plesiosaurus ! »
        Hans a dit vrai. Deux monstres seulement troublent ainsi la surface de la mer, et j’ai 
45  devant les yeux deux reptiles des océans primitifs. J’aperçois l’œil sanglant de 
    l’ichthyosaurus, gros comme la tête d’un homme. La nature l’a doué d’un appareil d’optique 
    d’une extrême puissance et capable de résister à la pression des couches d’eau dans les 
    profondeurs qu’il habite. On l’a justement nommé la baleine des sauriens, car il en a la 
    rapidité et la taille. Celui-ci ne mesure pas moins de cent pieds, et je peux juger de sa
50  grandeur quand il dresse au-dessus des flots les nageoires verticales de sa queue. Sa 
    mâchoire est énorme, et d’après les naturalistes, elle ne compte pas moins de cent quatre-
    vingt-deux dents. Le plesiosaurus, serpent à tronc cylindrique, à queue courte, a les 
    pattes disposées en forme de rame. Son corps est entièrement revêtu d’une carapace, et son
     cou, flexible comme celui du cygne, se dresse à trente pieds au-dessus des flots.        
55      Ces animaux s’attaquent avec une indescriptible furie. Ils soulèvent des montagnes 
    liquides qui refluent jusqu’au radeau. Vingt fois nous sommes sur le point de chavirer. 
    Des sifflements d’une prodigieuse intensité se font entendre. Les deux bêtes sont enlacées. 
    Je ne puis les distinguer l’une de l’autre. Il faut tout craindre de la rage du vainqueur.        
        Une heure, deux heures se passent. La lutte continue avec le même acharnement. 
60  Les combattants se rapprochent du radeau et s’en éloignent tour à tour. Nous restons 
    immobiles, prêts à faire feu.        
        Soudain l’ichthyosaurus et le plesiosaurus disparaissent en creusant un véritable 
    maëlstrom au sein des flots. Plusieurs minutes s’écoulent. Le combat va-t-il se terminer 
    dans les profondeurs de la mer ?        
65      Tout à coup une tête énorme s’élance au dehors, la tête du plesiosaurus. Le monstre 
    est blessé à mort. Je n’aperçois plus son immense carapace. Seulement son long cou se 
    dresse, s’abat, se relève, se recourbe, cingle les flots comme un fouet gigantesque et 
    se tord comme un ver coupé. L’eau rejaillit à une distance considérable. Elle nous 
    aveugle. Mais bientôt l’agonie du reptile touche à sa fin, ses mouvements diminuent, 
70  ses contorsions s’apaisent, et ce long tronçon de serpent s’étend comme une masse 
    inerte sur les flots calmés.        
        Quant à l’ichthyosaurus, a-t-il donc regagné sa caverne sous-marine, ou va-t-il 
    reparaître à la surface de la mer ?
    </pre>`);
const Voyage_8 = new Texte(VoyageCentreTerre, "Chapitre 39, Le berger", chapitre, `<pre>
        Soudain, je m’arrêtai. De la main, je retins mon oncle.
        La lumière diffuse permettait d’apercevoir les moindres objets dans la profondeur des 
    taillis. J’avais cru voir… Non ! réellement, de mes yeux, je voyais des formes immenses 
    s’agiter sous les arbres ! En effet, c’étaient des animaux gigantesques, tout un trou-
    peau de mastodontes, non plus fossiles, mais vivants, et semblables à ceux dont les 
    restes furent découverts en 1801 dans les marais de l’Ohio ! J’apercevais ces grands 
    éléphants dont les trompes grouillaient sous les arbres comme une légion de serpents. 
    J’entendais le bruit de leurs longues défenses dont l’ivoire taraudait les vieux troncs. 
    Les branches craquaient, et les feuilles arrachées par masses considérables s’engouf-
    fraient dans la vaste gueule de ces monstres.
10      Ce rêve où j’avais vu renaître tout ce monde des temps anté-historiques, des époques 
    ternaire et quaternaire, se réalisait donc enfin ! Et nous étions là, seuls, dans les 
    entrailles du globe, à la merci de ses farouches habitants !
        Mon oncle regardait.    
    « Allons, dit-il tout d’un coup en me saisissant le bras, en avant, en avant !    
15  — Non ! m’écriai-je, non ! Nous sommes sans armes ! Que ferions-nous au milieu de ce 
    troupeau de quadrupèdes géants ? Venez, mon oncle, venez ! Nulle créature humaine ne 
    peut braver impunément la colère de ces monstres.   
    — Nulle créature humaine ! répondit mon oncle, en baissant la voix ! Tu te trompes, 
    Axel ! Regarde, regarde, là-bas ! Il me semble que j’aperçois un être vivant ! un 
20  être semblable à nous ! un homme ! »
        Je regardai, haussant les épaules, et décidé à pousser l’incrédulité jusqu’à ses 
    dernières limites. Mais, quoique j’en eus, il fallut bien me rendre à l’évidence.    
    En effet, à moins d’un quart de mille, appuyé au tronc d’un kauris énorme, un être 
    humain, un Protée de ces contrées souterraines, un nouveau fils de Neptune, gardait 
25  cet innombrable troupeau de mastodonte !      
            <i>Immanis pecoris custos, immanior ipse !</i>    
    Oui ! <i>immanior ipse</i> ! Ce n’était plus l’être fossile dont nous avions relevé le 
    cadavre dans l’ossuaire, c’était un géant, capable de commander à ces monstres. 
    Sa taille dépassait douze pieds. Sa tête, grosse comme la tête d’un buffle, dis-
30  paraissait dans les broussailles d’une chevelure inculte. On eût dit une véritable 
    crinière, semblable à celle de l’éléphant des premiers âges. Il brandissait de la 
    main une branche énorme, digne houlette de ce berger antédiluvien.    
        Nous étions restés immobiles, stupéfaits. Mais nous pouvions être aperçus. Il 
    fallait fuir.    
35      « Venez, venez ! » m’écriai-je, en entraînant mon oncle, qui pour la première fois 
    se laissa faire !    
        Un quart d’heure plus tard, nous étions hors de la vue de ce redoutable ennemi.
    Et maintenant que j’y songe tranquillement, maintenant que le calme s’est refait 
    dans mon esprit, que des mois se sont écoulés depuis cette étrange et surnaturelle 
40  rencontre, que penser, que croire ? Non ! c’est impossible ! Nos sens ont été abusés, 
    nos yeux n’ont pas vu ce qu’ils voyaient ! Nulle créature humaine n’existe dans ce 
    monde subterrestre ! Nulle génération d’hommes n’habite ces cavernes inférieures du 
    globe, sans se soucier des habitants de sa surface, sans communication avec eux ! 
        C’est insensé, profondément insensé !    
45      J’aime mieux admettre l’existence de quelque animal dont la structure se rapproche 
    de la structure humaine, de quelque singe des premières époques géologiques, de 
    quelque protopithèque, de quelque mésopithèque semblable à celui que découvrit M. 
    Lartet dans le gîte ossifère de Sansan ! Mais celui-ci dépassait par sa taille toutes 
    les mesures données par la paléontologie moderne ! N’importe ! Un singe, oui, un 
50  singe, si invraisemblable qu’il soit ! Mais un homme, un homme vivant, et avec lui 
    toute une génération enfouie dans les entrailles de la terre ! Jamais !    
        Cependant, nous avions quitté la forêt claire et lumineuse, muets d’étonnement, 
    accablés sous une stupéfaction qui touchait à l’abrutissement. Nous courions malgré 
    nous. C’était une vraie fuite, semblable à ces entraînements effroyables que l’on 
55  subit dans certains cauchemars. Instinctivement, nous revenions vers la mer 
    Lidenbrock, et je ne sais dans quelles divagations mon esprit se fût emporté, 
    sans une préoccupation qui me ramena à des observations plus pratiques.
    </pre>`);
const Voyage_9 = new Texte(VoyageCentreTerre, "Chapitre 44, Les volcans", chapitre, `<pre>
        Le talus du volcan offrait des pentes très-roides ; nous glissions dans de véritables 
    fondrières de cendres, évitant les ruisseaux de lave qui s’allongeaient comme des serpents 
    de feu. Tout en descendant, je causais avec volubilité, car mon imagination était trop 
    remplie pour ne point s’en aller en paroles. « Nous sommes en Asie, m’écriais-je, sur les 
05  côtes de l’Inde, dans les îles Malaises, en pleine Océanie ! Nous avons traversé la moitié 
    du globe pour aboutir aux antipodes de l’Europe.
    — Mais la boussole ? répondait mon oncle.        
    — Oui ! la boussole ! disais-je d’un air embarrassé. À l’en croire, nous avons toujours 
    marché au nord.        
10  — Elle a donc menti ?        
    — Oh ! menti !        
    — À moins que ceci ne soit le pôle nord !        
    — Le pôle ! non ; mais… »        
        Il y avait là un fait inexplicable. Je ne savais qu’imaginer.        
15      Cependant nous nous rapprochions de cette verdure qui faisait plaisir à voir. La 
    faim me tourmentait et la soif aussi. Heureusement, après deux heures de marche, une 
    jolie campagne s’offrit à nos regards, entièrement couverte d’oliviers, de grenadiers et 
    de vignes qui avaient l’air d’appartenir à tout le monde. D’ailleurs, dans notre dénûment, 
    nous n’étions point gens à y regarder de si près. Quelle jouissance ce fut de presser ces 
20  fruits savoureux sur nos lèvres et de mordre à pleines grappes dans ces vignes vermeilles ! 
    Non loin, dans l’herbe, à l’ombre délicieuse des arbres, je découvris une source d’eau 
    fraîche, où notre figure et nos mains se plongèrent voluptueusement.        
        Pendant que chacun s’abandonnait ainsi à toutes les douceurs du repos, un enfant 
    apparut entre deux touffes d’oliviers.        
25  « Ah ! m’écriai-je, un habitant de cette heureuse contrée ! »        
        C’était une espèce de petit pauvre, très misérablement vêtu, assez souffreteux, 
    et que notre aspect parut effrayer beaucoup ; en effet, demi-nus, avec nos barbes 
    incultes, nous avions fort mauvaise mine, et, à moins que ce pays ne fût un pays de 
    voleurs, nous étions faits de manière à effrayer ses habitants.        
30      Au moment où le gamin allait prendre la fuite, Hans courut après lui et le ramena,
    malgré ses cris et ses coups de pied.        
        Mon oncle commença par le rassurer de son mieux et lui dit en bon allemand :
    « Quel est le nom de cette montagne, mon petit ami ? »
    L’enfant ne répondit pas.
35  « Bon, dit mon oncle, nous ne sommes point en Allemagne. »
    Et il refit la même demande en anglais.
        L’enfant ne répondit pas davantage. J’étais très intrigué.
    « Est-il donc muet ? » s’écria le professeur, qui, très fier de son polyglottisme, 
    recommença la même demande en français.
40  Même silence de l’enfant.
    « Alors essayons de l’italien », reprit mon oncle, et il dit en cette langue :
    « Dove noi siamo ?
    — Oui ! où sommes-nous ? » répétai-je avec impatience.
    L’enfant de ne point répondre.
45  « Ah çà ! parleras-tu ? s’écria mon oncle, que la colère commençait à gagner, et qui 
    secoua l’enfant par les oreilles. Come si noma questa isola ?
    — Stromboli, » répondit le petit pâtre, qui s’échappa des mains de Hans et gagna 
    la plaine à travers les oliviers.
        Nous ne pensions guère à lui ! Le Stromboli ! Quel effet produisit sur mon 
50  imagination ce nom inattendu ! Nous étions en pleine Méditerranée, au milieu de 
    l’archipel éolien de mythologique mémoire, dans l’ancienne Strongyle, où Éole tenait 
    à la chaîne les vents et les tempêtes. Et ces montagnes bleues qui s’arrondissaient 
    au levant, c’étaient les montagnes de la Calabre ! 
        Et ce volcan dressé à l’horizon du sud, l’Etna, le farouche Etna lui-même.
55  « Stromboli ! Stromboli ! » répétai-je.
        Mon oncle m’accompagnait de ses gestes et de ses paroles. Nous avions l’air de 
    chanter un chœur !
    Ah ! quel voyage ! quel merveilleux voyage ! Entrés par un volcan, nous étions sortis
    par un autre, et cet autre était situé à plus de douze cents lieues du Sneffels, de cet 
60  aride pays de l’Islande jeté aux confins du monde ! Les hasards de cette expédition nous 
    avaient transportés au sein des plus harmonieuses contrées de la terre. 
        Nous avions abandonné la région des neiges éternelles pour celles de la verdure 
    infinie et laissé au-dessus de nos têtes le brouillard grisâtre des zones glacées pour 
    revenir au ciel azuré de la Sicile !
65      Après un délicieux repas composé de fruits et d’eau fraîche, nous nous remîmes 
    en route pour gagner le port de Stromboli. Dire comment nous étions arrivés dans l’île 
    ne nous parut pas prudent ; l’esprit superstitieux des Italiens n’eût pas manqué de voir 
    en nous des démons vomis du sein des enfers ; il fallut donc se résigner à passer pour 
    d’humbles naufragés. C’était moins glorieux, mais plus sûr.
    </pre>`);
const Voyage_10 = new Texte(VoyageCentreTerre, "Chapitre 45, La boussole", epilogue, `<pre>
        Voici la conclusion d’un récit auquel refuseront d’ajouter foi les gens les plus habi-
    tués à ne s’étonner de rien. Mais je suis cuirassé d’avance contre l’incrédulité humaine.
        Nous fûmes reçus par les pêcheurs stromboliotes avec les égards dus à des naufragés. 
    Ils nous donnèrent des vêtements et des vivres. Après quarante-huit heures d’attente, le 
5   31 août, un petit speronare nous conduisit à Messine, où quelques jours de repos nous 
    remirent de toutes nos fatigues.       
        Le vendredi 4 septembre, nous nous embarquions à bord du Volturne, l’un des paquebots-
    postes des messageries impériales de France, et, trois jours plus tard, nous prenions terre 
    à Marseille, n’ayant plus qu’une seule préoccupation dans l’esprit, celle de notre maudite 
10  boussole. Ce fait inexplicable ne laissait pas de me tracasser très sérieusement. Le 9 
    septembre au soir, nous arrivions à Hambourg.        
        Quelle fut la stupéfaction de Marthe, quelle fut la joie de Graüben, je renonce à le 
    décrire.        
        « Maintenant que tu es un héros, me dit ma chère fiancée, tu n’auras plus besoin de me 
15  quitter, Axel ! »        
        Je la regardai. Elle pleurait en souriant.        
        Je laisse à penser si le retour du professeur Lidenbrock fit sensation à Hambourg. 
    Grâce aux indiscrétions de Marthe, la nouvelle de son départ pour le centre de la terre 
    s’était répandue dans le monde entier. On ne voulut pas y croire, et, en le revoyant, on 
20  n’y crut pas davantage.        
        Cependant la présence de Hans, et diverses informations venues d’Islande modifièrent 
    peu à peu l’opinion publique.        
        Alors mon oncle devint un grand homme, et moi, le neveu d’un grand homme, ce qui est 
    déjà quelque chose. Hambourg donna une fête en notre honneur. Une séance publique eut lieu 
25  au Johannæum, où le professeur fit le récit de son expédition et n’omit que les faits 
    relatifs à la boussole. Le jour même, il déposa aux archives de la ville le document de 
    Saknussemm, et il exprima son vif regret de ce que les circonstances, plus fortes que sa 
    volonté, ne lui eussent pas permis de suivre jusqu’au centre de la terre les traces du 
    voyageur islandais. Il fut modeste dans sa gloire, et sa réputation s’en accrut.        
30      Tant d’honneur devait nécessairement lui susciter des envieux. Il en eut, et comme 
    ses théories, appuyées sur des faits certains, contredisaient les systèmes de la science 
    sur la question du feu central, il soutint par la plume et par la parole de remarquables 
    discussions avec les savants de tous pays.        
        Pour mon compte, je ne puis admettre sa théorie du refroidissement : en dépit de ce 
35  que j’ai vu, je crois et je croirai toujours à la chaleur centrale ; mais j’avoue que 
    certaines circonstances encore mal définies peuvent modifier cette loi sous l’action 
    de phénomènes naturels.        
        Au moment où ces questions étaient palpitantes, mon oncle éprouva un vrai chagrin. 
    Hans, malgré ses instances, avait quitté Hambourg ; l’homme auquel nous devions tout ne 
40  voulut pas nous laisser lui payer notre dette. Il fut pris de la nostalgie de l’Islande.        
        « Farval, » dit-il un jour, et sur ce simple mot d’adieu, il partit pour Reykjawik, 
    où il arriva heureusement.        
        Nous étions singulièrement attachés à notre brave chasseur d’eider ; son absence ne 
    le fera jamais oublier de ceux auxquels il a sauvé la vie, et certainement je ne mourrai 
45  pas sans l’avoir revu une dernière fois.        
        Pour conclure, je dois ajouter que ce Voyage au centre de la terre fit une énorme 
    sensation dans le monde. Il fut imprimé et traduit dans toutes les langues ; les journaux 
    les plus accrédités s’en arrachèrent les principaux épisodes, qui furent commentés, dis-
    cutés,  attaqués, soutenus avec une égale conviction dans le camp des croyants et des 
50  incrédules. Chose rare ! mon oncle jouissait de son vivant de toute la gloire qu’il avait 
    acquise, et il n’y eut pas jusqu’à M. Barnum qui ne lui proposât de « l’exhiber » à un 
    très haut prix dans les États de l’Union.        
        Mais un ennui, disons même un tourment, se glissait au milieu de cette gloire. 
    Un fait demeurait inexplicable, celui de la boussole ; or, pour un savant, pareil phéno-
55  mène inexpliqué devient un supplice de l’intelligence. Eh bien ! le ciel réservait à mon 
    oncle d’être complètement heureux.        
        Un jour, en rangeant une collection de minéraux dans son cabinet, j’aperçus cette 
    fameuse boussole et je me mis à l’observer.        
    Depuis six mois elle était là, dans son coin, sans se douter des tracas qu’elle causait.
60  Tout à coup, quelle fut ma stupéfaction ! Je poussai un cri. Le professeur accourut.        
    « Qu’est-ce donc ? demanda-t-il.        
    — Cette boussole !…        
    — Eh bien ?        
    — Mais son aiguille indique le sud et non le nord !        
65  — Que dis-tu ?        
    — Voyez ! ses pôles sont changés.        
    — Changés ! »        
    Mon oncle regarda, compara, et fit trembler la maison par un bond superbe.        
    Quelle lumière éclairait à la fois son esprit et le mien !        
70  « Ainsi donc, s’écria-t-il, dès qu’il recouvra la parole, après notre arrivée au cap 
    Saknussemm, l’aiguille de cette damnée boussole marquait le sud au lieu du nord ?
    — Évidemment.        
    — Notre erreur s’explique alors. Mais quel phénomène a pu produire ce renversement des 
    pôles ?
75  — Rien de plus simple.
    — Explique-toi, mon garçon.
    — Pendant l’orage, sur la mer Lidenbrock, cette boule de feu qui aimantait le fer du radeau 
    avait tout simplement désorienté notre boussole !
    — Ah ! s’écria le professeur en éclatant de rire, c’était donc un tour de l’électricité ? »
80  À partir de ce jour, mon oncle fut le plus heureux des savants, et moi le plus heureux des 
    hommes, car ma jolie Virlandaise, abdiquant sa position de pupille, prit rang dans la maison 
    de König-strasse en la double qualité de nièce et d’épouse. Inutile d’ajouter que son oncle 
    fut l’illustre professeur Otto Lidenbrock, membre correspondant de toutes les sociétés 
    scientifiques, géographiques et minéralogiques des cinq parties du monde.
    </pre>`);
//# sourceMappingURL=textes.js.map