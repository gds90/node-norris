require("dotenv").config();

// Require
const http = require("http");
const { getRandomJoke, jokes } = require("./functions.js");

const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

// Richiesta al server
const server = http.createServer((req, res) => {
    // Gestione chiamata favicon
    if (req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
    }

    getRandomJoke(() => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Chuck Norris says:</h1>');
        res.write('<ul>');
        res.write(`<li>${jokes[jokes.length - 1]}</li>
        <br>
        `);
        res.write('</ul>');
        res.end();
    });
});

// Ascolto del server
server.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
});