var EncrypterController = function($scope, $mdSidenav, $translate) {
  var self = this;

	self.ciphersList = CiphersList;
	self.categories = getCategorizedCiphers();
  self.input = 'P.řílirgš žluťoučký\tkůň\npěl ďábelské ódy!';

  var defaultPipe = new Pipe(1, [Morse]);
  var defaultPipe2 = new Pipe(2, [Morse]);
  self.pipes = [defaultPipe, defaultPipe2];

  self.changeLanguage = changeLanguage;

  self.querySearch = querySearch;
  self.createFilterFor = createFilterFor;
  self.addPipe = addPipe;
  self.removePipe = removePipe;
  self.getOutput = getOutput;

  self.openSettingsOnSide = function() {
    $mdSidenav('settingsOnSide').toggle();
  };

  function getCategorizedCiphers() {
    var categorizedCiphers = [];
    Object.keys(Categories).forEach(function(categoryKey) {
      var oneCategory = {
        name: Categories[categoryKey]
      };
      oneCategory.ciphers = CiphersList.filter(function(cipher) {
        return Categories[categoryKey] === cipher.category;
      });
      categorizedCiphers.push(oneCategory);
    });
    return categorizedCiphers;
  }

  function changeLanguage(langKey) {
    $translate.use(langKey)
  }

  function addPipe() {
    var number = self.pipes.length + 1;
    var pipe = new Pipe(number, []);
    self.pipes.push(pipe);
  }

  function removePipe(pipe) {
    var index = self.pipes.indexOf(pipe);
    self.pipes.splice(index, 1);
  }

  function querySearch(query) {
    var results = query ? self.ciphersList.filter(createFilterFor(query)) : [];
    return results;
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(item) {
      return (angular.lowercase(item.cipherName).indexOf(lowercaseQuery) === 0);
    };
  }

  function getOutput(pipe) {
    var thisInput = self.input;
    if (!thisInput) {
      thisInput = '';
    }
    var result = pipe.chosenCiphers.reduce(
      function(output, cipher) {
        return cipher.cipherFunction(output);
    }, thisInput);
    return result;
  };
}

