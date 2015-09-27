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


angular.module('todo').controller('home', function($scope, $localStorage) {
  $scope.todos = [
    {name: 'first', "done": false},
    {name: 'second', "done": true},
    {name: 'third', "done": true}
  ];

  $localStorage.todos = $scope.todos;

  $scope.addTodo = function addTodo(todo) {
    if (todo === '' || null) {
      return;
    }
    else {
      var newTodo = {
        name: todo,
        done: false,
        dateCreated: new Date()
      };
      $scope.todos.push(newTodo);
      $localStorage.todos = $scope.todos;
      $scope.newTodo = '';
    }
  };

  $scope.deleteTodo = function deleteTodo(todo) {
    console.log('in delete');
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);
    $localStorage.todos = $scope.todos;
  };

  $scope.thingsChanged = function thingsChanged(item) {
    $scope.todos.forEach(function (entry) {
      if (entry.name == item.name) {
        entry.done = !entry.done;
      }
    });
    console.log($scope.todos);
    $localStorage.todos = $scope.todos;
  };
});