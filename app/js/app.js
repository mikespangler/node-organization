angular.module('firstApp', [])
  
  .controller('mainController', function(){
    // bind this to view-model

    var vm = this;
    vm.message = 'Hey there! Come and see how good I look!';

    vm.computers = [
      { name: 'Macbook Pro', color: 'Silver', nerdness: 7 },
      { name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6 },
      { name: 'Chromebook', color: 'Black', nerdness: 5 },
    ];

    //  info that comes from the form
    vm.computerData = {};

    // add a computer to the list
    vm.addComputer = function(){
      vm.computers.push({
        name: vm.computerData.name,
        color: vm.computerData.color,
        nerdness: vm.computerData.nerdness
      });

      // clear the form
      vm.computerData = {};
    };
  });
  
