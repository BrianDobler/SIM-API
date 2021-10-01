function Task() {
    this.distribution = null;
    this.completed = false;
    this.timeToCompleted = null;

    this.setDistribution = (distribution) => {
        // Set the distribution of the task.
        this.distribution = distribution;
    };

    this.calculateTimeToComplete = () => {
        // Calculate the tsak duration based on the probability.
        const randomValue1 = Math.random();
        const randomValue2 = Math.random();
        this.timeToCompleted = Math.floor(this.distribution.nextValue(randomValue1, randomValue2));
        this.completed = false;
    };

    this.aDayLess = () => {
        // Decrement a day of time to complete a task.
        if (this.timeToCompleted > 0) {
            this.timeToCompleted--;
        } else if (this.timeToCompleted == null) {
            return null; // If there is no days to decrement simply do nothing.
        } else { // If no days. Completed TRUE, Time to completed reset.
            this.timeToCompleted = null;
            this.completed = true;
        }
        return true; // Not sure how to perform this. But now it's working.
    };
}

module.exports = Task;
