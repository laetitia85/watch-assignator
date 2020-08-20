const express = require("express");                                                             //Appel à la biblithèque de node pour récupérer le module express
const app = express();                                                                           //Initialisation de la variable app pour utiliser le module express
const fetch = require("node-fetch");                                                            //Appel de la bibliothèque de node pour récupérer le module fetch qui permet de récupérer le contenu de l'url qui accède à la bd
const fs = require("fs");                                                                       //Appel à la bibli de node pour récupérer le module fs pour lire le contenu du fichier
const ejs = require("ejs");                                                                     //Appel à la bibli de node pour récupérer le module ejs pour lire le fichier.ejs
const bodyParser = require("body-parser");                                                      //Appel à la biblio de node pour récupérer le module body-parser qui permet de lire le contenu du body d'un fichier
const qs = require('querystring');   

app.use('/public', express.static('public')); 

//RÉCUPERATON DES DONNÉES DE LE ROUTE STUDENTS
app.get('/students', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);                                      //Route définie préalablement dans l'API
    let testRec = await rec.json();                                                              //Initialisation d'une variable pour récupérer les données de la route
    res.status(200);                                        
    res.render("list.ejs" , {studentsAAA: testRec} );
});

app.use(bodyParser.json());                                                                     //Lecture du fichier
app.use(bodyParser.urlencoded({ extended: true }));                                             //Lecture du fichier

app.post('/students', async function (req, res) {                                               //Intégration de nouveaux étudiants dans la route 

    fetch(`http://localhost:8000/students`, {                                                   //Connexion à la base de données des étudiants
        method: 'POST',                                                                         //On précise qu'il s'agit de la méthode POST en rapport avec le form : /action du HTML
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: req.body.name })                                           //Valeur de l'input name dans le bouton du html pour intégrer un nouvel étudiant
    })
        .then(function (response) {                                                             //response du serveur
            return response.json();
        })
        .then(function (success) {                                                              //confirmation du bon fonctionnement
            console.log('Request success: ', success);
        })
        .catch(function (error) {                                                               //récupération des erreurs
            console.log('Request failure: ', error);
        });
    res.redirect('/students');                                                                  //Raffraichit la page
});

//RÉCUPERATON DES DONNÉES DE LE ROUTE SUBJECT
app.get('/subject', async function (req, res) {
    let subs = await fetch(`http://localhost:8000/subject`);                                    //Initialisation d'une variable avec les données de la collection subject
    let testRecPro = await subs.json();                                                             //Initialisation d'une variable pour lire les données de la collection subject qui sont en format json
    res.status(200);
    res.render('history.ejs', {subjectBB: testRecPro});
});

app.post('/subject', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);
    let testRec = await rec.json();
    //console.log(testRec);
    let aleaListStudents = testRec.sort(() => Math.random() - 0.5);             //randomisation du tableau des étudiants

    while (aleaListStudents.length) {
    //console.log(aleaListStudents);
    let aleaListStudentsNbr = aleaListStudents.slice(0, req.body.nbr);           // slice() = je prends les "n" premiers élément du tableau
    }                                                                      
    aleaListStudentsNbr.forEach(element => {                                     // boucle forEach = pour chaque données du tableau donne-moi seulement le nom de l'étudiant
        console.log(element.name);
    
    });

    fetch(`http://localhost:8000/subject`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({                                                   //Association des valeurs des boutons  (valeur des inputs : name et students)
            name: req.body.project,
            students: aleaListStudentsNbr
        },
        )
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (success) {
            console.log('Request success: ', success);
        })
        .catch(function (error) {
            console.log('Request failure: ', error);                            //récupération des erreurs
        });
    res.redirect('/subject');                                                    //Raffraichit la page
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/subject', async function (req,res) {

})

//RÉCUPERATON DES DONNÉES DE LE ROUTE HOME
app.get('/home', async function (req, res) {
    let recup = await fetch(`http://localhost:8000/students`);  
    let sub = await fetch('http://localhost:8000/subject');
    let subrecup = await sub.json();                                                            //Route définie préalablement dans l'API
    let testRecup = await recup.json();                                                         //Initialisation d'une variable pour récupérer les données de la route
    res.status(200); 
    res.render('home.ejs', {student: testRecup, subject: subrecup});

});

//RÉCUPERATON DES DONNÉES DE LE ROUTE ASSIGNATION
app.get('/assignation', async function (req, res) {
    // let rec = await fetch(`http://localhost:8000/students`);  
    let subs = await fetch(`http://localhost:8000/subject`);                                    //Initialisation d'une variable avec les données de la collection subject
    // let recrecup = await rec.json();                                            
    let RecSubject = await subs.json();                                                             //Initialisation d'une variable pour lire les données de la collection subject qui sont en format json
    res.status(200);
    res.render('assignation.ejs', {/*subjectAAA: recrecup ,*/ subjectBBB: RecSubject});                             //Route définie préalablement dans l'API

});

//RÉCUPERATON DES DONNÉES DE LE ROUTE HISTORY
app.get('/history', async function (req, res) {
    let cva = await fetch(`http://localhost:8000/history`);                        //Route définie préalablement dans l'API
    let testcva = await cva.json();                                           //Initialisation d'une variable pour récupérer les données de la route
    res.status(200); 
    res.send('history.ejs' , {subject1: testcva});

});

app.post('/students-delete', async function (req,res){

    await fetch(`http://localhost:8000/students/${req.body.deletename}`, {
    method: 'DELETE'

})
res.redirect('/students');


console.log(`http://localhost:8000/students/${req.body.deletename}`);
});


//ECOUTE DU PORT
app.listen(8080, () => {
    console.log('Server app listening on port 8080')
});
