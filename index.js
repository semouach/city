const http = require('http');
const server = http.createServer();
const mongoose = require('mongoose');

const cityModel = require('./models/census');

const cities = [
    {department: 75, city: 'Paris', population: 2175601},
    {department: 13, city: 'Marseille', population: 868277},
    {department: 69, city: 'Lyon', population: 518635},
    {department: 31, city: 'Toulouse', population: 486828},
    {department: 60, city: 'Nice', population: 341032},
    {department: 44, city: 'Nantes', population: 314138},
    {department: 34, city: 'Montpellier', population: 290053},
    {department: 67, city: 'Strasbourg', population: 284677},
    {department: 33, city: 'Bordeaux', population: 257068},
    {department: 59, city: 'Lille', population: 233098},
    {department: 35, city: 'Rennes', population: 217728},
    {department: 51, city: 'Reims', population: 182211},
    {department: 83, city: 'Toulon', population: 176198},
    {department: 42, city: 'Saint-Étienne', population: 173089},
    {department: 76, city: 'Le Havre', population: 169733},
    {department: 38, city: 'Grenoble', population: 157650},
    {department: 21, city: 'Dijon', population: 156854},
    {department: 49, city: 'Angers', population: 154508},
    {department: 69, city: 'Villeurbanne', population: 150659},
    {department: 97, city: 'Saint-Denis', population: 150535},
    {department: 30, city: 'Nîmes', population: 149633},
    {department: 63, city: 'Clermont-Ferrand', population: 146734},
    {department: 72, city: 'Le Mans', population: 143252},
    {department: 13, city: 'Aix-en-Provence', population: 143097},
    {department: 29, city: 'Brest', population: 139602},
    {department: 37, city: 'Tours', population: 136463},
    {department: 80, city: 'Amiens', population: 133891},
    {department: 87, city: 'Limoges', population: 131479},
    {department: 74, city: 'Annecy', population: 128199},
    {department: 92, city: 'Boulogne-Billancourt', population: 121334},
    {department: 66, city: 'Perpignan', population: 119188},
    {department: 25, city: 'Besançon', population: 116775},
    {department: 57, city: 'Metz', population: 116581},
    {department: 45, city: 'Orléans', population: 116238},
    {department: 93, city: 'Saint-Denis', population: 112091},
    {department: 76, city: 'Rouen', population: 111360},
    {department: 95, city: 'Argenteuil', population: 110213},
    {department: 93, city: 'Montreuil', population: 109914},
    {department: 68, city: 'Mulhouse', population: 108942},
    {department: 14, city: 'Caen', population: 105512},
    {department: 54, city: 'Nancy', population: 104885},
    {department: 97, city: 'Saint-Paul', population: 103492},
    {department: 59, city: 'Roubaix', population: 98089},
    {department: 59, city: 'Tourcoing', population: 97442},
    {department: 92, city: 'Nanterre', population: 96807},
    {department: 94, city: 'Vitry-sur-Seine', population: 94649},
    {department: 94, city: 'Créteil', population: 92265},
    {department: 84, city: 'Avignon', population: 91729},
    {department: 86, city: 'Poitiers', population: 88665},
    {department: 93, city: 'Aubervilliers', population: 87572},
    {department: 59, city: 'Dunkerque', population: 86865},
    {department: 93, city: 'Aulnay-sous-Bois', population: 86278},
    {department: 92, city: 'Colombes', population: 86052},
    {department: 92, city: 'Asnières-sur-Seine', population: 85946},
    {department: 78, city: 'Versailles', population: 85205},
    {department: 97, city: 'Saint-Pierre', population: 84961},
    {department: 92, city: 'Courbevoie', population: 82198},
    {department: 97, city: 'Le Tampon', population: 79385},
    {department: 50, city: 'Cherbourg-en-Cotentin', population: 79144},
    {department: 97, city: 'Fort-de-France', population: 78126},
    {department: 92, city: 'Rueil-Malmaison', population: 77986},
    {department: 34, city: 'Béziers', population: 77599},
    {department: 94, city: 'Champigny-sur-Marne', population: 77039},
    {department: 64, city: 'Pau', population: 76275},
    {department: 17, city: 'La Rochelle', population: 76114},
    {department: 94, city: 'Saint-Maur-des-Fossés', population: 75298},
    {department: 60, city: 'Cannes', population: 73965},
    {department: 62, city: 'Calais', population: 72929},
    {department: 60, city: 'Antibes', population: 72915},
    {department: 93, city: 'Drancy', population: 72109},
    {department: 20, city: 'Ajaccio', population: 70817},
    {department: 33, city: 'Mérignac', population: 70813},
    {department: 44, city: 'Saint-Nazaire', population: 70619},
    {department: 68, city: 'Colmar', population: 68703},
    {department: 92, city: 'Issy-les-Moulineaux', population: 68260},
    {department: 93, city: 'Noisy-le-Grand', population: 68126},
    {department: 91, city: 'Évry-Courcouronnes', population: 67131},
    {department: 69, city: 'Vénissieux', population: 67129},
    {department: 95, city: 'Cergy', population: 66322},
    {department: 92, city: 'Levallois-Perret', population: 65817},
    {department: 26, city: 'Valence', population: 64726},
    {department: 18, city: 'Bourges', population: 64668},
    {department: 33, city: 'Pessac', population: 64374},
    {department: 97, city: 'Cayenne', population: 63652},
    {department: 94, city: 'Ivry-sur-Seine', population: 63309},
    {department: 29, city: 'Quimper', population: 63166},
    {department: 83, city: 'La Seyne-sur-Mer', population: 62888},
    {department: 92, city: 'Antony', population: 62858},
    {department: 59, city: 'Villeneuve-dAscq', population: 62727},
    {department: 92, city: 'Clichy', population: 62485},
    {department: 10, city: 'Troyes', population: 61996},
    {department: 82, city: 'Montauban', population: 60952},
    {department: 92, city: 'Neuilly-sur-Seine', population: 59940},
    {department: 93, city: 'Pantin', population: 59060},
    {department: 79, city: 'Niort', population: 59059},
    {department: 73, city: 'Chambéry', population: 58833},
    {department: 95, city: 'Sarcelles', population: 58811},
    {department: 93, city: 'Le Blanc-Mesnil', population: 57150},
    {department: 56, city: 'Lorient', population: 57084}
];


cityModel.insertMany(cities).then(response =>{
    console.log(response);
}).catch(error => {
    console.error(error)
});

//exo 1
cityModel.aggregate()
.group(
    { 
      _id: "$department", 
      totaldepartment: {$sum: "$population"}
    })

//exo 3
// cityModel.aggregate()
// .group(
//     { 
//       _id: "$department", 
//       totaldepartment: {$avg: "$population"}
//     })

// Connection à MongoDB
mongoose.connect('mongodb://localhost:27017/demo', (error) => {
    if (error) {
        console.error(error); // Affiche l'erreur de MongoDB en cas de problème
        process.exit(1); // Quitte l'application
    }
    console.log('MongoDB connected Successfully');
});


//Serveur
server.listen(3000, () => {
    console.log(`Nodejs server started on port ${3000}`);
}); 

