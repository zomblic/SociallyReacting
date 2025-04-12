import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const cwd = process.cwd();

const PORT = 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// These next two liners PARSE the incoming requests with urlencoded payloads and JSON payloads
// and make them available under the req.body property
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);


// we need to connect to our database before starting the Express server
db.once('open', () => {
    console.log(`Connected to database for ${cwd}`);
    app.listen(PORT, () => {
        console.log(`API server for ${cwd} running on port ${PORT}!`);
    });
});