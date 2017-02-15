'use strict';

angular.module('CarousalDemo', ['ngRoute'])

.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/view4/:productCode', {
    templateUrl: 'view4/view4.html',
    controller: 'CarouselDemoCtrl'
  });
}])

.controller('CarouselDemoCtrl', ['$scope','$http', '$routeParams',function ($scope,$http,$routeParams) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var product = $scope.product = {} ;    
  var currIndex = 0;
  var self = $scope;    
  $http.get('products/' + $routeParams.productCode + '.json').then(function(response) {
          product = response.data;
          for (var i = 0; i < product.images.length ; i++) {
                self.slides.push({
                        image: product.images[i],
                        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                        id: currIndex++
                });
            }      
    });
  
    

    $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//unsplash.it/' + newWidth + '/300',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    //$scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
}]);