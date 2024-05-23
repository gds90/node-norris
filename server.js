require("dotenv").config();

const http = require("http");
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";
const api = process.env.API;

const filePath = path.join(__dirname, 'norrisDb.json');

// Salvo le battute esistenti nel file JSon
let jokes = [];
try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    jokes = JSON.parse(fileData);
} catch (error) {
    if (error) {
        console.error("Errore durante la lettura del file JSON:", error);
    }
};

// Funzione per scrivere una battuta sul file JSon
const writeJoke = (joke) => {
    jokes.push(joke);

    fs.writeFile(filePath, JSON.stringify(jokes),
        function (err) {
            if (err) throw err;
            console.log("Battuta salvata!");
        }
    );
};

// Funzione per recuperare una battuta random dall'API e aggiungerla al file JSon
const getRandomJoke = () => {
    fetch(api)
        .then(response => response.json())
        .then((data) => {
            const newJoke = data.value;
            writeJoke(newJoke);
        });
};

// Richiesta al server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Lista dei Jokes</h1>');
    res.write('<ul>');
    jokes.forEach(joke => {
        res.write(`<li>${joke}</li>
        <br>
        `);
    });
    res.write('</ul>');
    res.end();
});

// Ascolto del server
server.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
    getRandomJoke();
});