'use strict';

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var moment = require('moment');

var sendgrid = require('sendgrid')('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');

var soporte = require('./soporte.json');

var config_dw = {
      userName: 'starbucks_so',
    password: 'Alsea.15',
    server: 'starbucks-mx-so.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {
      encrypt: true, 
      database: 'vips-isa-dw-test',
      requestTimeout: 30000
    }    
};

var connection = new Connection(config_dw);
var tiendas = [];
var tienda = {};
var ahora = moment();
var errores = [];


function mandaCorreo(store){

    var correo = "vips"+store.fiidtienda+"@vips.com.mx";
    var cc_soporte=[];
    
     if(soporte[store.fiidtienda] !== undefined){
       if(soporte[store.fiidtienda].res!== undefined){
          cc_soporte.push(soporte[store.fiidtienda].res);
       }
       cc_soporte.push(soporte[store.fiidtienda].cor);
       
       if(soporte[store.fiidtienda].ger !== undefined){
         cc_soporte.push(soporte[store.fiidtienda].ger);
       }        
     }else{
       errores.push(store.fiidtienda);
     }
    
    if(moment(store.fdultimoenvio).isValid()){
        var fechaUltimoEnvio = moment(store.fdultimoenvio);
        
        if(fechaUltimoEnvio.diff(ahora, 'days') < -2){
            
            var email     = new sendgrid.Email({
              to:       correo,
              from:     'noreply@vips.com.mx',
              bcc:       ['carlos.munoz@alsea.com.mx', 'elias.carrillo@alsea.com.mx'],
              cc:       cc_soporte,
              subject:  store.fiidtienda+' '+ store.fcnombre +':Tableta VIPS ISA sin enviar datos en más de 2 Días',
              text:     'Atencion ' + store.fiidtienda + ' ' + store.fcnombre + '\n Favor de levantar su ticket a la mesa de servicios de Alsea ya que la tableta de VIPS ISA en su unidad no ha enviado datos en más de 2 días \n Ultima fecha de Envío: ' + store.fdultimoenvio
            });
            

            console.log("Armando Correo...");
            
            sendgrid.send(email, function(err, json){
              if (err) { return console.error(err); }
              console.log(json);
            });
            //console.log(email);
            
            console.log("Enviando Correo a: " + correo);
        }
    }
}

connection.on('connect', function(err){
  //if no error inidcate that connection was succesful
  if(err){
    return console.log("Hubo un error: "+ err);
  }
    
   if(err){
      console.log(err);
      process.exit();
    }
    
    console.log('Conectado.');
    var spRequest = new Request('select * from tadwtotalencuestas with (nolock)', function(err, rowCount){
      if(err){
        console.log(err);
        process.exit();
      }
        console.log('Nuevo request %d', rowCount);
    });

    spRequest.on('row', function(columns){
       columns.forEach(function(column){
  
        if(column.metadata.colName==='fiidtienda' || column.metadata.colName==='fcnombre'|| column.metadata.colName==='fdultimoenvio'){
             tienda[column.metadata.colName]=column.value;
         } 
       });
      tiendas.push(tienda);
      tienda = {};
    });

    spRequest.on('doneProc', function(rowCount, more){
       console.log("Registros: "+ more);
       connection.close();
       //console.log(tiendas);
       if(tiendas.length>0){
         console.log('hola');
         tiendas.forEach(function(tienda){
          mandaCorreo(tienda); 
         });
       }else{
         console.log('No se pudieron obtener datos');
       }
       
       console.log("Obteniendo Datos" );
       console.log(errores);
       
    });

    connection.execSql(spRequest);
    
});

