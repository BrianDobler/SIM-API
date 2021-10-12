export default class Generator {
    mod: number;
    a: number;
    c: number;
    seed: number;

    constructor(mod: number, a: number, c: number, seed: number) {
        this.mod = mod;
        this.a = a;
        this.c = c;
        this.seed = seed;
    }

    next = () => {
        this.seed = ((this.a * this.seed + this.c) % this.mod);
        return this.seed;
    };

    random = () => this.next() / this.mod;
}
