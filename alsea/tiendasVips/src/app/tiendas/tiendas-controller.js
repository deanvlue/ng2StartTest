angular.module('underscore', [])
  .factory('_', function() {
    'use strict';
    return window._; //Underscore must already be loaded on the page
  });


angular
  .module('tiendasvips.tiendas',['underscore'])
  .controller('TiendasCtrl', function ($scope, $http, _) {
    'use strict';
    
    var Tiendas = $http.get('http://isa-resumen-reportes.azurewebsites.net/resumen');
    
    Tiendas.then(function(res){
      if(res.data.length>0){
        var tiendas={};
        tiendas = _.sortBy(res.data,'fdultimoenvio');
        tiendas.forEach(function(tienda){
        tienda.fdultimoenvio = moment.utc(tienda.fdultimoenvio).local().format('YYYY-MM-DD HH:mm:ss');
        //tienda["fecha_hora_actual"]=moment().utc().local().format('YYYY-MM-DD HH:mm:ss');
        var diferencia =((moment().utc().local()-moment(tienda.fdultimoenvio).local())/86400000);
        if( diferencia > 2){
          tienda['status'] = 'danger';
        }else if (diferencia >= 1 ) {
          tienda['status'] = 'warning';
        } else {
          tienda['status'] = 'success';
        }

        });
        var resumen = _.groupBy(tiendas,'status');
        $scope.estatus = 
          {
            peligro: resumen.danger.length,
            alerta: resumen.warning.length,
            ok: resumen.success.length
          };
        
        $scope.resumen = resumen;
         
      }else{
        console.log(res);
      }
      /*var today = new Date();
      
      var tiendas = res.data;
      
      tiendas.forEach(function(tienda){
        console.log(tienda.fdultimoenvio - today);
      });
      
      $scope.tiendas=_.sortBy(res.data, 'fdultimoenvio');
      //$scope.tiendas = res.data;
    });*/
    
  });
 });
