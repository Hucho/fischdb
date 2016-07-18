'use strict';

// Register `allFish` component, along with its associated controller and template
angular.
  module('allFish').
  component('allFish', {
    templateUrl: 'analysis/allFish.template.html',
    controller: function allFishController($http) {
      console.log("Hello Wordl from allFischController!");
      var self = this;
      self.orderProp = "_id";

      $http.get('/total').then(function(response) {
        self.fishes = response.data;
      });
    }
  });
