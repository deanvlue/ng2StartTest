
angular.module('tiendasvips', [
  'ngRoute',
  'tiendasvips.todo',
  'tiendasvips.tiendas'
])
.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when('/', {
      controller: 'TiendasCtrl',
      templateUrl: '/tiendasvips/tiendas/tiendas.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
