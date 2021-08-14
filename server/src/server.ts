import express from 'express';
import http from 'http';
import response from './response';

const PORT = process.env.PORT || 3001;

const app = express();

// Create own HTTP server instead of using app.listen() in order to share the same port with WS
const httpsServer = http.createServer(app);

app.get('/filters', (req, res) => {
    res.json(response);
});

// Start listening on port 3000 for both express app and WS server
httpsServer.listen(PORT, () => {
    console.log('HTTP server listening on port ', PORT);
});
