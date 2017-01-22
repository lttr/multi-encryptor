var EncrypterController = function(
  $mdSidenav,
  $mdToast,
  $translate,
  $filter,
  $state,
  $stateParams,
  $scope,
  $rootScope
) {

  this.input = $filter('translate')('defaultInputText');

	this.ciphersList = CiphersList;
	this.categories = getCategorizedCiphers();

  var defaultPipe = new Pipe(1, [new Morse()]);
  this.pipes = [defaultPipe];

  this.outputToCopy;

  this.changeLanguage = changeLanguage;
  this.querySearch = querySearch;
  this.createFilterFor = createFilterFor;
  this.addPipe = addPipe;
  this.removePipe = removePipe;
  this.useCipher = useCipher;
  this.getOutput = getOutput;
  this.informOutputCopied = informOutputCopied;
  this.openSettingsOnSide = openSettingsOnSide;

  function useCipher(Cipher) {
    var cipherInstance = new Cipher();
    if (this.pipes.length == 0) {
      this.pipes.push(new Pipe(1, [cipherInstance]));
    } else {
      this.pipes[0].addCipher(cipherInstance);
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
      oneCategory.ciphers = CiphersList.filter(function(Cipher) {
        return Categories[categoryKey] === Cipher.prototype.category;
      });
      categorizedCiphers.push(oneCategory);
    });
    return categorizedCiphers;
  }

  $scope.$on('$stateChangeSuccess',
    function rootStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      if ($stateParams.lang !== undefined) {
        var otherLang = $stateParams.lang === 'cs' ? 'en' : 'cs';
        $rootScope.activeLang = $stateParams.lang;
        $rootScope.otherLangURL =
          $location.absUrl().replace('/' + $stateParams.lang, '/' + otherLang)
        $translate.use($stateParams.lang);
      }
    }
  );

  function changeLanguage(langKey) {
    $translate.use(langKey);
  }

  function addPipe() {
    var number = this.pipes.length + 1;
    var pipe = new Pipe(number, []);
    this.pipes.push(pipe);
  }

  function removePipe(pipe) {
    var index = this.pipes.indexOf(pipe);
    this.pipes.splice(index, 1);
  }

  function querySearch(query) {
    var results = query ? this.ciphersList.filter(createFilterFor(query)) : [];
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
    var thisInput = this.input;
    if (!thisInput) {
      thisInput = '';
    }
    var result = pipe.chosenCiphers.reduce(
      function(output, cipher) {
        return cipher.encrypt(output);
    }, thisInput);

    this.outputToCopy = result;
    return result;
  };
}

