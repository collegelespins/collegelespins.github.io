"use strict";
class FTransition {
    constructor(machine, source, id, target) {
        this.source = source;
        this.id = id;
        this.target = target;
        machine._addTransition(this); // création et ajout de la transition
    }
    execute() {
        this.source.exitState();
        this.target.enterState();
    }
}
class FState {
    constructor(machine, id) {
        this.machine = machine;
        this.id = id;
        this.transitions = new Map();
        machine._addState(this); // création et ajout de l'état
    }
    enterState() {
        // implémenter ici 1. ce qui se fait dans cet état 
        //                 2. quelle sera la transition
        this.machine.state = this;
    }
    exitState() {
        // implémenter si nécessaire ce qui se passe à la sortie de cet état
        this.machine.state = undefined;
    }
}
class FSMachine {
    constructor(id) {
        this.id = id;
        this.states = new Map();
        this.transitions = new Map();
    }
    _addState(state) {
        if (this.states.has(state.id))
            throw `L'état ${state.id} existe déjà !`;
        this.states.set(state.id, state);
    }
    _addTransition(transit) {
        if (this.transitions.has(transit.id))
            throw `La FTransition ${transit.id} existe !`;
        if (!this.states.has(transit.source.id))
            throw `L'état source ${transit.source.id} n'existe pas !`;
        if (!this.states.has(transit.target.id))
            throw `L'état cible ${transit.target.id} n'existe pas !`;
        this.transitions.set(transit.id, transit);
        this._next = transit;
        // la dernière transition créée sera la transition en cours...
    }
    /**
     * Exécute la transition suivante
     */
    executeNext() {
        if (this._next)
            this._next.execute();
    }
    /**
     * Choisit la transition suivante parmi les transitions
     * @param transName nom de la transition
     */
    setNext(transName) {
        this._next = this.transitions.get(transName);
    }
    /**
     * Définit et renvoie l'état en cours
     */
    get state() {
        return this._current;
    }
    set state(value) {
        this._current = value;
    }
}
