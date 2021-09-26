class NormalDistribution {

    constructor(sigma, mu, numberOfValues) {
        this.sigma = sigma;  // Desviación estandard
        this.mu = mu;  // Media
        this.numberOfValues = numberOfValues;
    }

    generateValues () {
        let values = [];
        let x;
    
        for (let index = 0; index < this.numberOfValues; index++) {
            let rnd1 = Math.random();
            let rnd2 = Math.random();
            
            if (this.numberOfValues % 2 == 0) {
                x = (Math.sqrt(-2 * Math.log(rnd1)) * Math.cos(2 * Math.PI * rnd2)) * this.sigma + this.mu;
            } else {
                x = (Math.sqrt(-2 * Math.log(rnd1)) * Math.sin(2 * Math.PI * rnd2)) * this.sigma + this.mu;
            }
            x = (Math.round((x) * 10000.0) / 10000.0);
            
            values[index] = x;
        }
        return values;
    }
}

module.exports = NormalDistribution;