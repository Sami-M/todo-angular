angular.module('todo').controller('home', function($scope, $localStorage) {
  if(!$localStorage.todos) {
    $scope.todos = [
      {name: 'first', "done": false},
      {name: 'second', "done": true},
      {name: 'third', "done": true}
    ];

    $localStorage.todos = $scope.todos;
  }
  else{
    $scope.todos = $localStorage.todos;
  }

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