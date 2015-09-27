(function () {
  'use strict';
  angular.module('todo', [
    'ui.router',
    'ngStorage'
  ])
      .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
              url: '/',
              controller: 'home',
              templateUrl: '/app/home/_home.html'
            })
            .state('about', {
              url: '/about',
              templateUrl: '/app/about/_about.html'
            });
        $urlRouterProvider
            .otherwise('/');

        //$locationProvider.html5Mode(true);
      });
}());

