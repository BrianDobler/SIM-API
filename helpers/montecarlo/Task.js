function Task() {
    this.precedence = [];
    this.distribution = null;
    this.completed = false;
    this.taskDuration = null;

    this.setPrecedence = (task) => {
        // Set task precedence.
        this.precedence.push(task);
    };

    this.setDistribution = (distribution) => {
        // Set the distribution of the task.
        this.distribution = distribution;
    };

    this.calculateTaskDuration = () => {
        // Calculate the tsak duration based on the probability.
        const randomValue1 = Math.random();
        const randomValue2 = Math.random();
        this.taskDuration = this.distribution.nextValue(randomValue1, randomValue2);
    };
}

module.exports = Task;
