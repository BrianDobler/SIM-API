const express = require('express');
const cors = require('cors');

const app = express();

// Using JSON middleware.
app.use(express.json());

// Enable CROSS - ORIGIN RESOURCE SHARING
app.use(cors());

const PORT = process.env.PORT || 3000;

// Just a method checking if the conecction is alive.
app.get('/ping', (request, response) => {
    response
        .status(200)
        .json('Pong');
});

// Distiribution routing.
const distributionRoutes = require('./routes/distributions.routes');

app.use('/distributions', distributionRoutes);

// Montecarlo Routing.
const montecarloRoutes = require('./routes/montecarlo.routes');

app.use('/montecarlo', montecarloRoutes);

// Run the app on the selected port.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
