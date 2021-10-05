function LinearCongruentialGenerator(
    mod = 3578942135498,
    a = 1234512354,
    c = 1597563687,
    seed = 489785354,
) {
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
