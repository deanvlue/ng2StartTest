'use strict';

var fs = require('fs');

var soporte = require('./soporte.json');

var norte =[81190,81125,81148,81121,81215,81124,81230,81253,81193,81195,81123,81122,81231,81228,81167,81074,81147,81132,81088,81036,81063,81198,81217,81169,81225,81140,81113,81219,81204,81120,81049,81069,81178,81189,81262,81095,81059,81030,81199,81214,81170,81175,81060,81161,81055,81119,81104,81093,81094,81099,81102,81106,81114,81116,81117,81153,81154,81157,81173,81191,81216,81222,81259,81261,81265];

//soporte['81265'].ger="prueba@alsea.com.mx";
norte.forEach(function(n){
  soporte[n].ger='haraujo@alsea.com.mx';
});

fs.writeFile('./nuevo.json', JSON.stringify(soporte), function(err){
  if(err){
    return console.log(err);
  }
  console.log("Datos escritos");
});

//console.log(soporte);