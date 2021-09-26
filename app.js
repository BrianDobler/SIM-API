const express = require('express');
const distribution = require('./controllers/normalDistributionController');

const app = express();

const port = process.env.PORT || 3000;

const NormalDistribution = new distribution(1, 50);

app.get('/', (req, res) => {
    let randomValues = NormalDistribution.generateValues();
    res.send(randomValues);
});


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
