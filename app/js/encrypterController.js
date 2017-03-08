var Pipe = require('./pipe');
var CipherList = require('./cipherList');
var Categories = require('./categories');

var ZigZag = require('./ciphers/zigZag')

module.exports = function(
  $mdSidenav,
  $mdToast,
  $translate,
  $filter,
  $scope,
  $location
) {

  var vm = this;
  vm.input = $filter('translate')('defaultInputText');

	vm.cipherList = CipherList();
	vm.categories = getCategorizedCiphers();

  var defaultPipe = new Pipe(1, [new ZigZag()]);
  vm.pipes = [defaultPipe];

  vm.outputToCopy;

  vm.changeLanguage = changeLanguage;
  vm.querySearch = querySearch;
  vm.createFilterFor = createFilterFor;
  vm.addPipe = addPipe;
  vm.removePipe = removePipe;
  vm.useCipher = useCipher;
  vm.getOutput = getOutput;
  vm.informOutputCopied = informOutputCopied;
  vm.openSettingsOnSide = openSettingsOnSide;

  function useCipher(Cipher) {
    var cipherInstance = new Cipher();
    if (vm.pipes.length == 0) {
      vm.pipes.push(new Pipe(1, [cipherInstance]));
    } else {
      vm.pipes[0].addCipher(cipherInstance);
    }
  }

  function openSettingsOnSide() {
    $mdSidenav('settingsOnSide').toggle();
  }

  function informOutputCopied() {
    $mdToast.show(
      $mdToast.simple()
        .textContent($filter('translate')('infoOutputCopied'))
        .position('bottom right')
    );
  }

  function getCategorizedCiphers() {
    var categorizedCiphers = [];
    Object.keys(Categories).forEach(function(categoryKey) {
      var oneCategory = {
        name: Categories[categoryKey]
      };
      oneCategory.ciphers = vm.cipherList.filter(function(Cipher) {
        if (Cipher.prototype) {
          return Categories[categoryKey] === Cipher.prototype.category;
        } else {
          return false;
        }
      });
      categorizedCiphers.push(oneCategory);
    });
    return categorizedCiphers;
  }

  function changeLanguage(langKey) {
    $translate.use(langKey);
  }

  function addPipe() {
    var number = vm.pipes.length + 1;
    var pipe = new Pipe(number, []);
    vm.pipes.push(pipe);
  }

  function removePipe(pipe) {
    var index = vm.pipes.indexOf(pipe);
    vm.pipes.splice(index, 1);
  }

  function querySearch(query) {
    var results = query ? vm.cipherList.filter(createFilterFor(query)) : [];
    return results;
  }

  function createFilterFor(query) {
    var lowercaseQuery = query.toLocaleLowerCase();
    return function filterFn(item) {
      var lowerCipherName = $filter('translate')(item.prototype.name)
                              .toLocaleLowerCase();
      return (lowerCipherName.indexOf(lowercaseQuery) === 0);
    };
  }

  function getOutput(pipe) {
    var thisInput = vm.input;
    if (!thisInput) {
      thisInput = '';
    }
    var result = pipe.chosenCiphers.reduce(
      function(output, cipher) {
        return cipher.encrypt(output);
    }, thisInput);

    vm.outputToCopy = result;
    return result;
  };
}

