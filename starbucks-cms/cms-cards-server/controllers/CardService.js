'use strict';
var azure = require('azure-storage');
var nconf = require('nconf');
var uuid = require('node-uuid');
var entityGen = azure.TableUtilities.entityGenerator

var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");


/*
nconf.env()
    .file({file:'config.json', search: true});

var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");
*/


var storageClient = azure.createTableService(accountName, accountKey);

storageClient.createTableIfNotExists(tableName, function tableCreated(error){
  if(error){
    throw error;
  }
})


exports.delMovie = function(args, res, next) {
  /**
   * delete a movie
   *
   * id String Movie Id
   * returns inline_response_200_1
   **/
  var examples = {};
  examples['application/json'] = {
  "success" : 1.3579000000000001069366817318950779736042022705078125,
  "description" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getAll = function(args, res, next) {
  /**
   * get cards list
   *
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "cards" : [ {
    "inicialBin" : 1.3579000000000001069366817318950779736042022705078125,
    "finalBin" : 1.3579000000000001069366817318950779736042022705078125,
    "active" : true,
    "id" : "aeiou",
    "artUrl" : "aeiou",
    "promo":"promp.jpg"
  } ]
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getOne = function(args, res, next) {
  /**
   * get a card
   *
   * id String 
   * returns inline_response_200_2
   **/
  var examples = {};
  examples['application/json'] = {
  "inicialBin" : 1.3579000000000001069366817318950779736042022705078125,
  "finalBin" : 1.3579000000000001069366817318950779736042022705078125,
  "active" : true,
  "id" : "aeiou",
  "artUrl" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.save = function(args, res, next) {
  // Trata de guardar el archivo en blob storage
    //Exitoso
      // Guarda la información en tabla
    //else
      // Manda mensaje de error.
    
  
  // usa entity genertor para setear los tipos
  // RowKey debe ser de tipo cadena aunque 
  // contenga un GuID
  var cardDescriptor = {
    PartitionKey: entityGen.String(partitionKey),
    RowKey:entityGen.String(uuid()),
    promo: entityGen.String(args.body.value.promo),
    artUrl:  entityGen.String(args.body.value.artUrl),
    inicialBin: entityGen.String(args.body.value.inicialBin),
    finalBin: entityGen.String(args.body.value.finalBin),
    active: entityGen.String(args.body.value.active)
  }


  storageClient.insertEntity(tableName,cardDescriptor, function entityInserted(error){
      if(error){
         //res.status(304).jsonp({ error: 'Not Modified' }).end();
        res.writeHead(304, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({error: "Error"}));
          
      }else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({success: "Tarjeta Guardada"}));
      }
  });

}

exports.update = function(args, res, next) {
  /**
   * update card
   *
   * id String Card ID
   * body Body_1 
   * returns inline_response_200_1
   **/
  var examples = {};
  examples['application/json'] = {
  "success" : 1.3579000000000001069366817318950779736042022705078125,
  "description" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

