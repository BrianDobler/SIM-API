function LinearCongruentialGenerator(mod, a, c, seed) {
    this.mod = mod;
    this.a = a;
    this.c = c;
    this.seed = seed;

    this.next = () => {
        this.seed = ((this.a * this.seed + this.c) % this.mod);
        return this.seed;
    };

    this.random = () => this.next() / this.mod;
}

module.exports = LinearCongruentialGenerator;
