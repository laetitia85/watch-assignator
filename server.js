const express = require("express");                                                 //Appel à la biblithèque de node pour récupérer le module express
const app = express();                                                              //Initialisation de la variable app pour utiliser le module express
const fetch = require("node-fetch");                                                //Appel de la bibliothèque de node pour récupérer le module fetch qui permet de récupérer le contenu de l'url qui accède à la bd
const fs = require("fs");                                                           //Appel à la bibli de node pour récupérer le module fs pour lire le contenu du fichier
const ejs = require("ejs");                                                         //Appel à la bibli de node pour récupérer le module ejs pour lire le fichier.ejs
const bodyParser = require("body-parser");                                          //Appel à la biblio de node pour récupérer le module body-parser qui permet de lire le contenu du body d'un fichier
const qs = require('querystring');   


app.use('/public', express.static('public')); 

//RÉCUPERATON DES DONNÉES DE LE ROUTE STUDENT
app.get('/students', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);                        //Route définie préalablement dans l'API
    let testRec = await rec.json();                                                 //Initialisation d'une variable pour récupérer les données de la route
    //console.log(testRec);
    // let numberAleaStudent = testRec[Math.floor(Math.random() * testRec.length)];
    // console.log(numberAleaStudent);

    
    res.status(200);
    //res.send(testRec);
    const ejs_file = fs.readFileSync(__dirname + '/index.js', 'utf-8');          //Lecture du fichier et intégration des données dans le fichier index
    const html = ejs.render(ejs_file, {                                           //Connexion avec un fichier au format ejs
        studentsAAA: testRec                                                      //initilisation de la variable étudiant qui apparaitra dans le HTML
    });
    res.send(html);
});

app.use(bodyParser.json());                                                       //Lecture du fichier
app.use(bodyParser.urlencoded({ extended: true }));                               //Lecture du fichier

app.post('/students', async function (req, res) {                                 //Intégration de nouveaux étudiants dans la route 

    fetch(`http://localhost:8000/students`, {                                     //Connexion à la base de données des étudiants
        method: 'POST',                                                           //On précise qu'il s'agit de la méthode POST en rapport avec le form : /action du HTML
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: req.body.name })                           //Valeur de l'input name dans le bouton du html pour intégrer un nouvel étudiant
    })
        .then(function (response) {                                             //response du serveur
            return response.json();
        })
        .then(function (success) {                                              //confirmation du bon fonctionnement
            console.log('Request success: ', success);
        })
        .catch(function (error) {                                               //récupération des erreurs
            console.log('Request failure: ', error);
        });
    res.redirect('/students');                                                  //Raffraichit la page
});






//ECOUTE DU PORT
app.listen(8080, () => {
    console.log('Server app listening on port 8080')
});
