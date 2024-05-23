// Require
const fs = require('fs');
const path = require('path');
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
const writeJoke = (joke, writeJSONData) => {
    // Controllo se la battuta è già presente nell'array Jokes
    if (jokes.includes(joke)) {
        // Se già presente
        console.log("Battuta già presente, procedo a caricarne un'altra");
        getRandomJoke(writeJSONData); // Chiamata ricorsiva in caso di battuta già presente
    } else {
        // Se non è presente la inserisco nell'array Jokes
        jokes.push(joke);
        fs.writeFile(filePath, JSON.stringify(jokes), (err) => {
            if (err) {
                console.error("Errore durante la scrittura del file JSON:", err);
                return;
            }
            console.log("Battuta salvata!");
            writeJSONData();
        });
    }
};

// Funzione per recuperare una battuta random dall'API e aggiungerla al file JSon
const getRandomJoke = (writeJSONData) => {
    fetch(api)
        .then(response => response.json())
        .then((data) => {
            const newJoke = data.value;
            writeJoke(newJoke, writeJSONData);
        })
        .catch(error => {
            console.error("Errore durante la richiesta dell'API:", error);
            getRandomJoke(writeJSONData); // Chiamata ricorsiva in caso di errore
        });
};

// Esporta le funzioni
module.exports = {
    getRandomJoke,
    jokes
};